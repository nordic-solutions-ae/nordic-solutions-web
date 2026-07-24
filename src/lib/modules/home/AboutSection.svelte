<script lang="ts">
	import { SectionShell } from '$lib/components/ui';
	import { getHomeCopy, siteAssetSets } from '$lib/modules/home/content';
	import type { Locale } from '$lib/modules/i18n';

	type Props = {
		locale: Locale;
	};

	let { locale }: Props = $props();

	const aboutImage = siteAssetSets.aboutRegion;
	const copy = $derived(getHomeCopy(locale));
</script>

<SectionShell
	id="about"
	eyebrow={copy.about.eyebrow}
	title={copy.about.title}
	description={copy.about.description}
>
	<div class="about-section__layout reveal-stagger">
		<div class="about-section__intro">
			{#each copy.about.intro as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}
		</div>

		<figure class="about-section__photo">
			<img
				src={aboutImage.src}
				alt={copy.about.imageAlt}
				width={aboutImage.width}
				height={aboutImage.height}
				loading="lazy"
				decoding="async"
			/>
			<figcaption>{copy.about.caption}</figcaption>
		</figure>

		<div class="about-section__values">
			{#each copy.about.values as value, index (value.title)}
				<article class="about-section__value">
					<div class="about-section__value-mark" aria-hidden="true">
						{String(index + 1).padStart(2, '0')}
					</div>
					<div>
						<h3>{value.title}</h3>
						<p>{value.description}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</SectionShell>

<style>
	.about-section__layout {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-template-areas:
			'intro photo'
			'values values';
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: start;
	}

	.about-section__intro {
		grid-area: intro;
		display: grid;
		gap: 1rem;
		font-size: 1rem;
		color: var(--color-text-muted);
	}

	.about-section__intro p:first-child {
		font-size: 1.42rem;
		line-height: 1.32;
		color: var(--color-text-primary);
	}

	.about-section__photo {
		grid-area: photo;
		position: relative;
		aspect-ratio: 4 / 3;
		min-height: 0;
		margin: 0;
		overflow: hidden;
		border-radius: var(--radius-lg);
		border: 1px solid var(--panel-border-color);
		background: var(--color-surface-muted);
		box-shadow: var(--panel-shadow);
	}

	.about-section__photo::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 58%, rgb(10 12 14 / 0.42) 100%);
		pointer-events: none;
	}

	.about-section__photo img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: saturate(0.82) brightness(0.9) contrast(1.05);
		transform: scale(1.002);
		transition:
			filter var(--duration-slow) var(--ease-standard),
			transform var(--duration-slow) var(--ease-expressive);
	}

	.about-section__photo figcaption {
		position: absolute;
		inset-inline: 1rem;
		bottom: 0.95rem;
		z-index: 1;
		max-width: 15rem;
		font-size: 0.86rem;
		line-height: 1.35;
		color: rgb(245 247 248 / 0.78);
		text-shadow: 0 1px 12px rgb(8 11 14 / 0.68);
	}

	.about-section__values {
		grid-area: values;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.about-section__value {
		position: relative;
		display: grid;
		gap: 0.9rem;
		align-content: start;
		min-height: 100%;
		padding: 1.05rem;
		border-radius: var(--radius-lg);
		background: var(--color-bg-elevated);
		border: 1px solid var(--panel-border-color);
		box-shadow: var(--panel-shadow);
		overflow: hidden;
		transition:
			background-color var(--duration-base) var(--ease-standard),
			border-color var(--duration-base) var(--ease-standard);
	}

	.about-section__value::before {
		content: '';
		position: absolute;
		inset-inline-start: 0;
		inset-block: 0;
		width: 3px;
		background: var(--color-accent);
	}

	.about-section__value-mark {
		display: grid;
		place-items: center;
		width: 2.6rem;
		height: 2.6rem;
		border-radius: var(--radius-md);
		background: var(--color-dark-surface);
		color: var(--color-surface-quiet);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.about-section__value h3 {
		font-size: 1.1rem;
		margin-bottom: 0.3rem;
	}

	.about-section__value p {
		color: var(--color-text-muted);
	}

	@media (hover: hover) {
		.about-section__photo:hover img {
			filter: saturate(0.88) brightness(0.94) contrast(1.07);
			transform: scale(1.025);
		}

		.about-section__value:hover {
			background: color-mix(in srgb, var(--color-bg-elevated) 82%, white);
			border-color: color-mix(in srgb, var(--color-border-strong) 42%, var(--color-accent) 8%);
		}
	}

	@media (max-width: 900px) {
		.about-section__layout {
			grid-template-columns: 1fr;
			grid-template-areas:
				'intro'
				'photo'
				'values';
		}

		.about-section__intro p:first-child {
			font-size: 1.22rem;
		}

		.about-section__photo {
			aspect-ratio: 16 / 9;
			width: 100%;
			min-height: 0;
		}

		.about-section__values {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 700px) {
		.about-section__photo {
			width: 100%;
		}
	}

	@media (min-width: 901px) {
		.about-section__layout {
			display: contents;
		}

		.about-section__intro {
			grid-area: auto;
			grid-column: 1;
			grid-row: 2;
		}

		.about-section__photo {
			grid-area: auto;
			grid-column: 2;
			grid-row: 1 / span 2;
		}

		.about-section__values {
			grid-area: auto;
			grid-column: 1 / -1;
		}
	}
</style>
