<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */
	import { browser } from '$app/environment';
	import { replaceState } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui';
	import { getHomeCopy, siteAssetPaths } from '$lib/modules/home/content';
	import { getCurrentLocaleHomePath, getOppositeLocalePath, type Locale } from '$lib/modules/i18n';
	import {
		createAppHeaderNavigationController,
		getNavigationLinkHref,
		isNavigationItemActive,
		resolveActiveNavigationSectionId,
		sectionIdFromHref
	} from '$lib/modules/navigation/app-header-navigation';
	import type { HomeSectionId, NavigationItem } from '$lib/modules/site-navigation';
	import { onMount, tick } from 'svelte';

	type Props = {
		navigation: NavigationItem[];
		locale: Locale;
	};

	let { navigation, locale }: Props = $props();

	let isMobileMenuOpen = $state(false);
	let isHeaderElevated = $state(false);
	let activeSectionId = $state<HomeSectionId | null>(null);
	let desktopNavElement = $state<HTMLElement>();
	let navRailStyle = $state('');
	let isNavRailVisible = $state(false);
	let navRailTarget = $state<HTMLElement | null>(null);

	const resolveDynamic = resolve as (route: string) => string;

	const currentPathname = $derived(page.url.pathname);
	const copy = $derived(getHomeCopy(locale));
	const primaryItem = $derived(navigation.find((item) => item.isPrimary) ?? null);
	const navigationWithoutPrimary = $derived(navigation.filter((item) => !item.isPrimary));

	const sectionIds = $derived(navigation.map((item) => sectionIdFromHref(item.href)));
	const visibleNavigationSectionIds = $derived(
		navigationWithoutPrimary.map((item) => sectionIdFromHref(item.href))
	);
	const activeNavigationSectionId = $derived(
		resolveActiveNavigationSectionId({
			activeSectionId,
			sectionIds,
			visibleSectionIds: visibleNavigationSectionIds
		})
	);
	const currentHomeHref = $derived(getCurrentLocaleHomePath(locale, currentPathname));
	const localeToggleHref = $derived(getOppositeLocalePath(locale, currentPathname, page.url.hash));

	const isItemActive = (item: NavigationItem): boolean => {
		return isNavigationItemActive({ item, activeNavigationSectionId });
	};

	const syncNavRail = (target: HTMLElement | null = navRailTarget) => {
		if (!browser || !desktopNavElement) {
			return;
		}

		const activeTarget =
			target ?? desktopNavElement.querySelector<HTMLElement>('.app-header__link--active');

		if (!activeTarget) {
			isNavRailVisible = false;
			return;
		}

		const navRect = desktopNavElement.getBoundingClientRect();
		const targetRect = activeTarget.getBoundingClientRect();

		navRailStyle = [
			`--nav-rail-x: ${targetRect.left - navRect.left}px`,
			`--nav-rail-y: ${targetRect.top - navRect.top}px`,
			`--nav-rail-width: ${targetRect.width}px`,
			`--nav-rail-height: ${targetRect.height}px`
		].join('; ');
		isNavRailVisible = true;
	};

	const navigationController = createAppHeaderNavigationController({
		getCurrentPathname: () => currentPathname,
		getSectionIds: () => sectionIds,
		replaceUrl: (url) => replaceState(resolveDynamic(url), {}),
		setActiveSectionId: (sectionId) => (activeSectionId = sectionId),
		setHeaderElevated: (isElevated) => (isHeaderElevated = isElevated),
		setMobileMenuOpen: (isOpen) => (isMobileMenuOpen = isOpen)
	});

	const handleSectionNavigation = (item: NavigationItem, event?: MouseEvent) => {
		isMobileMenuOpen = false;

		if (!browser || item.target !== 'home-section') {
			return;
		}

		event?.preventDefault();
		navigationController.scrollToSection(sectionIdFromHref(item.href));
	};

	const handlePrimaryAction = () => {
		isMobileMenuOpen = false;

		if (!browser) {
			return;
		}

		if (!primaryItem || primaryItem.target !== 'home-section') {
			navigationController.scrollToSection('contact');
			return;
		}

		if (currentPathname !== currentHomeHref) {
			window.location.assign(resolveDynamic(`${currentHomeHref}#contact`));
			return;
		}

		navigationController.scrollToSection(sectionIdFromHref(primaryItem.href));
	};

	$effect(() => {
		if (currentPathname) {
			isMobileMenuOpen = false;
		}
	});

	$effect(() => {
		if (!browser) {
			return;
		}

		const syncKey = `${currentPathname}:${activeNavigationSectionId ?? ''}`;

		void tick().then(() => {
			if (syncKey === `${currentPathname}:${activeNavigationSectionId ?? ''}`) {
				syncNavRail();
			}
		});
	});

	$effect(() => {
		if (browser) {
			void tick().then(() => navigationController.syncRouteState());
		}
	});

	onMount(() => {
		if (!browser) {
			return;
		}

		const cleanupNavigation = navigationController.mount();

		return cleanupNavigation;
	});
