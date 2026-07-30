/// <reference types="bun-types" />

import { describe, expect, test } from 'bun:test';
import { validateContactForm } from './contact-form.ts';

describe('contact-form validation', () => {
	test('returns errors for required fields when empty', () => {
		const result = validateContactForm({
			name: '   ',
			email: '',
			organization: '',
			message: '',
			termsAccepted: false
		});

		expect(result.isValid).toBe(false);
		expect(result.errors).toEqual({
			name: 'Provide your name.',
			email: 'Provide a work email.',
			message: 'Add a brief scope, timeline, or support need.',
			termsAccepted: 'Accept the Terms of Use and Privacy Policy before sending your enquiry.'
		});
	});

	test('returns error for invalid work email format', () => {
		const result = validateContactForm({
			name: 'Nordic Contact',
			email: 'invalid-email',
			organization: 'Nordic Solutions',
			message: 'Need project support.',
			termsAccepted: true
		});

		expect(result.isValid).toBe(false);
		expect(result.errors.email).toBe('Use a valid work email address.');
	});

	test('returns errors for fields beyond intake length limits', () => {
		const result = validateContactForm({
			name: 'N'.repeat(121),
			email: `${'e'.repeat(169)}@example.com`,
			organization: 'O'.repeat(181),
			message: 'M'.repeat(1201),
			termsAccepted: true
		});

		expect(result.isValid).toBe(false);
		expect(result.errors).toEqual({
			name: 'Keep the name under 120 characters.',
			email: 'Keep the email under 180 characters.',
			organization: 'Keep the organization under 180 characters.',
			message: 'Keep the message under 1200 characters.'
		});
	});

	test('returns valid result and normalized values for valid payload', () => {
		const result = validateContactForm({
			name: '  Nordic   Contact  ',
			email: '  HELLO@Example.com  ',
			organization: '  Nordic   Solutions  ',
			message: '  Scope and timeline details.  ',
			termsAccepted: true
		});

		expect(result.isValid).toBe(true);
		expect(result.errors).toEqual({});
		expect(result.values).toEqual({
			name: 'Nordic Contact',
			email: 'hello@example.com',
			organization: 'Nordic Solutions',
			message: 'Scope and timeline details.',
			termsAccepted: true
		});
	});

	test('removes control characters before validating the intake payload', () => {
		const result = validateContactForm({
			name: 'Nor\u0000dic Contact',
			email: 'brief\u0007@example.com',
			organization: 'Nordic\u000bSolutions',
			message: 'Line one\u0000\n\n\nLine two',
			termsAccepted: true
		});

		expect(result.isValid).toBe(true);
		expect(result.values).toEqual({
			name: 'Nordic Contact',
			email: 'brief@example.com',
			organization: 'NordicSolutions',
			message: 'Line one\n\nLine two',
			termsAccepted: true
		});
	});
});
