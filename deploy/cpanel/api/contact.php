<?php

declare(strict_types=1);

const NORDIC_CONTACT_TO = 'info@nordicsolutions.ae';
const NORDIC_CONTACT_FROM = 'nordicso@dubai90.server.ae';
const NORDIC_CONTACT_FALLBACK_EMAIL = 'info@nordicsolutions.ae';
const NORDIC_CONTACT_FALLBACK_PHONE = '+971503160500';
const NORDIC_CONTACT_RATE_LIMIT = 5;
const NORDIC_CONTACT_RATE_WINDOW = 3600;

function nordic_contact_response(array $body, int $status = 200): never
{
	http_response_code($status);
	header('Content-Type: application/json; charset=UTF-8');
	header('Cache-Control: no-store');
	echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
	exit;
}

function nordic_contact_fallback(): array
{
	return [
		'email' => NORDIC_CONTACT_FALLBACK_EMAIL,
		'phone' => NORDIC_CONTACT_FALLBACK_PHONE,
	];
}

function nordic_contact_length(string $value): int
{
	return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function nordic_contact_strip_controls(string $value): string
{
	return preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
}

function nordic_contact_single_line(string $value): string
{
	return trim(preg_replace('/\s+/u', ' ', nordic_contact_strip_controls($value)) ?? '');
}

function nordic_contact_message(string $value): string
{
	$value = str_replace(["\r\n", "\r"], "\n", nordic_contact_strip_controls($value));
	$value = preg_replace('/[ \t]+/u', ' ', $value) ?? '';
	return trim(preg_replace('/\n{3,}/', "\n\n", $value) ?? '');
}

function nordic_contact_string(array $payload, string $field): string
{
	return isset($payload[$field]) && is_string($payload[$field]) ? $payload[$field] : '';
}

function nordic_contact_terms_accepted(array $payload): bool
{
	return ($payload['termsAccepted'] ?? null) === true;
}

function nordic_contact_validate(mixed $payload): array
{
	$payload = is_array($payload) ? $payload : [];
	$values = [
		'name' => nordic_contact_single_line(nordic_contact_string($payload, 'name')),
		'email' => strtolower(nordic_contact_single_line(nordic_contact_string($payload, 'email'))),
		'organization' => nordic_contact_single_line(nordic_contact_string($payload, 'organization')),
		'message' => nordic_contact_message(nordic_contact_string($payload, 'message')),
	];
	$errors = [];

	if ($values['name'] === '') {
		$errors['name'] = 'Provide your name.';
	} elseif (nordic_contact_length($values['name']) > 120) {
		$errors['name'] = 'Keep the name under 120 characters.';
	}

	if ($values['email'] === '') {
		$errors['email'] = 'Provide a work email.';
	} elseif (!filter_var($values['email'], FILTER_VALIDATE_EMAIL)) {
		$errors['email'] = 'Use a valid work email address.';
	} elseif (nordic_contact_length($values['email']) > 180) {
		$errors['email'] = 'Keep the email under 180 characters.';
	}

	if (nordic_contact_length($values['organization']) > 180) {
		$errors['organization'] = 'Keep the organization under 180 characters.';
	}

	if ($values['message'] === '') {
		$errors['message'] = 'Add a brief scope, timeline, or support need.';
	} elseif (nordic_contact_length($values['message']) > 1200) {
		$errors['message'] = 'Keep the message under 1200 characters.';
	}

	if (!nordic_contact_terms_accepted($payload)) {
		$errors['termsAccepted'] = 'Accept the Terms of Use and Privacy Policy before sending your enquiry.';
	}

	return ['values' => $values, 'errors' => $errors];
}

function nordic_contact_rate_limit_allows(
	string $ip,
	?string $path = null,
	?int $now = null,
): bool {
	// ponytail: one locked file is enough for this low-volume form; split only if traffic grows.
	$path ??= dirname(__DIR__, 2) . '/tmp/nordic-solutions-contact-rate-limit.json';
	$now ??= time();
	$key = hash('sha256', $ip);
	$handle = @fopen($path, 'c+');

	if ($handle === false) {
		return true;
	}

	if (!flock($handle, LOCK_EX)) {
		fclose($handle);
		return true;
	}

	$raw = stream_get_contents($handle);
	$data = is_string($raw) ? json_decode($raw, true) : [];
	$data = is_array($data) ? $data : [];
	$cutoff = $now - NORDIC_CONTACT_RATE_WINDOW;

	foreach ($data as $storedKey => $timestamps) {
		$timestamps = is_array($timestamps)
			? array_values(array_filter($timestamps, fn ($timestamp) => is_int($timestamp) && $timestamp > $cutoff))
			: [];

		if ($timestamps === []) {
			unset($data[$storedKey]);
		} else {
			$data[$storedKey] = $timestamps;
		}
	}

	$timestamps = $data[$key] ?? [];
	$allowed = count($timestamps) < NORDIC_CONTACT_RATE_LIMIT;

	if ($allowed) {
		$timestamps[] = $now;
		$data[$key] = $timestamps;
	}

	rewind($handle);
	ftruncate($handle, 0);
	fwrite($handle, json_encode($data));
	fflush($handle);
	flock($handle, LOCK_UN);
	fclose($handle);

	return $allowed;
}

function nordic_contact_email_body(array $values): string
{
	return implode("\n", [
		'New website enquiry',
		'',
		'Name: ' . $values['name'],
		'Email: ' . $values['email'],
		'Organization: ' . ($values['organization'] !== '' ? $values['organization'] : 'Not provided'),
		'',
		'Message:',
		$values['message'],
	]);
}

function nordic_contact_handle_request(): never
{
	if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
		header('Allow: POST');
		nordic_contact_response([
			'ok' => false,
			'state' => 'error',
			'message' => 'Method not allowed.',
			'fallback' => nordic_contact_fallback(),
		], 405);
	}

	if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 16384) {
		nordic_contact_response([
			'ok' => false,
			'state' => 'validation_error',
			'message' => 'The contact request is too large.',
			'fallback' => nordic_contact_fallback(),
		], 413);
	}

	$contentType = strtolower($_SERVER['CONTENT_TYPE'] ?? '');

	if (!str_starts_with($contentType, 'application/json')) {
		nordic_contact_response([
			'ok' => false,
			'state' => 'validation_error',
			'message' => 'Submit the contact request as JSON.',
			'fallback' => nordic_contact_fallback(),
		], 415);
	}

	try {
		$payload = json_decode((string) file_get_contents('php://input'), true, 32, JSON_THROW_ON_ERROR);
	} catch (JsonException) {
		nordic_contact_response([
			'ok' => false,
			'state' => 'validation_error',
			'message' => 'Submit the contact request with a valid JSON body.',
			'fallback' => nordic_contact_fallback(),
		], 400);
	}

	if (
		is_array($payload)
		&& nordic_contact_single_line(nordic_contact_string($payload, 'website')) !== ''
	) {
		nordic_contact_response([
			'ok' => true,
			'state' => 'success',
			'message' => 'Thank you. Your request has been sent.',
			'fallback' => nordic_contact_fallback(),
		]);
	}

	$result = nordic_contact_validate($payload);

	if ($result['errors'] !== []) {
		nordic_contact_response([
			'ok' => false,
			'state' => 'validation_error',
			'message' => 'Some intake details need attention. Review the highlighted fields and submit again.',
			'errors' => $result['errors'],
			'fallback' => nordic_contact_fallback(),
		], 400);
	}

	if (!nordic_contact_rate_limit_allows($_SERVER['REMOTE_ADDR'] ?? 'unknown')) {
		nordic_contact_response([
			'ok' => false,
			'state' => 'error',
			'message' => 'Too many requests. Please try again later.',
			'fallback' => nordic_contact_fallback(),
		], 429);
	}

	$headers = implode("\r\n", [
		'From: Nordic Solutions Website <' . NORDIC_CONTACT_FROM . '>',
		'Reply-To: ' . $result['values']['email'],
		'MIME-Version: 1.0',
		'Content-Type: text/plain; charset=UTF-8',
		'Content-Transfer-Encoding: 8bit',
	]);
	$sent = @mail(
		NORDIC_CONTACT_TO,
		'Nordic Solutions website enquiry',
		nordic_contact_email_body($result['values']),
		$headers,
	);

	if (!$sent) {
		nordic_contact_response([
			'ok' => false,
			'state' => 'error',
			'message' => 'The contact form could not send your request.',
			'fallback' => nordic_contact_fallback(),
		], 502);
	}

	nordic_contact_response([
		'ok' => true,
		'state' => 'success',
		'message' => 'Thank you. Your request has been sent.',
		'fallback' => nordic_contact_fallback(),
	]);
}

if (!defined('NORDIC_CONTACT_TESTING')) {
	nordic_contact_handle_request();
}
