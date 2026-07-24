<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { contactDetails, getHomeCopy, siteAssetPaths } from '$lib/modules/home/content';
	import { getCurrentLocaleHomePath, type Locale } from '$lib/modules/i18n';
	import type { NavigationItem } from '$lib/modules/site-navigation';

	type Props = {
		navigation: NavigationItem[];
		locale: Locale;
	};

	let { navigation, locale }: Props = $props();

	const currentYear = new Date().getFullYear();
	const compactNavigation = $derived(navigation.filter((item) => item.key !== 'home'));
	const copy = $derived(getHomeCopy(locale));
	const homePath = $derived(getCurrentLocaleHomePath(locale, page.url.pathname));
</script>

<footer class="app-footer">
	<div class="shell-container app-footer__inner">
		<div class="app-footer__headline-block">
			<p class="app-footer__eyebrow">{copy.footer.eyebrow}</p>
			<h2 class="app-footer__headline">
				{copy.footer.headline}
			</h2>
			<p class="app-footer__intro">
				{copy.footer.intro}
			</p>
			<p class="app-footer__brief-note">
				{copy.footer.brief}
			</p>
		</div>

		<div class="app-footer__grid">
			<section class="app-footer__column">
				<img
					class="app-footer__logo"
					src={siteAssetPaths.logoFooter}
					alt="Nordic Solutions"
					width="147"
					height="71"
					loading="lazy"
					decoding="async"
				/>
				<p class="app-footer__meta-copy">
					<bdi dir="ltr">{contactDetails.company}</bdi><br />
					<bdi dir="ltr">{contactDetails.addressLine1}</bdi><br />
					<bdi dir="ltr">{contactDetails.addressLine2}</bdi>
				</p>
			</section>

			<nav class="app-footer__column" aria-label="Footer navigation">
				<h3>{copy.footer.explore}</h3>
				<ul class="app-footer__links">
					{#each compactNavigation as item (item.key)}
						<li><a href={resolve(`${homePath}${item.href}`)}>{item.title}</a></li>
					{/each}
				</ul>
			</nav>

			<section class="app-footer__column">
				<h3>{copy.footer.reach}</h3>
				<ul class="app-footer__links">
					<li>
						<a href={`mailto:${contactDetails.email}`}
							><bdi dir="ltr">{contactDetails.email}</bdi></a
						>
					</li>
					<li>
						<a href={`tel:${contactDetails.phone}`}><bdi dir="ltr">{contactDetails.phone}</bdi></a>
					</li>
					<li>
						<span><bdi dir="ltr">{contactDetails.addressLine1}</bdi></span>
					</li>
				</ul>
			</section>
		</div>
	</div>

	<div class="shell-container app-footer__bottom">
		{#if locale === 'ar'}
			<span>{copy.footer.rights} <bdi dir="ltr">© {currentYear} Nordic Solutions.</bdi></span>
		{:else}
			<span><bdi dir="ltr">© {currentYear} Nordic Solutions.</bdi> {copy.footer.rights}</span>
		{/if}
		<span>{copy.footer.tagline}</span>
	</div>
</footer>

<style>
	.app-footer {
		position: relative;
		overflow: hidden;
		margin-top: var(--section-space);
		padding-top: clamp(2.5rem, 6vw, 4rem);
		padding-bottom: 2rem;
		background: var(--color-dark-surface);
		color: var(--color-bg-elevated);
	}

	.app-footer::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background:
			linear-gradient(90deg, rgb(226 29 47 / 0.24) 0 0.32rem, transparent 0.32rem),
			radial-gradient(ellipse 78% 56% at 4% 0%, rgb(226 29 47 / 0.18), transparent 70%),
			linear-gradient(180deg, rgb(255 255 255 / 0.06), transparent 56%);
		background-size: auto;
		opacity: 0.42;
		mix-blend-mode: screen;
	}

	.app-footer > * {
		position: relative;
		z-index: 1;
	}

	.app-footer__inner {
		display: grid;
		gap: clamp(2rem, 5vw, 3.5rem);
	}

	.app-footer__headline-block {
		max-width: 44rem;
		display: grid;
		gap: 1rem;
	}

	.app-footer__eyebrow {
		margin: 0;
		font-size: var(--font-size-kicker);
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgb(240 242 244 / 0.7);
	}

	.app-footer__headline {
		color: var(--color-bg-elevated);
		max-width: 18ch;
	}

	.app-footer__intro {
		max-width: 36rem;
		color: rgb(240 242 244 / 0.78);
	}

	.app-footer__brief-note {
		width: fit-content;
		max-width: 35rem;
		color: rgb(240 242 244 / 0.76);
		font-size: 0.9rem;
	}

	.app-footer__grid {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr 0.9fr;
		gap: clamp(1.5rem, 4vw, 3rem);
		padding-top: 1.5rem;
		border-top: 1px solid rgb(255 255 255 / 0.1);
	}

	.app-footer__column {
		display: grid;
		align-content: start;
		gap: 1rem;
	}

	.app-footer__column h3 {
		font-size: var(--font-size-kicker);
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgb(240 242 244 / 0.68);
	}

	.app-footer__logo {
		width: 11rem;
		height: auto;
	}

	.app-footer__meta-copy {
		color: rgb(240 242 244 / 0.76);
	}

	.app-footer__links {
		display: grid;
		gap: 0.7rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.app-footer__links a,
	.app-footer__links span {
		color: var(--color-bg-elevated);
		text-decoration: none;
	}

	.app-footer__bottom {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 1px solid rgb(255 255 255 / 0.1);
		color: rgb(240 242 244 / 0.72);
		font-size: 0.84rem;
	}

	@media (max-width: 900px) {
		.app-footer__grid {
			grid-template-columns: 1fr;
		}

		.app-footer__headline {
			max-width: unset;
		}
	}
</style>
