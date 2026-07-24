import type { HomeSectionId, NavigationItem } from '$lib/modules/site-navigation';
import { getCurrentLocaleHomePath, resolveLocaleFromPath } from '$lib/modules/i18n';

type AppHeaderNavigationControllerOptions = {
	getCurrentPathname: () => string;
	getSectionIds: () => HomeSectionId[];
	replaceUrl: (url: string) => void;
	setActiveSectionId: (sectionId: HomeSectionId | null) => void;
	setHeaderElevated: (isElevated: boolean) => void;
	setMobileMenuOpen: (isOpen: boolean) => void;
};

const HEADER_SELECTOR = '.app-header';
const DESKTOP_NAV_BREAKPOINT = 960;

const isBrowser = (): boolean => typeof window !== 'undefined' && typeof document !== 'undefined';

export const sectionIdFromHref = (href: NavigationItem['href']): HomeSectionId =>
	href.slice(1) as HomeSectionId;

export const getNavigationLinkHref = (item: NavigationItem, currentPathname: string): string => {
	const homePath = getCurrentLocaleHomePath(
		resolveLocaleFromPath(currentPathname),
		currentPathname
	);

	return item.href === '#hero' ? homePath : `${homePath}${item.href}`;
};

export const resolveActiveNavigationSectionId = ({
	activeSectionId,
	sectionIds,
	visibleSectionIds
}: {
	activeSectionId: HomeSectionId | null;
	sectionIds: HomeSectionId[];
	visibleSectionIds: HomeSectionId[];
}): HomeSectionId | null => {
	if (!activeSectionId) {
		return null;
	}

	if (visibleSectionIds.includes(activeSectionId)) {
		return activeSectionId;
	}

	const activeSectionIndex = sectionIds.indexOf(activeSectionId);

	for (let index = activeSectionIndex; index >= 0; index -= 1) {
		const candidate = sectionIds[index];

		if (candidate && visibleSectionIds.includes(candidate)) {
			return candidate;
		}
	}

	return null;
};

export const isNavigationItemActive = ({
	item,
	activeNavigationSectionId
}: {
	item: NavigationItem;
	activeNavigationSectionId: HomeSectionId | null;
}): boolean => {
	return sectionIdFromHref(item.href) === activeNavigationSectionId;
};

const getHeaderActivationOffset = (): number => {
	if (!isBrowser()) {
		return 0;
	}

	const header = document.querySelector(HEADER_SELECTOR);

	if (!(header instanceof HTMLElement)) {
		return 0;
	}

	return header.offsetHeight + 20;
};

const getSectionPageTop = (section: HTMLElement): number =>
	section.getBoundingClientRect().top + window.scrollY;

export const createAppHeaderNavigationController = ({
	getCurrentPathname,
	getSectionIds,
	replaceUrl,
	setActiveSectionId,
	setHeaderElevated,
	setMobileMenuOpen
}: AppHeaderNavigationControllerOptions) => {
	let homeSections: HTMLElement[] = [];
	let homeSectionTops: number[] = [];
	let headerActivationOffset = 0;
	let lastHeaderElevated: boolean | undefined;
	let scrollSyncFrame = 0;

	const collectHomeSections = () => {
		if (!isBrowser()) {
			homeSections = [];
			homeSectionTops = [];
			return;
		}

		const collectedSections = getSectionIds()
			.map((id) => document.getElementById(id))
			.filter((section): section is HTMLElement => section !== null);
		const sectionsWithTop = collectedSections
			.map((section) => ({ section, top: getSectionPageTop(section) }))
			.sort((a, b) => a.top - b.top);

		homeSections = sectionsWithTop.map(({ section }) => section);
		homeSectionTops = sectionsWithTop.map(({ top }) => top);
		headerActivationOffset = getHeaderActivationOffset();
	};

	const syncActiveFromScroll = () => {
		if (!isBrowser() || homeSections.length === 0) {
			return;
		}

		if (window.scrollY <= 0) {
			setActiveSectionId(null);
			return;
		}

		const sectionIds = getSectionIds();
		const activationLine = window.scrollY + headerActivationOffset;
		let nextActiveSection: HomeSectionId = 'hero';

		for (let index = 0; index < homeSections.length; index += 1) {
			const section = homeSections[index];

			if (!section) {
				continue;
			}

			const sectionId = section.id as HomeSectionId;

			if (!sectionIds.includes(sectionId)) {
				continue;
			}

			if ((homeSectionTops[index] ?? 0) <= activationLine) {
				nextActiveSection = sectionId;
				continue;
			}

			break;
		}

		setActiveSectionId(nextActiveSection);
	};

	const syncHeaderElevation = () => {
		const nextHeaderElevated = window.scrollY > 12;

		if (nextHeaderElevated === lastHeaderElevated) {
			return;
		}

		lastHeaderElevated = nextHeaderElevated;
		setHeaderElevated(nextHeaderElevated);
	};

	const syncScrollState = () => {
		scrollSyncFrame = 0;
		syncHeaderElevation();
		syncActiveFromScroll();
	};

	const queueScrollSync = () => {
		if (scrollSyncFrame) {
			return;
		}

		scrollSyncFrame = requestAnimationFrame(syncScrollState);
	};

	const syncActiveFromHash = () => {
		if (!isBrowser()) {
			return;
		}

		const hash = window.location.hash.slice(1) as HomeSectionId;

		if (hash && getSectionIds().includes(hash)) {
			setActiveSectionId(hash === 'hero' && window.scrollY <= 0 ? null : hash);
			return;
		}

		syncActiveFromScroll();
	};

	const syncRouteState = () => {
		collectHomeSections();
		syncActiveFromScroll();
		syncActiveFromHash();
	};

	const scrollToSection = (sectionId: HomeSectionId) => {
		if (!isBrowser()) {
			return;
		}

		const section = document.getElementById(sectionId);

		if (!section) {
			return;
		}

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		section.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
		const currentPathname = getCurrentPathname();
		const homePath = getCurrentLocaleHomePath(
			resolveLocaleFromPath(currentPathname),
			currentPathname
		);
		replaceUrl(sectionId === 'hero' ? homePath : `${homePath}#${sectionId}`);
		setActiveSectionId(sectionId === 'hero' && window.scrollY <= 0 ? null : sectionId);
	};

	const mount = () => {
		if (!isBrowser()) {
			return () => {};
		}

		const onScroll = queueScrollSync;

		const onResize = () => {
			if (window.innerWidth >= DESKTOP_NAV_BREAKPOINT) {
				setMobileMenuOpen(false);
			}

			collectHomeSections();
			queueScrollSync();
		};

		const onHashChange = () => {
			syncActiveFromHash();
		};

		const onEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setMobileMenuOpen(false);
			}
		};

		collectHomeSections();
		syncScrollState();
		syncActiveFromHash();

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize);
		window.addEventListener('hashchange', onHashChange);
		window.addEventListener('keydown', onEscape);

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('hashchange', onHashChange);
			window.removeEventListener('keydown', onEscape);

			if (scrollSyncFrame) {
				cancelAnimationFrame(scrollSyncFrame);
			}
		};
	};

	return {
		mount,
		scrollToSection,
		syncRouteState
	};
};
