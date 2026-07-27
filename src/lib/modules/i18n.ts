export type Locale = 'en' | 'ar';

const defaultLocale: Locale = 'en';
const locales: Locale[] = ['en', 'ar'];

const isLocale = (value: string): value is Locale => locales.includes(value as Locale);

export const resolveLocaleFromPath = (pathname: string): Locale => {
	const [, firstSegment] = pathname.split('/');

	return firstSegment && isLocale(firstSegment) ? firstSegment : defaultLocale;
};

export const getLocaleDirection = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr');

export const getCurrentLocaleHomePath = (locale: Locale, pathname: string) => {
	if (locale === 'ar') {
		return '/ar';
	}

	return pathname.startsWith('/en') ? '/en' : '/';
};

export const getOppositeLocalePath = (locale: Locale, pathname: string, hash = '') => {
	const nextLocale: Locale = locale === 'ar' ? 'en' : 'ar';
	const legalPath = pathname.replace(/^\/ar(?=\/|$)/, '').replace(/^\/en(?=\/|$)/, '');

	if (legalPath === '/privacy' || legalPath === '/terms') {
		return `${nextLocale === 'ar' ? `/ar${legalPath}` : legalPath}${hash}`;
	}

	const homePath = nextLocale === 'ar' ? '/ar' : pathname.startsWith('/ar') ? '/en' : '/';

	return `${homePath}${hash}`;
};
