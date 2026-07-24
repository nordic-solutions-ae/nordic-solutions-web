<script lang="ts">
	import { SectionShell } from '$lib/components/ui';
	import { getHomeCopy, presenceImage } from '$lib/modules/home/content';
	import type { Locale } from '$lib/modules/i18n';

	type Props = {
		locale: Locale;
	};

	let { locale }: Props = $props();
	const copy = $derived(getHomeCopy(locale));
</script>

<SectionShell
	id="presence"
	eyebrow={copy.presence.eyebrow}
	title={copy.presence.title}
	description={copy.presence.description}
>
	<div class="presence-section__layout reveal-stagger">
		<div class="presence-section__visual">
			<img
				class="presence-section__image"
				src={presenceImage.src}
				width={presenceImage.width}
				height={presenceImage.height}
				alt={copy.presence.visualAlt}
				loading="lazy"
				decoding="async"
			/>
			<div class="presence-section__chip presence-section__chip--one">{copy.presence.chipOne}</div>
			<div class="presence-section__chip presence-section__chip--two">{copy.presence.chipTwo}</div>
		</div>

		<div class="presence-section__copy">
			<h3>{copy.presence.copyTitle}</h3>
			{#each copy.presence.body as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}
		</div>
	</div>
</SectionShell>

<style>
	.presence-section__layout {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: center;
	}

	.presence-section__visual {
		position: relative;
		overflow: hidden;
		border-radius: var(--radius-lg);
		border: 1px solid var(--panel-border-color);
		box-shadow: var(--panel-shadow);
		aspect-ratio: 4 / 3;
		min-height: 0;
	}

	.presence-section__image {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
		filter: saturate(0.72) brightness(0.84) contrast(1.08);
		transform: scale(1.002);
		transition:
			filter var(--duration-slow) var(--ease-standard),
			transform var(--duration-slow) var(--ease-expressive);
	}

	@media (hover: hover) and (pointer: fine) {
		.presence-section__visual:hover .presence-section__image {
			filter: saturate(0.78) brightness(0.88) contrast(1.1);
			transform: scale(1.025);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.presence-section__image,
		.presence-section__visual:hover .presence-section__image {
			transform: none;
		}
	}

	.presence-section__chip {
		position: absolute;
		padding: 0;
		border: 0;
		background: transparent;
		box-shadow: none;
		color: rgb(245 247 248 / 0.88);
		font-size: 0.9rem;
		font-weight: 500;
		text-shadow: 0 1px 12px rgb(8 11 14 / 0.62);
	}

	.presence-section__chip--one {
		left: 1rem;
		top: 1rem;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.13em;
		text-transform: uppercase;
	}

	.presence-section__chip--two {
		right: 1rem;
		bottom: 1rem;
	}

	.presence-section__copy {
		display: grid;
		gap: 1rem;
		max-width: 34rem;
		color: var(--color-text-muted);
	}

	.presence-section__copy h3 {
		font-size: 1.7rem;
		line-height: 1.18;
		color: var(--color-text-primary);
	}

	@media (max-width: 900px) {
		.presence-section__layout {
			grid-template-columns: 1fr;
		}

		.presence-section__visual {
			aspect-ratio: 16 / 9;
		}

		.presence-section__copy h3 {
			font-size: 1.35rem;
		}
	}

	@media (max-width: 700px) {
		.presence-section__visual {
			min-height: 0;
		}
	}
</style>
