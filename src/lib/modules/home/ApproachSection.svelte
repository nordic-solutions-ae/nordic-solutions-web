<script lang="ts">
	import { SectionShell } from '$lib/components/ui';
	import { getHomeCopy, siteAssetSets } from '$lib/modules/home/content';
	import type { Locale } from '$lib/modules/i18n';

	type Props = {
		locale: Locale;
	};

	let { locale }: Props = $props();

	const approachImage = siteAssetSets.approachPartnership;
	const copy = $derived(getHomeCopy(locale));
</script>

<SectionShell
	id="approach"
	eyebrow={copy.approach.eyebrow}
	title={copy.approach.title}
	description={copy.approach.description}
>
	<div class="approach-section__layout reveal-stagger">
		<ol class="approach-section__steps" aria-label="Delivery phases">
			{#each copy.approach.items as phase (phase.step)}
				<li class="approach-section__step">
					<span>{phase.step}</span>
					<h3>{phase.title}</h3>
					<p>{phase.description}</p>
				</li>
			{/each}
		</ol>

		<aside class="approach-section__aside">
			<p class="approach-section__aside-label">{copy.approach.footprintLabel}</p>
			<ul>
				{#each copy.approach.footprint as item (item)}
					<li>{item}</li>
				{/each}
			</ul>

			<div class="approach-section__boundary">
				<span>{copy.approach.boundaryLabel}</span>
				<p>
					{copy.approach.boundaryText}
				</p>
			</div>

			<figure class="approach-section__photo">
				<img
					src={approachImage.src}
					alt={copy.approach.imageAlt}
					width={approachImage.width}
					height={approachImage.height}
					loading="lazy"
					decoding="async"
				/>
				<figcaption>
					{copy.approach.caption}
				</figcaption>
			</figure>
		</aside>
	</div>
</SectionShell>

<style>
	.approach-section__layout {
		display: grid;
		grid-template-columns: minmax(0, 1.04fr) minmax(18rem, 0.96fr);
		gap: clamp(1.25rem, 3vw, 2rem);
		align-items: start;
	}

	.approach-section__steps {
		display: grid;
		position: relative;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0;
		align-items: start;
		align-content: start;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.approach-section__steps::before {
		content: '';
		position: absolute;
		inset-inline: 0.15rem;
		top: 1.3rem;
		height: 1px;
		background: color-mix(in srgb, var(--color-border-strong) 24%, transparent);
		opacity: 0.72;
	}

	.approach-section__aside {
		padding: 1.15rem;
		border-radius: var(--radius-lg);
		background: var(--color-bg-elevated);
		border: 1px solid var(--panel-border-color);
		box-shadow: var(--panel-shadow);
	}

	.approach-section__step {
		position: relative;
		display: grid;
		align-content: start;
		gap: 0.5rem;
		min-height: 0;
		padding: 0 0.95rem 1rem 0;
	}

	.approach-section__step span {
		position: relative;
		z-index: 1;
		display: inline-grid;
		place-items: center;
		width: 2.65rem;
		height: 2.65rem;
		margin-bottom: 0.55rem;
		border-radius: var(--radius-md);
		background: var(--color-dark-surface);
		border: 1px solid color-mix(in srgb, var(--color-accent) 34%, var(--color-dark-surface));
		color: var(--color-surface-quiet);
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.1em;
	}

	.approach-section__aside-label {
		display: inline-flex;
		margin-bottom: 0.9rem;
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	.approach-section__step h3 {
		font-size: 1.18rem;
	}

	.approach-section__step p {
		color: var(--color-text-muted);
	}

	.approach-section__aside {
		display: grid;
		align-content: start;
	}

	@media (min-width: 901px) {
		.approach-section__steps {
			grid-template-columns: 1fr;
			gap: 0;
			align-self: end;
			padding: 1rem 1.15rem;
			border-radius: var(--radius-lg);
			border: 1px solid var(--panel-border-color);
			background: color-mix(in srgb, var(--color-bg-elevated) 58%, transparent);
			box-shadow: var(--panel-shadow);
			backdrop-filter: blur(10px);
		}

		.approach-section__steps::before {
			display: none;
		}

		.approach-section__step {
			grid-template-columns: 3rem minmax(0, 1fr);
			gap: 0.15rem 1rem;
			align-content: start;
			padding: 0.85rem 0;
			border-bottom: 1px solid color-mix(in srgb, var(--color-border-strong) 16%, transparent);
		}

		.approach-section__step:first-child {
			padding-top: 0;
		}

		.approach-section__step:last-child {
			padding-bottom: 0;
			border-bottom: 0;
		}

		.approach-section__step span {
			grid-row: 1 / span 2;
			margin-bottom: 0;
		}
	}

	.approach-section__aside ul {
		display: grid;
		gap: 0.8rem;
		padding: 0;
		list-style: none;
	}

	.approach-section__aside li {
		position: relative;
		padding: 0.82rem 0.9rem;
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--color-bg-subtle) 82%, transparent);
		border: 1px solid var(--panel-border-color);
		box-shadow: none;
	}

	.approach-section__aside li::before {
		content: '';
		display: inline-block;
		width: 0.48rem;
		height: 0.48rem;
		margin-inline-end: 0.55rem;
		border-radius: 999px;
		background: var(--color-accent);
		vertical-align: 0.08em;
	}

	.approach-section__boundary {
		display: grid;
		gap: 0.45rem;
		margin-top: 1rem;
		padding: 0.9rem;
		border-inline-start: 2px solid
			color-mix(in srgb, var(--color-accent) 68%, var(--color-border-strong));
		background: color-mix(in srgb, var(--color-bg-subtle) 58%, transparent);
	}

	.approach-section__boundary span {
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	.approach-section__boundary p {
		color: var(--color-text-muted);
		font-size: 0.9rem;
		line-height: 1.42;
	}

	@media (hover: hover) {
		.approach-section__step span {
			transition:
				border-color var(--duration-base) var(--ease-standard),
				transform var(--duration-base) var(--ease-emphasis);
		}

		.approach-section__step:hover span {
			border-color: color-mix(in srgb, var(--color-accent) 70%, var(--color-dark-surface));
			transform: translateY(-1px);
		}
	}

	.approach-section__photo {
		position: relative;
		height: auto;
		aspect-ratio: 2 / 1;
		min-height: 0;
		margin: 1rem 0 0;
		overflow: hidden;
		border-radius: var(--radius-md);
		border: 1px solid var(--panel-border-color);
		background: var(--color-surface-muted);
	}

	.approach-section__photo::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 58%, rgb(12 15 18 / 0.42) 100%);
		pointer-events: none;
	}

	.approach-section__photo img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: saturate(0.78) brightness(0.92) contrast(1.04);
		transform: scale(1.002);
		transition:
			filter var(--duration-slow) var(--ease-standard),
			transform var(--duration-slow) var(--ease-expressive);
	}

	.approach-section__photo figcaption {
		position: absolute;
		inset-inline: 0.9rem;
		bottom: 0.8rem;
		z-index: 1;
		max-width: 15rem;
		font-size: 0.84rem;
		line-height: 1.35;
		color: rgb(245 247 248 / 0.78);
		text-shadow: 0 1px 12px rgb(8 11 14 / 0.68);
	}

	@media (hover: hover) {
		.approach-section__photo:hover img {
			filter: saturate(0.84) brightness(0.96) contrast(1.07);
			transform: scale(1.025);
		}
	}

	@media (max-width: 900px) {
		.approach-section__layout,
		.approach-section__steps {
			grid-template-columns: 1fr;
		}

		.approach-section__step,
		.approach-section__step:first-child,
		.approach-section__step:last-child {
			padding: 0.9rem 0;
			border-inline-end: 0;
			border-bottom: 1px solid color-mix(in srgb, var(--color-border-strong) 18%, transparent);
		}

		.approach-section__step:first-child {
			padding-top: 0;
		}

		.approach-section__step:nth-child(odd) {
			border-inline-end: 0;
		}

		.approach-section__step:last-child {
			padding-bottom: 0;
			border-bottom: 0;
		}
	}

	@media (min-width: 901px) {
		.approach-section__layout {
			display: contents;
		}

		.approach-section__steps {
			grid-column: 1;
			grid-row: 2;
		}

		.approach-section__aside {
			grid-column: 2;
			grid-row: 1 / span 2;
			align-self: end;
		}
	}
</style>
