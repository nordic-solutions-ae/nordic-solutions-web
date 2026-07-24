<?php

declare(strict_types=1);

define('NORDIC_CONTACT_TESTING', true);
require __DIR__ . '/../deploy/cpanel/api/contact.php';

assert(NORDIC_CONTACT_TO === 'seoavg@gmail.com');
assert(NORDIC_CONTACT_FROM === 'nordicso@dubai90.server.ae');

$valid = nordic_contact_validate([
	'name' => "  Nordic \0 Contact  ",
	'email' => ' HELLO@Example.com ',
	'organization' => ' Nordic   Solutions ',
	'message' => " Scope \r\n\r\n\r\n details. ",
]);

assert($valid['errors'] === []);
assert($valid['values'] === [
	'name' => 'Nordic Contact',
	'email' => 'hello@example.com',
	'organization' => 'Nordic Solutions',
	'message' => "Scope \n\n details.",
]);

$invalid = nordic_contact_validate([
	'name' => '',
	'email' => "visitor@example.com\r\nBcc: attacker@example.com",
	'message' => '',
]);

assert($invalid['errors'] === [
	'name' => 'Provide your name.',
	'email' => 'Use a valid work email address.',
	'message' => 'Add a brief scope, timeline, or support need.',
]);

$rateLimitFile = sys_get_temp_dir() . '/nordic-contact-test-' . bin2hex(random_bytes(8)) . '.json';

for ($attempt = 0; $attempt < NORDIC_CONTACT_RATE_LIMIT; $attempt++) {
	assert(nordic_contact_rate_limit_allows('192.0.2.1', $rateLimitFile, 1000 + $attempt));
}

assert(!nordic_contact_rate_limit_allows('192.0.2.1', $rateLimitFile, 1005));
assert(nordic_contact_rate_limit_allows('192.0.2.1', $rateLimitFile, 5000));
@unlink($rateLimitFile);

echo "cPanel contact checks passed.\n";
