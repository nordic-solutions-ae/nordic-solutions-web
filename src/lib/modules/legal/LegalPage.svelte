<script lang="ts">
	import { getLegalPath, type LegalDocument } from './content';
	import type { Locale } from '$lib/modules/i18n';

	type Props = {
		document: LegalDocument;
		locale: Locale;
	};

	let { document, locale }: Props = $props();
	const siteUrl = 'https://nordicsolutions.ae';
	const canonicalPath = $derived(getLegalPath(document.key, locale));
	const canonicalUrl = $derived(`${siteUrl}${canonicalPath}`);
	const englishUrl = $derived(`${siteUrl}${getLegalPath(document.key, 'en')}`);
	const arabicUrl = $derived(`${siteUrl}${getLegalPath(document.key, 'ar')}`);
</script>

<svelte:head>
	<title>{document.title} | Nordic Solutions</title>
	<meta name="description" content={document.description} />
	<meta property="og:title" content={`${document.title} | Nordic Solutions`} />
	<meta property="og:description" content={document.description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:locale" content={locale === 'ar' ? 'ar_AE' : 'en_AE'} />
	<link rel="canonical" href={canonicalUrl} />
	<link rel="alternate" hreflang="en" href={englishUrl} />
	<link rel="alternate" hreflang="ar" href={arabicUrl} />
	<link rel="alternate" hreflang="x-default" href={englishUrl} />
</svelte:head>

<article class="legal-page" aria-labelledby="legal-title">
	<div class="legal-page__intro">
		<p class="legal-page__eyebrow">{document.eyebrow}</p>
		<h1 id="legal-title">{document.title}</h1>
		<p class="legal-page__lead">{document.intro}</p>
		<p class="legal-page__date">{document.updatedLabel}</p>
	</div>

	<div class="legal-page__body">
		{#each document.sections as section (section.id)}
			<section class="legal-page__section" aria-labelledby={`legal-${section.id}`}>
				<h2 id={`legal-${section.id}`}>{section.heading}</h2>
				{#each section.paragraphs as paragraph, paragraphIndex (paragraphIndex)}
					<p>{paragraph}</p>
				{/each}
				{#if section.bullets}
					<ul>
						{#each section.bullets as bullet, bulletIndex (bulletIndex)}
							<li>{bullet}</li>
						{/each}
					</ul>
				{/if}
			</section>
		{/each}
	</div>

	<aside class="legal-page__review-note" aria-label="Legal review note">
		<strong>{locale === 'ar' ? 'ملاحظة المراجعة: ' : 'Review note: '}</strong>{document.reviewNote}
	</aside>
</article>

<style>
	.legal-page {
		max-width: 66rem;
		margin-inline: auto;
		padding-block: clamp(7rem, 12vw, 10rem) clamp(4rem, 8vw, 7rem);
	}

	.legal-page__intro {
		max-width: 48rem;
		padding-bottom: clamp(2rem, 5vw, 3.5rem);
		border-bottom: 1px solid var(--color-border-soft);
	}

	.legal-page__eyebrow {
		margin: 0 0 0.8rem;
		color: var(--color-accent);
		font-size: var(--font-size-kicker);
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.legal-page h1 {
		max-width: 18ch;
		margin: 0;
	}

	.legal-page__lead {
		max-width: 42rem;
		margin: 1.5rem 0 0;
		color: var(--color-text-muted);
		font-size: clamp(1.05rem, 2vw, 1.25rem);
	}

	.legal-page__date {
		margin: 1rem 0 0;
		color: var(--color-text-subtle);
		font-size: var(--font-size-small);
	}

	.legal-page__body {
		max-width: 50rem;
		padding-top: clamp(2rem, 5vw, 3.5rem);
	}

	.legal-page__section + .legal-page__section {
		margin-top: clamp(2rem, 4vw, 3rem);
	}

	.legal-page__section h2 {
		margin: 0 0 0.85rem;
		font-size: clamp(1.35rem, 2vw, 1.75rem);
	}

	.legal-page__section p,
	.legal-page__section li {
		max-width: 48rem;
		color: var(--color-text-muted);
		line-height: var(--line-height-body);
	}

	.legal-page__section p {
		margin: 0.7rem 0 0;
	}

	.legal-page__section ul {
		margin: 0.8rem 0 0;
		padding-inline-start: 1.3rem;
	}

	.legal-page__section li + li {
		margin-top: 0.45rem;
	}

	.legal-page__review-note {
		max-width: 50rem;
		margin-top: clamp(2.5rem, 6vw, 4rem);
		padding: 1rem 1.15rem;
		border: 1px solid color-mix(in srgb, var(--color-accent) 55%, transparent);
		background: color-mix(in srgb, var(--color-accent) 8%, var(--color-bg-elevated));
		color: var(--color-text-muted);
		line-height: var(--line-height-body);
	}

	.legal-page__review-note strong {
		color: var(--color-accent-deep);
	}

	:global(html[dir='rtl']) .legal-page__eyebrow {
		letter-spacing: 0;
	}
</style>
