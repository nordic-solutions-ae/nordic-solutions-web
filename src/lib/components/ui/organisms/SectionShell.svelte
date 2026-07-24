<script lang="ts">
	type Props = {
		title: string;
		eyebrow?: string;
		id?: string;
		description?: string;
		sectionCode?: string;
		children?: import('svelte').Snippet;
	};

	let { title, eyebrow, id, description, sectionCode, children }: Props = $props();

	const sectionCodes: Record<string, string> = {
		about: 'NS-01',
		services: 'NS-02',
		approach: 'NS-03',
		'why-nordic': 'NS-04',
		presence: 'NS-05'
	};

	const resolvedSectionCode = $derived(sectionCode ?? (id ? sectionCodes[id] : undefined));
</script>

<section
	class:section-shell--wide-split={id === 'about' || id === 'services' || id === 'approach'}
	class="section-shell"
	{id}
>
	<div class="section-shell__frame">
		<header class="section-shell__header">
			<div class="section-shell__meta section-shell__sequence section-shell__sequence--meta">
				{#if eyebrow}
					<p class="section-shell__eyebrow">{eyebrow}</p>
				{/if}

				{#if resolvedSectionCode}
					<span class="section-shell__folio" aria-hidden="true">{resolvedSectionCode}</span>
				{/if}
			</div>

			<h2 class="section-shell__title section-shell__sequence section-shell__sequence--title">
				{title}
			</h2>

			{#if description}
				<p class="section-shell__description section-shell__sequence section-shell__sequence--copy">
					{description}
				</p>
			{/if}
		</header>

		{#if children}
			<div class="section-shell__slot">
				{@render children()}
			</div>
		{/if}
	</div>
</section>

<style>
	.section-shell {
		position: relative;
		padding-block: clamp(2.5rem, 5vw, 4.6rem);
	}

	.section-shell__frame {
		position: relative;
		overflow: visible;
		padding: 0;
		border-radius: 0;
		border: 0;
		background: transparent;
		box-shadow: none;
	}

	.section-shell__frame::before {
		display: none;
	}

	.section-shell__header {
		position: relative;
		display: grid;
		gap: var(--space-4);
		max-width: var(--section-heading-max-width);
	}

	.section-shell__sequence {
		opacity: var(--reveal-progress, var(--section-reveal-progress, 1));
		transform: translate3d(
			0,
			calc(
				(1 - var(--reveal-progress, var(--section-reveal-progress, 1))) * var(--reveal-distance)
			),
			0
		);
		transition:
			opacity var(--duration-slow) var(--ease-expressive),
			transform var(--duration-slow) var(--ease-expressive);
	}

	.section-shell__sequence--title {
		transition-delay: 25ms;
	}

	.section-shell__sequence--copy {
		transition-delay: 50ms;
	}

	.section-shell__meta {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 0.75rem;
		width: fit-content;
		max-width: 100%;
	}

	.section-shell__eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin: 0;
		font-size: var(--font-size-kicker);
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-accent);
	}

	.section-shell__eyebrow::before {
		content: '';
		width: 1.5rem;
		height: 1px;
		background: var(--color-accent);
		transform: scaleX(var(--section-reveal-progress, 1));
		transform-origin: left;
		transition: transform var(--duration-slow) var(--ease-expressive);
	}

	.section-shell__folio {
		position: relative;
		display: inline-flex;
		align-items: center;
		min-height: 1.55rem;
		padding-inline: 0.52rem;
		border-radius: var(--radius-sm);
		border: 1px solid color-mix(in srgb, var(--color-border-strong) 28%, transparent);
		background: color-mix(in srgb, var(--color-accent) 8%, white);
		color: color-mix(in srgb, var(--color-accent-deep) 78%, var(--color-text-subtle));
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.11em;
		text-transform: uppercase;
		overflow: hidden;
		transition:
			background-color var(--duration-slow) var(--ease-standard),
			border-color var(--duration-slow) var(--ease-standard),
			color var(--duration-slow) var(--ease-standard);
		transition-delay: 80ms;
	}

	.section-shell__folio::before {
		display: none;
	}

	:global(.section-shell[data-revealed='true']) .section-shell__folio {
		border-color: color-mix(in srgb, var(--color-accent) 28%, var(--color-border-strong));
		background: color-mix(in srgb, var(--color-bg-elevated) 70%, var(--color-accent) 4%);
		color: color-mix(in srgb, var(--color-text-muted) 88%, var(--color-accent));
	}

	.section-shell__title {
		max-width: 15ch;
	}

	:global(html[dir='rtl']) .section-shell__eyebrow::before {
		transform-origin: right;
	}

	.section-shell__description {
		max-width: var(--section-copy-max-width);
		color: var(--color-text-muted);
	}

	.section-shell__slot {
		position: relative;
		margin-top: clamp(1.5rem, 3vw, 2.25rem);
		display: grid;
		gap: var(--space-4);
	}

	@media (min-width: 901px) {
		.section-shell--wide-split .section-shell__frame {
			display: grid;
			grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
			gap: clamp(1.25rem, 3vw, 2rem);
			align-items: start;
		}

		.section-shell--wide-split .section-shell__header {
			max-width: none;
		}

		.section-shell--wide-split .section-shell__slot {
			display: contents;
			margin-top: 0;
		}
	}

	@media (max-width: 700px) {
		.section-shell {
			padding-block: 1.85rem;
		}

		.section-shell__frame {
			padding: 0;
			border-radius: 0;
		}

		.section-shell__title {
			max-width: unset;
		}
	}
</style>
