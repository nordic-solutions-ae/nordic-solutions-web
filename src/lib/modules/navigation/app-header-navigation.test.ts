/// <reference types="bun-types" />

import { describe, expect, test } from 'bun:test';
import { getOppositeLocalePath } from '../i18n';
import { primaryNavigation, type HomeSectionId, type NavigationItem } from '../site-navigation';
import {
	getNavigationLinkHref,
	isNavigationItemActive,
	resolveActiveNavigationSectionId,
	sectionIdFromHref
} from './app-header-navigation';

const navigation = primaryNavigation satisfies NavigationItem[];
const sectionIds = navigation.map((item) => sectionIdFromHref(item.href));
const visibleSectionIds = navigation
	.filter((item) => !item.isPrimary)
	.map((item) => sectionIdFromHref(item.href));

describe('app-header navigation helpers', () => {
	test('derives typed home section ids from navigation hashes', () => {
		expect(sectionIdFromHref('#why-nordic')).toBe('why-nordic');
	});

	test('builds localized home hash hrefs', () => {
		const homeItem = navigation[0]!;
		const servicesItem = navigation[2]!;

		expect(getNavigationLinkHref(homeItem, '/')).toBe('/');
		expect(getNavigationLinkHref(servicesItem, '/')).toBe('/#services');
		expect(getNavigationLinkHref(servicesItem, '/ar')).toBe('/ar#services');
		expect(getNavigationLinkHref(servicesItem, '/en')).toBe('/en#services');
	});

	test('preserves the selected section when switching languages', () => {
		expect(getOppositeLocalePath('ar', '/ar', '#contact')).toBe('/en#contact');
	});

	test('uses the current visible section on the home route', () => {
		expect(
			resolveActiveNavigationSectionId({
				activeSectionId: 'services',
				sectionIds,
				visibleSectionIds
			})
		).toBe('services');
		expect(
			resolveActiveNavigationSectionId({
				activeSectionId: 'services',
				sectionIds,
				visibleSectionIds
			})
		).toBe('services');
	});

	test('falls back to the previous visible nav item for hidden narrative sections', () => {
		expect(
			resolveActiveNavigationSectionId({
				activeSectionId: 'presence',
				sectionIds: [...sectionIds, 'presence' as HomeSectionId],
				visibleSectionIds
			})
		).toBe('why-nordic');
	});

	test('checks active items from section state', () => {
		const aboutItem = navigation[1]!;
		expect(
			isNavigationItemActive({
				item: aboutItem,
				activeNavigationSectionId: 'about'
			})
		).toBe(true);
		expect(
			isNavigationItemActive({
				item: aboutItem,
				activeNavigationSectionId: 'services'
			})
		).toBe(false);
	});
});
