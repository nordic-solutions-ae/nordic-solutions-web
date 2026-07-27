import { describe, expect, test } from 'bun:test';
import { getLegalDocument, getLegalPath } from './content';

describe('legal content', () => {
	for (const locale of ['en', 'ar'] as const) {
		for (const key of ['privacy', 'terms'] as const) {
			test(`${locale} ${key} document is complete`, () => {
				const document = getLegalDocument(key, locale);
				const text = document.sections
					.flatMap((section) => [
						section.heading,
						...section.paragraphs,
						...(section.bullets ?? [])
					])
					.join(' ');

				expect(document.locale).toBe(locale);
				expect(document.key).toBe(key);
				expect(document.title.length).toBeGreaterThan(4);
				expect(document.sections.length).toBeGreaterThanOrEqual(7);
				expect(text).toContain(
					locale === 'ar' ? 'info@nordicsolutions.ae' : 'info@nordicsolutions.ae'
				);
			});
		}
	}

	test('builds localized legal paths', () => {
		expect(getLegalPath('privacy', 'en')).toBe('/privacy');
		expect(getLegalPath('terms', 'ar')).toBe('/ar/terms');
	});
});
