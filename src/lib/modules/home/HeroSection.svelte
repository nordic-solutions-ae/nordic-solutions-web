<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui';
	import { getHomeCopy, siteAssetSets } from '$lib/modules/home/content';
	import { initHeroMotion } from '$lib/modules/home/hero-motion';
	import type { Locale } from '$lib/modules/i18n';

	type Props = {
		locale: Locale;
	};

	let { locale }: Props = $props();

	let heroElement = $state<HTMLElement | undefined>();
	const copy = $derived(getHomeCopy(locale));
	const heroImage = siteAssetSets.heroPartners;

	onMount(() => {
		let cleanup: (() => void) | undefined;
		let cancelled = false;

		if (!heroElement) {
			return;
		}

		void initHeroMotion(heroElement).then((destroy) => {
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

<section id="hero" class="hero-section" aria-labelledby="hero-heading" bind:this={heroElement}>
	<div class="hero-section__shell">
		<div class="hero-section__copy reveal-item">
			<p class="hero-section__eyebrow">{copy.hero.eyebrow}</p>
			<h1 class="type-hero" id="hero-heading">
				{#each copy.hero.titleLines as line (line)}
					<span class="hero-section__heading-line"><span>{line}</span></span>
				{/each}
			</h1>
			<p class="hero-section__lead">
				{copy.hero.lead}
			</p>

			<div class="hero-section__actions">
				<Button href="#contact" variant="primary" size="lg">{copy.hero.primaryCta}</Button>
				<Button
					href="#services"
					variant="secondary"
					size="lg"
					class="hero-section__secondary-action">{copy.hero.secondaryCta}</Button
				>
			</div>

			<div class="hero-section__signals" aria-label={copy.hero.signalsLabel}>
				<p class="hero-section__signal-title">{copy.hero.signalsLabel}</p>
				<div class="hero-section__stats reveal-stagger">
					{#each copy.hero.stats as stat (stat.label)}
						<div class="hero-section__stat">
							<span>{stat.label}</span>
							<strong>{stat.value}</strong>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="hero-section__visual reveal-item reveal-item--delay-1">
			<div class="hero-section__visual-frame">
				<img
					class="hero-section__image"
					src={heroImage.src}
					alt={copy.hero.visualAlt}
					width={heroImage.width}
					height={heroImage.height}
					loading="eager"
					decoding="async"
					fetchpriority="high"
				/>
				<div class="hero-section__visual-copy">
					<p>{copy.hero.visualEyebrow}</p>
					<h2>{copy.hero.visualTitle}</h2>
					<span>{copy.hero.visualText}</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		--hero-block-start: calc(var(--header-height) + clamp(1rem, 3svh, 2.35rem));
		--hero-block-end: clamp(1.8rem, 4svh, 3.2rem);
		position: relative;
		z-index: 1;
		contain: paint;
		width: var(--app-viewport-width, 100vw);
		margin-left: calc(50% - var(--app-viewport-half, 50vw));
		padding-inline: var(--container-gutter);
		padding-top: var(--hero-block-start);
		padding-bottom: var(--hero-block-end);
		height: auto;
		min-height: min(40rem, calc(100svh - clamp(2.5rem, 6svh, 4.5rem)));
		overflow: hidden;
		background: transparent;
	}

	.hero-section::before,
	.hero-section::after {
		display: none;
	}

	.hero-section__shell {
		position: relative;
		z-index: 1;
		display: grid;
		width: min(var(--max-content-width), 100%);
		height: 100%;
		margin-inline: auto;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		gap: clamp(1.5rem, 4vw, 3.5rem);
		align-items: stretch;
		padding: 0;
		border-radius: 0;
		background: transparent;
		border: 0;
		box-shadow: none;
		overflow: visible;
	}

	.hero-section__shell::before {
		display: none;
	}

	.hero-section__copy {
		position: relative;
		z-index: 1;
		display: grid;
		align-content: center;
		gap: 0.95rem;
		min-width: 0;
		min-height: 0;
	}

	.hero-section__eyebrow {
		margin: 0;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-accent);
	}

	.hero-section :global(.type-hero) {
		max-width: 15.2ch;
		font-size: clamp(3.7rem, 5vw, 4.45rem);
	}

	.hero-section__heading-line {
		display: block;
		overflow: visible;
		padding-bottom: 0.045em;
	}

	.hero-section__heading-line > span {
		display: block;
		transform: translate3d(0, 0, 0);
	}

	.hero-section__lead {
		max-width: 29rem;
		font-size: 0.96rem;
		line-height: 1.4;
		color: var(--color-text-muted);
	}

	.hero-section__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
	}

	.hero-section__actions :global(.ui-button) {
		flex: 0 0 auto;
	}

	.hero-section__actions :global(.hero-section__secondary-action) {
		background: rgb(245 247 248 / 0.6);
		border-color: rgb(16 19 22 / 0.18);
		box-shadow:
			0 1px 1px rgb(255 255 255 / 0.36) inset,
			0 0.35rem 1rem rgb(16 19 22 / 0.06);
		backdrop-filter: blur(8px);
	}

	@media (hover: hover) {
		.hero-section__actions :global(.hero-section__secondary-action:hover) {
			background: rgb(245 247 248 / 0.78);
			border-color: rgb(16 19 22 / 0.28);
		}
	}

	.hero-section__signals {
		display: grid;
		gap: 0.55rem;
		max-width: 34rem;
		margin-top: 0.15rem;
	}

	.hero-section__signal-title {
		margin: 0;
		font-size: 0.64rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	.hero-section__stats {
		--hero-signal-border: color-mix(in srgb, var(--color-border-strong) 34%, transparent);

		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0;
		overflow: hidden;
		border: 1px solid var(--hero-signal-border);
		border-radius: var(--radius-md);
		background: rgb(255 255 255 / 0.58);
		backdrop-filter: blur(8px);
	}

	.hero-section__stat {
		display: grid;
		gap: 0.32rem;
		min-width: 0;
		padding: 0.68rem 0.72rem;
		border-radius: 0;
		background: transparent;
		border: 0;
		border-inline-end: 1px solid var(--hero-signal-border);
		box-shadow: none;
	}

	.hero-section__stat:last-child {
		border-inline-end: 0;
	}

	.hero-section__stat span {
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.11em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	.hero-section__stat strong {
		font-size: 0.82rem;
		font-weight: 500;
		line-height: 1.25;
	}

	.hero-section__visual {
		position: relative;
		display: grid;
		align-self: center;
		min-height: 0;
		min-width: 0;
	}

	.hero-section__visual-frame {
		position: relative;
		width: 100%;
		height: auto;
		aspect-ratio: 3 / 2;
		display: grid;
		align-items: end;
		padding: 0;
		border-radius: var(--radius-lg);
		background:
			linear-gradient(135deg, rgb(255 255 255 / 0.12) 0%, transparent 32%),
			linear-gradient(155deg, #4e6475 0%, #30475a 45%, #1c252b 100%);
		border: 1px solid var(--panel-border-color);
		box-shadow: var(--shadow-md);
		overflow: hidden;
		transform-origin: 50% 70%;
	}

	.hero-section__visual-frame::before {
		content: '';
		position: absolute;
		inset: 0;
		display: block;
		z-index: 1;
		background: linear-gradient(180deg, rgb(8 11 14 / 0.04) 0%, rgb(8 11 14 / 0.74) 100%);
		opacity: 0.92;
	}

	.hero-section__image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: saturate(0.72) brightness(0.78) contrast(1.09);
		transform: scale(1.002);
		transform-origin: 50% 55%;
		transition:
			filter var(--duration-slow) var(--ease-standard),
			transform var(--duration-slow) var(--ease-expressive);
	}

	@media (hover: hover) {
		.hero-section__visual-frame:hover .hero-section__image {
			filter: saturate(0.78) brightness(0.84) contrast(1.1);
			transform: scale(1.022);
		}
	}

	.hero-section__visual-copy {
		position: relative;
		z-index: 2;
		display: grid;
		gap: 0.45rem;
		max-width: 26rem;
		margin: clamp(1rem, 3vw, 1.55rem);
		padding: 0;
		border: 0;
		background: transparent;
		color: rgb(245 247 248 / 0.9);
		text-shadow: 0 1px 16px rgb(8 11 14 / 0.72);
	}

	.hero-section__visual-copy p {
		margin: 0;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: rgb(245 247 248 / 0.64);
	}

	.hero-section__visual-copy h2 {
		font-size: 1.85rem;
		line-height: 1.08;
		color: rgb(245 247 248 / 0.98);
	}

	.hero-section__visual-copy span {
		font-size: 0.94rem;
		color: rgb(231 233 229 / 0.72);
	}

	@media (max-width: 960px) {
		.hero-section {
			min-height: auto;
			height: auto;
			max-height: none;
			overflow: visible;
		}

		.hero-section__shell {
			height: auto;
			min-height: auto;
			max-height: none;
			grid-template-columns: 1fr;
			gap: 0.9rem;
			padding: 0.5rem 0;
		}

		.hero-section :global(.type-hero) {
			max-width: 14ch;
			font-size: clamp(3.05rem, 7vw, 3.65rem);
		}

		.hero-section__copy {
			gap: 0.78rem;
		}

		.hero-section__visual,
		.hero-section__visual-frame {
			min-height: 0;
		}

		.hero-section__visual-frame {
			aspect-ratio: 16 / 10;
		}
	}

	:global(html[dir='rtl']) .hero-section {
		margin-left: 0;
		margin-right: calc(50% - var(--app-viewport-half, 50vw));
	}

	@media (max-width: 700px) {
		.hero-section {
			padding-top: calc(var(--header-height) + 0.35rem);
			padding-bottom: 1.2rem;
		}

		.hero-section__shell {
			gap: 0.62rem;
			padding: 0.5rem 0;
			border-radius: 0;
		}

		.hero-section__copy {
			gap: 0.68rem;
		}

		.hero-section__eyebrow {
			font-size: 0.66rem;
		}

		.hero-section :global(.type-hero) {
			max-width: 16ch;
			font-size: clamp(1.78rem, 7vw, 2.2rem);
		}

		.hero-section__lead {
			font-size: 0.9rem;
			line-height: 1.34;
		}

		.hero-section__actions {
			gap: 0.48rem;
		}

		.hero-section__signals {
			display: none;
		}

		.hero-section__stat {
			gap: 0.22rem;
			padding: 0.52rem 0.58rem;
		}

		.hero-section__visual-copy h2 {
			font-size: 1.12rem;
		}

		.hero-section__visual-copy {
			gap: 0.28rem;
			margin: 0.7rem;
		}

		.hero-section__visual-copy span {
			display: none;
		}

		.hero-section__stats {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.hero-section__stats .hero-section__stat:nth-child(n + 3) {
			display: none;
		}

		.hero-section__actions :global(.ui-button) {
			flex: 1 1 12rem;
			min-height: 3rem;
		}

		.hero-section__visual-frame {
			min-height: 0;
		}

		.hero-section__actions :global(.hero-section__secondary-action),
		.hero-section__stats {
			backdrop-filter: none;
		}

		.hero-section__actions :global(.hero-section__secondary-action) {
			background: rgb(245 247 248 / 0.82);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-section__heading-line > span,
		.hero-section__visual-frame,
		.hero-section__image,
		.hero-section__visual-copy {
			transform: none !important;
		}
	}
</style>
