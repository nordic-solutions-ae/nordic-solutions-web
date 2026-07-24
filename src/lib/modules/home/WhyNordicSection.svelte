<script lang="ts">
	import { SectionShell } from '$lib/components/ui';
	import { getHomeCopy } from '$lib/modules/home/content';
	import type { Locale } from '$lib/modules/i18n';

	type Props = {
		locale: Locale;
	};

	let { locale }: Props = $props();
	const copy = $derived(getHomeCopy(locale));
</script>

<SectionShell
	id="why-nordic"
	eyebrow={copy.why.eyebrow}
	title={copy.why.title}
	description={copy.why.description}
>
	<div class="why-nordic-section__layout reveal-stagger">
		<div class="why-nordic-section__grid">
			{#each copy.why.items as item, index (item.title)}
				<article class="why-nordic-section__card">
					<span class="why-nordic-section__index">{String(index + 1).padStart(2, '0')}</span>
					<div class="why-nordic-section__card-copy">
						<h3>{item.title}</h3>
						<p>{item.description}</p>
					</div>
					<span class="why-nordic-section__signal"
						>{copy.why.signals[index] ?? copy.why.reviewLabel}</span
					>
				</article>
			{/each}
		</div>

		<aside class="why-nordic-section__review" aria-label={copy.why.reviewAriaLabel}>
			<p class="why-nordic-section__review-label">{copy.why.reviewLabel}</p>
			<h3>{copy.why.reviewTitle}</h3>
			<ul>
				{#each copy.why.reviewItems as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
		</aside>
	</div>
</SectionShell>

<style>
	.why-nordic-section__layout {
		display: grid;
		grid-template-columns: minmax(0, 1.12fr) minmax(17rem, 0.88fr);
		gap: clamp(1.25rem, 3vw, 2rem);
		align-items: stretch;
	}

	.why-nordic-section__grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0;
		align-content: stretch;
		overflow: hidden;
		border-radius: var(--radius-lg);
		background: var(--color-bg-elevated);
		border: 1px solid var(--panel-border-color);
		box-shadow: var(--panel-shadow);
	}

	.why-nordic-section__card {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.52rem;
		align-items: start;
		min-height: auto;
		padding: clamp(0.95rem, 2vw, 1.18rem);
		border-bottom: 1px solid color-mix(in srgb, var(--color-border-strong) 18%, transparent);
		background: transparent;
		box-shadow: none;
		transition: background-color var(--duration-base) var(--ease-standard);
	}

	.why-nordic-section__card:last-child {
		border-bottom: 0;
	}

	.why-nordic-section__card:nth-child(odd) {
		border-inline-end: 1px solid color-mix(in srgb, var(--color-border-strong) 18%, transparent);
	}

	.why-nordic-section__card:nth-child(n + 3) {
		border-bottom: 0;
	}

	.why-nordic-section__index {
		width: fit-content;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: var(--color-text-subtle);
	}

	.why-nordic-section__card-copy {
		display: grid;
		gap: 0.4rem;
		min-width: 0;
	}

	.why-nordic-section__card p {
		color: var(--color-text-muted);
	}

	.why-nordic-section__signal {
		justify-self: start;
		width: min-content;
		min-width: 0;
		padding: 0.34rem 0.5rem;
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--color-accent) 8%, white);
		color: color-mix(in srgb, var(--color-accent-deep) 74%, var(--color-text-muted));
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.11em;
		line-height: 1.35;
		text-align: center;
		text-transform: uppercase;
		box-shadow: 0 1px 0 rgb(255 255 255 / 0.26) inset;
	}

	.why-nordic-section__review {
		display: grid;
		align-content: start;
		gap: 1rem;
		min-height: 100%;
		padding: clamp(1.05rem, 2.4vw, 1.45rem);
		border-radius: var(--radius-lg);
		background:
			linear-gradient(
				135deg,
				color-mix(in srgb, var(--color-accent) 11%, transparent) 0%,
				transparent 42%
			),
			color-mix(in srgb, var(--color-bg-elevated) 82%, var(--color-bg-subtle));
		border: 1px solid var(--panel-border-color);
		box-shadow: var(--panel-shadow);
	}

	.why-nordic-section__review-label {
		margin: 0;
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	.why-nordic-section__review h3 {
		max-width: 17rem;
		font-size: clamp(1.35rem, 2.4vw, 1.85rem);
		line-height: 1.12;
	}

	.why-nordic-section__review ul {
		display: grid;
		gap: 0.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.why-nordic-section__review li {
		padding: 0.82rem 0;
		border-top: 1px solid color-mix(in srgb, var(--color-border-strong) 18%, transparent);
		color: var(--color-text-muted);
	}

	@media (hover: hover) {
		.why-nordic-section__card:hover {
			background: color-mix(in srgb, var(--color-bg-subtle) 34%, transparent);
		}
	}

	@media (max-width: 900px) {
		.why-nordic-section__layout,
		.why-nordic-section__grid {
			grid-template-columns: 1fr;
		}

		.why-nordic-section__card,
		.why-nordic-section__card:nth-child(n + 3) {
			border-bottom: 1px solid color-mix(in srgb, var(--color-border-strong) 18%, transparent);
		}

		.why-nordic-section__card:nth-child(odd) {
			border-inline-end: 0;
		}

		.why-nordic-section__card:last-child {
			border-bottom: 0;
		}
	}
</style>
