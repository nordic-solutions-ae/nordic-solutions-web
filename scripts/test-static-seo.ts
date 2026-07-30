import assert from 'node:assert/strict';
import { join } from 'node:path';

const siteUrl = 'https://nordicsolutions.ae';
const buildRoot = join(import.meta.dirname, '..', 'build');
const pages = [
	{
		file: 'index.html',
		attributes: 'lang="en" dir="ltr"',
		canonical: siteUrl,
		en: siteUrl,
		ar: `${siteUrl}/ar`
	},
	{
		file: 'en.html',
		attributes: 'lang="en" dir="ltr"',
		canonical: siteUrl,
		en: siteUrl,
		ar: `${siteUrl}/ar`
	},
	{
		file: 'ar.html',
		attributes: 'lang="ar" dir="rtl"',
		canonical: `${siteUrl}/ar`,
		en: siteUrl,
		ar: `${siteUrl}/ar`
	},
	{
		file: 'privacy.html',
		attributes: 'lang="en" dir="ltr"',
		canonical: `${siteUrl}/privacy`,
		en: `${siteUrl}/privacy`
	},
	{
		file: 'terms.html',
		attributes: 'lang="en" dir="ltr"',
		canonical: `${siteUrl}/terms`,
		en: `${siteUrl}/terms`
	}
];

for (const page of pages) {
	const html = await Bun.file(join(buildRoot, page.file)).text();

	assert(html.includes(`<html ${page.attributes}>`), `${page.file}: incorrect language attributes`);
	assert(
		html.includes(`rel="canonical" href="${page.canonical}"`),
		`${page.file}: missing canonical`
	);
	assert(
		html.includes(`hreflang="en" href="${page.en}"`),
		`${page.file}: missing English alternate`
	);
	if ('ar' in page) {
		assert(
			html.includes(`hreflang="ar" href="${page.ar}"`),
			`${page.file}: missing Arabic alternate`
		);
	}
	assert(
		html.includes('name="google-site-verification"'),
		`${page.file}: missing Search Console tag`
	);
	assert(html.includes('type="application/ld+json"'), `${page.file}: missing organization schema`);
	assert(html.includes('"@type": "WebSite"'), `${page.file}: missing website schema`);
	assert(html.includes('"name": "Nordic Solutions"'), `${page.file}: missing preferred site name`);
}

assert(await Bun.file(join(buildRoot, 'sitemap.xml')).exists(), 'missing sitemap.xml');
assert(
	(await Bun.file(join(buildRoot, 'robots.txt')).text()).includes(`${siteUrl}/sitemap.xml`),
	'robots.txt does not reference sitemap.xml'
);

const sitemap = await Bun.file(join(buildRoot, 'sitemap.xml')).text();
for (const path of ['/privacy', '/terms']) {
	assert(sitemap.includes(`${siteUrl}${path}`), `sitemap missing ${path}`);
}
