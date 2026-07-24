<script lang="ts">
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import AppFooter from '$lib/components/AppFooter.svelte';
	import AppHeader from '$lib/components/AppHeader.svelte';
	import { siteAssetPaths } from '$lib/modules/home/content';
	import { getLocaleDirection, resolveLocaleFromPath } from '$lib/modules/i18n';
	import { getPrimaryNavigation } from '$lib/modules/site-navigation';
	import { onMount } from 'svelte';

	type Props = {
		children: import('svelte').Snippet;
	};

	let { children }: Props = $props();

	const currentPathname = $derived(page.url.pathname);
	const locale = $derived(resolveLocaleFromPath(currentPathname));
	const localizedNavigation = $derived(getPrimaryNavigation(locale));
	let isIntroVisible = $state(true);
	let isIntroExiting = $state(false);

	const markIntroReleased = () => {
		const win = window as Window & { __nordicIntroReleased?: boolean };

		if (win.__nordicIntroReleased) {
			return;
		}

		win.__nordicIntroReleased = true;
		window.dispatchEvent(new Event('nordic:intro:release'));
	};

	const markIntroDone = () => {
		const win = window as Window & { __nordicIntroDone?: boolean };

		win.__nordicIntroDone = true;
		window.dispatchEvent(new Event('nordic:intro:done'));
	};

	$effect(() => {
		if (!browser) {
			return;
		}

		document.documentElement.lang = locale;
		document.documentElement.dir = getLocaleDirection(locale);
	});

	onMount(() => {
		if (!browser) {
			return;
		}

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const exitIntro = () => {
			if (prefersReducedMotion) {
				markIntroReleased();
				isIntroVisible = false;
				markIntroDone();
				return;
			}

			window.setTimeout(() => {
				isIntroExiting = true;
				markIntroReleased();

				window.setTimeout(() => {
					isIntroVisible = false;
					markIntroDone();
				}, 520);
			}, 280);
		};

		if (document.readyState === 'complete') {
			exitIntro();
			return;
		}

		window.addEventListener('load', exitIntro, { once: true });

		return () => window.removeEventListener('load', exitIntro);
	});
</script>

<div class="site-shell">
	{#if isIntroVisible}
		<div class:site-intro--exiting={isIntroExiting} class="site-intro" aria-hidden="true">
			<div class="site-intro__mark">
				<img src={siteAssetPaths.logo} alt="" width="147" height="71" />
				<span></span>
			</div>
		</div>
	{/if}

	<AppHeader navigation={localizedNavigation} {locale} />

	<main class="site-main" id="main-content" tabindex="-1">
		<div class="shell-container shell-container--page">
			{#key currentPathname}
				<div class="page-transition">{@render children()}</div>
			{/key}
		</div>
	</main>

	<AppFooter navigation={localizedNavigation} {locale} />
</div>

<style>
	:global(.page-transition > section + section) {
		margin-top: clamp(0.25rem, 1vw, 0.75rem);
	}

	:global(.page-transition > #hero + section) {
		margin-top: 0;
	}

	.shell-container--page {
		display: grid;
		gap: 0;
	}

	.page-transition {
		display: contents;
	}

	.site-intro {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: grid;
		place-items: center;
		background: var(--color-bg-canvas);
		opacity: 1;
		pointer-events: auto;
		transition: opacity 520ms var(--ease-standard);
	}

	.site-intro--exiting {
		opacity: 0;
		pointer-events: none;
	}

	.site-intro__mark {
		display: grid;
		justify-items: center;
		gap: 1.1rem;
		animation: site-intro-mark 560ms var(--ease-expressive) 120ms both;
	}

	.site-intro__mark img {
		width: clamp(7.2rem, 12vw, 9.5rem);
		height: auto;
	}

	.site-intro__mark span {
		width: clamp(8rem, 15vw, 11rem);
		height: 2px;
		border-radius: 999px;
		background: linear-gradient(90deg, var(--color-accent), rgb(226 29 47 / 0.1));
		transform: scaleX(0);
		transform-origin: left;
		animation: site-intro-buffer 900ms var(--ease-emphasis) 220ms both;
	}

	:global(html[dir='rtl']) .site-intro__mark span {
		transform-origin: right;
	}

	@keyframes site-intro-mark {
		from {
			opacity: 0;
			transform: translate3d(0, 0.45rem, 0);
		}

		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	@keyframes site-intro-buffer {
		to {
			transform: scaleX(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.site-intro,
		.site-intro__mark,
		.site-intro__mark span {
			animation: none;
			transition: none;
		}
	}
</style>