</script>

<header
	class:app-header--elevated={isHeaderElevated}
	class:app-header--menu-open={isMobileMenuOpen}
	class="app-header"
>
	<div class="shell-container">
		<div class="app-header__pill">
			<a
				class="app-header__brand"
				href={resolveDynamic(currentHomeHref)}
				aria-label="Nordic Solutions home"
			>
				<img
					class="app-header__logo"
					src={siteAssetPaths.logo}
					alt="Nordic Solutions"
					width="147"
					height="71"
				/>
			</a>

			<nav
				bind:this={desktopNavElement}
				class="app-header__desktop-nav"
				aria-label="Primary navigation"
				onmouseleave={() => {
					navRailTarget = null;
					syncNavRail(null);
				}}
				onfocusout={(event) => {
					if (
						event.relatedTarget instanceof Node &&
						desktopNavElement?.contains(event.relatedTarget)
					) {
						return;
					}

					navRailTarget = null;
					syncNavRail(null);
				}}
			>
				<span
					class:app-header__nav-rail--visible={isNavRailVisible}
					class="app-header__nav-rail"
					style={navRailStyle}
					aria-hidden="true"
				></span>
				<ul class="app-header__list">
					{#each navigationWithoutPrimary as item (item.key)}
						<li>
							<a
								class:app-header__link--active={isItemActive(item)}
								class="app-header__link"
								data-nav-section-id={sectionIdFromHref(item.href)}
								href={resolveDynamic(getNavigationLinkHref(item, currentPathname))}
								onmouseenter={(event) => {
									navRailTarget = event.currentTarget as HTMLElement;
									syncNavRail(navRailTarget);
								}}
								onfocus={(event) => {
									navRailTarget = event.currentTarget as HTMLElement;
									syncNavRail(navRailTarget);
								}}
								onclick={(event) => handleSectionNavigation(item, event)}
								aria-current={isItemActive(item) ? 'page' : undefined}
							>
								{item.title}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div class="app-header__actions">
				<a class="app-header__language" href={resolveDynamic(localeToggleHref)}>
					{copy.header.languageToggle}
				</a>

				<Button
					type="button"
					variant="primary"
					size="md"
					class="app-header__cta"
					onclick={handlePrimaryAction}>{copy.header.contact}</Button
				>

				<button
					type="button"
					class="app-header__menu-toggle"
					onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
					aria-expanded={isMobileMenuOpen}
					aria-controls="app-mobile-navigation"
					aria-label={isMobileMenuOpen ? copy.header.closeMenu : copy.header.openMenu}
				>
					<span class="app-header__menu-line"></span>
					<span class="app-header__menu-line"></span>
					<span class="app-header__menu-line"></span>
				</button>
			</div>
		</div>
	</div>

	<div
		class:app-header__mobile-panel--open={isMobileMenuOpen}
		class="app-header__mobile-panel"
		inert={!isMobileMenuOpen}
	>
		<div class="app-header__mobile-panel-inner">
			<nav aria-label="Mobile navigation">
				<ul class="app-header__mobile-list" id="app-mobile-navigation">
					{#each navigationWithoutPrimary as item (item.key)}
						<li>
							<a
								class:app-header__mobile-link--active={isItemActive(item)}
								class="app-header__mobile-link"
								href={resolveDynamic(getNavigationLinkHref(item, currentPathname))}
								onclick={(event) => handleSectionNavigation(item, event)}
								aria-current={isItemActive(item) ? 'page' : undefined}
							>
								{item.title}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<Button
				type="button"
				variant="primary"
				size="lg"
				fullWidth={true}
				class="app-header__mobile-cta"
				onclick={handlePrimaryAction}
			>
				{copy.header.contactLong}
			</Button>

			<a class="app-header__mobile-language" href={resolveDynamic(localeToggleHref)}>
				{copy.header.languageToggle}
			</a>
		</div>
	</div>
</header>

<style>
	.app-header {
		--container-gutter: clamp(1rem, 3vw, 2.5rem);

		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 40;
		padding-top: 0;
		background-color: transparent;
		background-image: linear-gradient(180deg, rgb(255 255 255 / 0.7), transparent);
		border-bottom: 0 solid transparent;
		backdrop-filter: none;
		transition:
			background-color var(--duration-base) var(--ease-standard),
			border-color var(--duration-base) var(--ease-standard),
			box-shadow var(--duration-base) var(--ease-standard);
	}

	.app-header--elevated {
		background-color: rgb(255 255 255 / 0.96);
		background-image: none;
		box-shadow: 0 0.35rem 1rem rgb(16 19 22 / 0.07);
		backdrop-filter: blur(14px);
	}

	.app-header--menu-open {
		background-color: var(--color-bg-elevated);
		background-image: none;
		border-bottom-width: 1px;
		border-bottom-color: var(--panel-border-color);
		box-shadow: 0 0.35rem 1rem rgb(16 19 22 / 0.08);
		backdrop-filter: none;
	}

	.app-header__pill {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: clamp(0.55rem, 1.4vw, 1rem);
		min-height: var(--header-height);
		padding: 0.45rem 0 0.45rem 0;
		border-radius: 0;
		border: 0;
		background: transparent;
		box-shadow: none;
		transition:
			color var(--duration-base) var(--ease-standard),
			background-color var(--duration-base) var(--ease-standard);
	}

	.app-header--elevated .app-header__pill {
		background: transparent;
	}

	.app-header__brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		min-height: 2.75rem;
		min-width: 0;
		text-decoration: none;
		color: inherit;
	}

	.app-header__logo {
		width: clamp(5.4rem, 8vw, 7.7rem);
		height: auto;
	}

	.app-header__desktop-nav {
		position: relative;
		justify-self: center;
		padding: 0.1rem;
	}

	.app-header__nav-rail {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		width: var(--nav-rail-width, 0);
		height: var(--nav-rail-height, 0);
		border-radius: var(--radius-md);
		background: rgb(255 255 255 / 0.72);
		border: 1px solid color-mix(in srgb, var(--color-border-strong) 12%, transparent);
		box-shadow: 0 0.4rem 1rem rgb(16 19 22 / 0.05);
		opacity: 0;
		pointer-events: none;
		transform: translate3d(var(--nav-rail-x, 0), var(--nav-rail-y, 0), 0);
		transition:
			transform var(--duration-base) var(--ease-emphasis),
			width var(--duration-base) var(--ease-emphasis),
			height var(--duration-base) var(--ease-emphasis),
			opacity var(--duration-fast) var(--ease-standard),
			background-color var(--duration-base) var(--ease-standard);
	}

	.app-header--elevated .app-header__nav-rail,
	.app-header--menu-open .app-header__nav-rail {
		background: color-mix(in srgb, var(--color-surface-muted) 42%, transparent);
	}

	.app-header__nav-rail--visible {
		opacity: 1;
	}

	.app-header__list {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(0.3rem, 0.8vw, 0.55rem);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.app-header__link {
		display: inline-flex;
		position: relative;
		align-items: center;
		justify-content: center;
		min-height: 2.75rem;
		padding: 0.25rem 0.7rem;
		border-radius: var(--radius-md);
		text-decoration: none;
		color: var(--color-text-muted);
		font-size: 0.91rem;
		font-weight: 550;
		letter-spacing: 0;
		transition:
			color var(--duration-base) var(--ease-standard),
			transform var(--duration-base) var(--ease-emphasis);
	}

	.app-header__link::after {
		display: none;
	}

	.app-header__link--active {
		background: transparent;
		color: var(--color-text-primary);
		box-shadow: none;
	}

	@media (hover: hover) {
		.app-header__link:hover {
			background: transparent;
			color: var(--color-text-primary);
			transform: translateY(-1px);
		}
	}

	.app-header__actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.55rem;
		justify-self: end;
		margin-inline-start: auto;
	}

	.app-header__language,
	.app-header__mobile-language {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.25rem;
		padding-inline: 0.95rem;
		border-radius: var(--radius-md);
		border: 1px solid color-mix(in srgb, var(--color-accent) 34%, transparent);
		background: rgb(255 255 255 / 0.58);
		color: var(--color-accent-deep);
		font-size: 0.9rem;
		font-weight: 700;
		text-decoration: none;
		transition:
			background-color var(--duration-base) var(--ease-standard),
			border-color var(--duration-base) var(--ease-standard),
			color var(--duration-base) var(--ease-standard),
			transform var(--duration-base) var(--ease-emphasis);
	}

	.app-header__mobile-language {
		width: 100%;
		min-height: 2.75rem;
	}

	.app-header__language {
		min-height: 2.75rem;
	}

	@media (hover: hover) {
		.app-header__language:hover {
			background: rgb(255 255 255 / 0.86);
			border-color: color-mix(in srgb, var(--color-accent) 62%, transparent);
			color: var(--color-accent);
			transform: translateY(-1px);
		}
	}

	:global(.app-header__cta.ui-button) {
		min-height: 2.75rem;
		padding-inline: 0.95rem;
		border-radius: var(--radius-md);
		font-size: 0.9rem;
	}

	.app-header__menu-toggle {
		display: none;
		position: relative;
		width: 2.75rem;
		height: 2.75rem;
		padding: 0;
		border: 0;
		border-radius: 0;
		background: transparent;
		color: var(--color-text-primary);
		box-shadow: none;
		-webkit-tap-highlight-color: transparent;
		outline: none;
		transition:
			color var(--duration-base) var(--ease-standard),
			opacity var(--duration-base) var(--ease-standard);
	}

	.app-header__menu-toggle:focus-visible {
		color: var(--color-accent);
	}

	.app-header__menu-line {
		position: absolute;
		inset-inline-end: 0;
		width: 1.18rem;
		height: 2px;
		border-radius: 999px;
		background: currentColor;
		transition:
			transform var(--duration-base) var(--ease-emphasis),
			opacity var(--duration-base) var(--ease-standard);
	}

	.app-header__menu-line:nth-child(1) {
		top: 0.88rem;
	}

	.app-header__menu-line:nth-child(2) {
		top: 1.34rem;
	}

	.app-header__menu-line:nth-child(3) {
		top: 1.8rem;
	}

	.app-header__menu-toggle[aria-expanded='true'] .app-header__menu-line:nth-child(1) {
		transform: translateY(0.46rem) rotate(45deg);
	}

	.app-header__menu-toggle[aria-expanded='true'] .app-header__menu-line:nth-child(2) {
		opacity: 0;
	}

	.app-header__menu-toggle[aria-expanded='true'] .app-header__menu-line:nth-child(3) {
		transform: translateY(-0.46rem) rotate(-45deg);
	}

	.app-header__mobile-panel {
		display: none;
	}

	@media (hover: hover) {
		.app-header__menu-toggle:hover {
			color: var(--color-accent);
		}
	}

	@media (max-width: 960px) {
		.app-header__pill {
			grid-template-columns: auto 1fr auto;
		}

		.app-header__desktop-nav,
		.app-header__actions :global(.app-header__cta.ui-button),
		.app-header__language {
			display: none;
		}

		.app-header__actions {
			grid-column: 3;
		}

		.app-header__menu-toggle {
			display: inline-flex;
			align-items: center;
			justify-content: flex-end;
		}

		.app-header__mobile-panel {
			display: grid;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			z-index: 39;
			max-height: calc(100svh - var(--header-height));
			margin: 0;
			overflow-y: auto;
			padding: 1rem;
			border-radius: 0;
			border: 0;
			border-top: 1px solid var(--panel-border-color);
			background: var(--color-bg-elevated);
			box-shadow: var(--shadow-md);
			visibility: hidden;
			opacity: 0;
			pointer-events: none;
			transform: translate3d(0, -0.5rem, 0);
			transition:
				opacity var(--duration-base) var(--ease-standard),
				transform var(--duration-base) var(--ease-standard),
				visibility 0s linear var(--duration-base);
		}

		.app-header__mobile-panel-inner {
			display: grid;
			gap: 1rem;
			min-height: 0;
		}

		.app-header__mobile-panel:global(.app-header__mobile-panel--open) {
			visibility: visible;
			opacity: 1;
			pointer-events: auto;
			transform: translate3d(0, 0, 0);
			transition:
				opacity var(--duration-base) var(--ease-standard),
				transform var(--duration-base) var(--ease-standard),
				visibility 0s linear 0s;
		}

		.app-header__mobile-list {
			display: grid;
			gap: 0.35rem;
			margin: 0;
			padding: 0;
			list-style: none;
		}

		.app-header__mobile-link {
			display: block;
			padding: 0.82rem 0.9rem;
			border-radius: var(--radius-md);
			text-decoration: none;
			color: var(--color-text-primary);
			background: transparent;
			border: 1px solid transparent;
		}

		.app-header__mobile-link--active {
			background: color-mix(in srgb, var(--color-bg-subtle) 62%, transparent);
			border-color: var(--panel-border-color);
		}

		:global(.app-header__mobile-cta.ui-button) {
			min-height: 2.85rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.app-header__nav-rail,
		.app-header__mobile-panel {
			transition: none;
		}
	}
</style>
