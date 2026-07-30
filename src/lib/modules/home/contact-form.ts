export type ContactFormValues = {
	name: string;
	email: string;
	organization: string;
	message: string;
	termsAccepted: boolean;
};

export type ContactFormErrors = Partial<
	Record<'name' | 'email' | 'organization' | 'message' | 'termsAccepted', string>
>;

export type ContactFormValidationResult = {
	isValid: boolean;
	values: ContactFormValues;
	errors: ContactFormErrors;
};

export type ContactSubmissionState = 'success' | 'validation_error' | 'error';

export type ContactSubmissionFallback = {
	email: string;
	phone: string;
};

export type ContactSubmissionResponse = {
	ok: boolean;
	state: ContactSubmissionState;
	message: string;
	errors?: ContactFormErrors;
	fallback: ContactSubmissionFallback;
};

export const contactFormFieldOrder: Array<keyof ContactFormValues> = [
	'name',
	'email',
	'organization',
	'message',
	'termsAccepted'
];

const WORK_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 180;
const MAX_ORGANIZATION_LENGTH = 180;
const MAX_MESSAGE_LENGTH = 1200;

const stripControlCharacters = (value: string) =>
	Array.from(value)
		.filter((character) => {
			const codePoint = character.codePointAt(0) ?? 0;

			return codePoint === 0x09 || codePoint === 0x0a || codePoint === 0x0d || codePoint >= 0x20;
		})
		.join('')
		.replaceAll(String.fromCharCode(0x7f), '');

const normalizeSingleLineValue = (value: string) =>
	stripControlCharacters(value).replace(/\s+/g, ' ').trim();

const normalizeMessageValue = (value: string) =>
	stripControlCharacters(value)
		.replace(/[ \t]+/g, ' ')
		.replace(/\n{3,}/g, '\n\n')
		.trim();

const normalizeValues = (values: ContactFormValues): ContactFormValues => {
	const email = normalizeSingleLineValue(values.email);

	return {
		name: normalizeSingleLineValue(values.name),
		email: email.toLowerCase(),
		organization: normalizeSingleLineValue(values.organization),
		message: normalizeMessageValue(values.message),
		termsAccepted: values.termsAccepted === true
	};
};

export const validateContactForm = (input: ContactFormValues): ContactFormValidationResult => {
	const values = normalizeValues(input);
	const errors: ContactFormErrors = {};

	if (!values.name) {
		errors.name = 'Provide your name.';
	} else if (values.name.length > MAX_NAME_LENGTH) {
		errors.name = `Keep the name under ${MAX_NAME_LENGTH} characters.`;
	}

	if (!values.email) {
		errors.email = 'Provide a work email.';
	} else if (!WORK_EMAIL_PATTERN.test(values.email)) {
		errors.email = 'Use a valid work email address.';
	} else if (values.email.length > MAX_EMAIL_LENGTH) {
		errors.email = `Keep the email under ${MAX_EMAIL_LENGTH} characters.`;
	}

	if (values.organization.length > MAX_ORGANIZATION_LENGTH) {
		errors.organization = `Keep the organization under ${MAX_ORGANIZATION_LENGTH} characters.`;
	}

	if (!values.message) {
		errors.message = 'Add a brief scope, timeline, or support need.';
	} else if (values.message.length > MAX_MESSAGE_LENGTH) {
		errors.message = `Keep the message under ${MAX_MESSAGE_LENGTH} characters.`;
	}

	if (!values.termsAccepted) {
		errors.termsAccepted =
			'Accept the Terms of Use and Privacy Policy before sending your enquiry.';
	}

	return {
		isValid: Object.keys(errors).length === 0,
		values,
		errors
	};
};
