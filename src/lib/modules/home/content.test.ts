/// <reference types="bun-types" />

import { describe, expect, test } from 'bun:test';
import {
	contactDetails,
	getHomeCopy,
	serviceHighlights,
	valuePillars,
	whyChooseNordic
} from './content';

describe('home content', () => {
	test('keeps verified business contact details from the legacy site', () => {
		expect(contactDetails.email).toBe('info@nordicsolutions.ae');
		expect(contactDetails.phone).toBe('+971503160500');
		expect(contactDetails.addressLine1).toBe('Tawazun Industrial Park, Abu Dhabi, UAE');
		expect(contactDetails.addressLine2).toBe('P.O. Box: 3640');
	});

	test('keeps the home narrative concise and fully populated', () => {
		expect(valuePillars).toHaveLength(3);
		expect(serviceHighlights).toHaveLength(4);
		expect(whyChooseNordic).toHaveLength(4);
		expect(serviceHighlights.every((item) => item.description.length < 120)).toBe(true);
		expect(whyChooseNordic.every((item) => item.description.length < 140)).toBe(true);
	});

	test('keeps Arabic copy structurally aligned with English home copy', () => {
		const english = getHomeCopy('en');
		const arabic = getHomeCopy('ar');

		expect(arabic.hero.titleLines).toHaveLength(english.hero.titleLines.length);
		expect(arabic.services.items).toHaveLength(english.services.items.length);
		expect(arabic.approach.items).toHaveLength(english.approach.items.length);
		expect(arabic.why.items).toHaveLength(english.why.items.length);
		expect(arabic.header.languageToggle).toBe('English');
	});
});
