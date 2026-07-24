<script lang="ts">
	import { base } from '$app/paths';
	import '$lib/styles/base.css';
	import PageShell from '$lib/layouts/PageShell.svelte';
	import { siteAssetSets } from '$lib/modules/home/content';

	let { children }: { children: import('svelte').Snippet } = $props();

	const siteUrl = 'https://nordicsolutions.ae';
	const socialImageUrl = `${siteUrl}${siteAssetSets.heroPartners.src}`;
</script>

<svelte:head>
	<link rel="icon" type="image/png" sizes="32x32" href={`${base}/favicon-32x32.png`} />
	<link rel="apple-touch-icon" sizes="180x180" href={`${base}/apple-touch-icon.png`} />
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content="#d9dcdf" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Nordic Solutions" />
	<meta property="og:image" content={socialImageUrl} />
	<meta property="og:image:alt" content="Nordic Solutions corporate project support visual" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={socialImageUrl} />
</svelte:head>

<PageShell>
	{@render children()}
</PageShell>
