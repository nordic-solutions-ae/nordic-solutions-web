import { describe, expect, test } from 'bun:test';
import { getLegalDocument, getLegalPath } from './content';

describe('legal content', () => {
	for (const key of ['privacy', 'terms'] as const) {
		test(`${key} document is complete`, () => {
			const document = getLegalDocument(key);
			const text = document.sections
				.flatMap((section) => [
					section.heading,
					...(section.paragraphs ?? []),
					...(section.bullets ?? []),
					...(section.content ?? []).flatMap((block) =>
						'paragraph' in block ? [block.paragraph] : block.bullets
					)
				])
				.join(' ');

			expect(document.key).toBe(key);
			expect(document.updatedLabel).toBe('Last updated 31 July 2026');
			expect(document.sections.length).toBe(key === 'privacy' ? 11 : 9);
			expect(text).toContain('info@nordicsolutions.ae');
		});
	}

	test('builds English legal paths', () => {
		expect(getLegalPath('privacy')).toBe('/privacy');
		expect(getLegalPath('terms')).toBe('/terms');
	});
});
