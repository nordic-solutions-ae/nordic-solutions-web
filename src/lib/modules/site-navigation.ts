import type { Locale } from '$lib/modules/i18n';

type NavigationKey = 'home' | 'about' | 'services' | 'approach' | 'why-nordic' | 'contact';

export type HomeSectionId =
	'hero' | 'about' | 'services' | 'approach' | 'why-nordic' | 'presence' | 'contact';

export type NavigationTarget = 'home-section';

export type NavigationItem = {
	key: NavigationKey;
	title: string;
	href: `#${HomeSectionId}`;
	target: NavigationTarget;
	isPrimary?: boolean;
	summary: string;
};

const baseNavigation: NavigationItem[] = [
	{
		key: 'home',
		title: 'Home',
		href: '#hero',
		target: 'home-section',
		summary: 'Hero entry point and narrative bridge to all core sections.'
	},
	{
		key: 'about',
		title: 'About',
		href: '#about',
		target: 'home-section',
		summary: 'Company profile, positioning, and trust baseline.'
	},
	{
		key: 'services',
		title: 'Services',
		href: '#services',
		target: 'home-section',
		summary: 'Capability stack shown as neutral corporate blocks.'
	},
	{
		key: 'approach',
		title: 'Approach',
		href: '#approach',
		target: 'home-section',
		summary: 'Process discipline and execution workflow overview.'
	},
	{
		key: 'why-nordic',
		title: 'Why Nordic',
		href: '#why-nordic',
		target: 'home-section',
		summary: 'Trust arguments and partnership differentiators.'
	},
	{
		key: 'contact',
		title: 'Contact',
		href: '#contact',
		target: 'home-section',
		isPrimary: true,
		summary: 'Intentional and direct path to first communication.'
	}
];

const arabicNavigationTitles: Record<NavigationKey, string> = {
	home: 'الرئيسية',
	about: 'من نحن',
	services: 'الخدمات',
	approach: 'النهج',
	'why-nordic': 'لماذا Nordic',
	contact: 'تواصل'
};

export const getPrimaryNavigation = (locale: Locale): NavigationItem[] =>
	baseNavigation.map((item) => ({
		...item,
		title: locale === 'ar' ? arabicNavigationTitles[item.key] : item.title
	}));

export const primaryNavigation = getPrimaryNavigation('en');
