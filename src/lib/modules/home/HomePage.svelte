<script lang="ts">
	import { onMount } from 'svelte';
	import {
		AboutSection,
		ApproachSection,
		ContactSection,
		HeroSection,
		PresenceSection,
		ServicesSection,
		WhyNordicSection
	} from '$lib/modules/home';
	import { getHomeCopy } from '$lib/modules/home/content';
	import { initScrollNarrativeMotion } from '$lib/modules/home/scroll-narrative-motion';
	import type { Locale } from '$lib/modules/i18n';

	type Props = {
		locale: Locale;
	};

	let { locale }: Props = $props();
	let narrativeRegion = $state<HTMLElement | undefined>();
	const copy = $derived(getHomeCopy(locale));
	const siteUrl = 'https://nordicsolutions.ae';
	const pageUrl = $derived(locale === 'ar' ? `${siteUrl}/ar` : siteUrl);

	onMount(() => {
		let cleanup: (() => void) | undefined;
		let cancelled = false;

		if (!narrativeRegion) {
			return;
		}

		void initScrollNarrativeMotion(narrativeRegion).then((destroy) => {
			if (cancelled) {
				destroy();
				return;
			}

			cleanup = destroy;
		});

		return () => {
			cancelled = true;
			cleanup?.();
		};
	});
</script>

<svelte:head>
	<title>{copy.meta.title}</title>
	<meta name="description" content={copy.meta.description} />
	<meta property="og:title" content={copy.meta.ogTitle} />
	<meta property="og:description" content={copy.meta.ogDescription} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:locale" content={locale === 'ar' ? 'ar_AE' : 'en_AE'} />
	<meta name="twitter:title" content={copy.meta.ogTitle} />
	<meta name="twitter:description" content={copy.meta.ogDescription} />
	<link rel="canonical" href={pageUrl} />
	<link rel="alternate" hreflang="en" href={siteUrl} />
	<link rel="alternate" hreflang="ar" href={`${siteUrl}/ar`} />
	<link rel="alternate" hreflang="x-default" href={siteUrl} />
</svelte:head>

<HeroSection {locale} />
<div class="home-narrative-region" bind:this={narrativeRegion}>
	<div class="home-narrative-region__content">
		<AboutSection {locale} />
		<ServicesSection {locale} />
		<ApproachSection {locale} />
		<WhyNordicSection {locale} />
		<PresenceSection {locale} />
		<ContactSection {locale} />
	</div>
</div>

<style>
	.home-narrative-region {
		position: relative;
		z-index: 0;
		isolation: isolate;
		width: var(--app-viewport-width, 100vw);
		margin-left: calc(50% - var(--app-viewport-half, 50vw));
		overflow: hidden;
		background: transparent;
		--section-reveal-progress: 0;
	}

	.home-narrative-region__content {
		position: relative;
		z-index: 1;
		width: min(var(--max-content-width), calc(100% - (var(--container-gutter) * 2)));
		margin-inline: auto;
	}

	:global(html[dir='rtl']) .home-narrative-region {
		margin-left: 0;
		margin-right: calc(50% - var(--app-viewport-half, 50vw));
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.home-narrative-region[data-motion='reduced'] .section-shell),
		:global(.home-narrative-region[data-motion='reduced'] .contact-section) {
			--section-reveal-progress: 1;
		}
	}
</style>
