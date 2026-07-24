<script lang="ts">
	import { SectionShell } from '$lib/components/ui';
	import { getHomeCopy, siteAssetSets } from '$lib/modules/home/content';
	import type { Locale } from '$lib/modules/i18n';

	type Props = {
		locale: Locale;
	};

	let { locale }: Props = $props();

	const servicesImage = siteAssetSets.servicesReview;
	const copy = $derived(getHomeCopy(locale));
</script>

<SectionShell
	id="services"
	eyebrow={copy.services.eyebrow}
	title={copy.services.title}
	description={copy.services.description}
>
	<div class="services-section__layout reveal-stagger">
		<figure class="services-section__photo">
			<img
				src={servicesImage.src}
				alt={copy.services.imageAlt}
				width={servicesImage.width}
				height={servicesImage.height}
				loading="lazy"
				decoding="async"
			/>
			<figcaption>{copy.services.caption}</figcaption>
		</figure>

		<div class="services-section__grid" aria-label={copy.services.ariaLabel}>
			{#each copy.services.items as item, index (item.title)}
				<article class="services-section__card">
					<span class="services-section__index">{String(index + 1).padStart(2, '0')}</span>
					<div class="services-section__card-copy">
						<h3>{item.title}</h3>
						<p>{item.description}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</SectionShell>

<style>
	.services-section__layout {
		display: grid;
		grid-template-columns: minmax(17rem, 0.78fr) minmax(0, 1.22fr);
		gap: clamp(1.25rem, 3vw, 2rem);
		align-items: start;
	}

	.services-section__photo {
		position: relative;
		aspect-ratio: 16 / 9;
		min-height: 0;
		margin: 0;
		overflow: hidden;
		border-radius: var(--radius-lg);
		border: 1px solid var(--panel-border-color);
		background: var(--color-surface-muted);
		box-shadow: var(--panel-shadow);
	}

	.services-section__photo::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 58%, rgb(10 12 14 / 0.42) 100%);
		pointer-events: none;
	}

	.services-section__photo img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: saturate(0.8) brightness(0.88) contrast(1.05);
		transform: scale(1.002);
		transition:
			filter var(--duration-slow) var(--ease-standard),
			transform var(--duration-slow) var(--ease-expressive);
	}

	.services-section__photo figcaption {
		position: absolute;
		inset-inline: 1rem;
		bottom: 0.95rem;
		z-index: 1;
		max-width: 16rem;
		font-size: 0.86rem;
		line-height: 1.35;
		color: rgb(245 247 248 / 0.78);
		text-shadow: 0 1px 12px rgb(8 11 14 / 0.68);
	}

	.services-section__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
		overflow: hidden;
		border-radius: var(--radius-lg);
		background: var(--color-bg-elevated);
		border: 1px solid var(--panel-border-color);
		box-shadow: var(--panel-shadow);
	}

	.services-section__card {
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.45rem;
		align-content: start;
		min-height: auto;
		padding: clamp(1rem, 2vw, 1.3rem);
		border-bottom: 1px solid color-mix(in srgb, var(--color-border-strong) 20%, transparent);
		background: transparent;
		box-shadow: none;
		overflow: hidden;
		transition:
			background-color var(--duration-base) var(--ease-standard),
			border-color var(--duration-base) var(--ease-standard);
	}

	.services-section__card:last-child {
		border-bottom: 0;
	}

	.services-section__card::before {
		content: '';
		position: absolute;
		inset-inline-start: 0;
		inset-block: 0;
		width: 3px;
		background: var(--color-accent);
		opacity: 0;
		transition: opacity var(--duration-base) var(--ease-standard);
	}

	.services-section__index {
		display: inline-flex;
		width: fit-content;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	.services-section__card-copy {
		display: grid;
		gap: 0.45rem;
		min-width: 0;
	}

	.services-section__card p {
		color: var(--color-text-muted);
	}

	@media (hover: hover) {
		.services-section__photo:hover img {
			filter: saturate(0.86) brightness(0.92) contrast(1.07);
			transform: scale(1.025);
		}

		.services-section__card:hover {
			background: color-mix(in srgb, var(--color-bg-subtle) 36%, transparent);
		}

		.services-section__card:hover::before {
			opacity: 1;
		}
	}

	@media (max-width: 900px) {
		.services-section__layout {
			grid-template-columns: 1fr;
		}
	}

	@media (min-width: 901px) {
		.services-section__layout {
			display: contents;
		}

		.services-section__photo {
			grid-column: 1;
			grid-row: 2;
			align-self: end;
			width: 100%;
		}

		.services-section__grid {
			grid-column: 2;
			grid-row: 1 / span 2;
			align-self: end;
		}
	}
</style>
