import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) => {
	const isArabic = event.url.pathname === '/ar' || event.url.pathname.startsWith('/ar/');

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('lang="en" dir="ltr"', isArabic ? 'lang="ar" dir="rtl"' : 'lang="en" dir="ltr"')
	});
};
