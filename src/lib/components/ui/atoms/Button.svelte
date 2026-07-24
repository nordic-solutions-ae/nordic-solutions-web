<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '../classnames';

	export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
	export type ButtonSize = 'md' | 'lg';

	type Props = {
		variant?: ButtonVariant;
		size?: ButtonSize;
		disabled?: boolean;
		fullWidth?: boolean;
		ariaLabel?: string;
		class?: string;
		onclick?: (event: MouseEvent) => void;
		children?: import('svelte').Snippet;
	} & Omit<HTMLAnchorAttributes, 'class' | 'onclick'> &
		Omit<HTMLButtonAttributes, 'class' | 'onclick'>;

	let {
		variant = 'primary',
		size = 'md',
		href,
		type = 'button',
		target,
		rel,
		disabled = false,
		fullWidth = false,
		ariaLabel,
		class: className = '',
		onclick,
		children,
		...restProps
	}: Props = $props();

	const buttonClass = $derived(
		cn(
			'ui-button',
			`ui-button--${variant}`,
			`ui-button--${size}`,
			fullWidth && 'ui-button--full',
			disabled && 'ui-button--disabled',
			className
		)
	);

	const handleAnchorClick = (event: MouseEvent) => {
		if (disabled) {
			event.preventDefault();
			return;
		}

		onclick?.(event);
	};

	const getSafeRel = (
		targetValue: string | null | undefined,
		relValue: string | null | undefined
	) => {
		if (targetValue !== '_blank') {
			return relValue ?? undefined;
		}

		const relTokens = (relValue ?? '').split(/\s+/).filter(Boolean);
		const hasRelToken = (token: string) =>
			relTokens.some((relToken) => relToken.toLowerCase() === token);

		return [
			...relTokens,
			...(hasRelToken('noopener') ? [] : ['noopener']),
			...(hasRelToken('noreferrer') ? [] : ['noreferrer'])
		].join(' ');
	};

	const linkHref = $derived(disabled ? undefined : href);
	const safeRel = $derived(disabled ? undefined : getSafeRel(target, rel));
</script>

{#if href}
	<a
		class={buttonClass}
		href={linkHref}
		target={disabled ? undefined : target}
		rel={safeRel}
		tabindex={disabled ? -1 : undefined}
		aria-label={ariaLabel}
		aria-disabled={disabled || undefined}
		onclick={handleAnchorClick}
		{...restProps}
	>
		{#if children}
			{@render children()}
		{/if}
	</a>
{:else}
	<button class={buttonClass} {type} {disabled} aria-label={ariaLabel} {onclick} {...restProps}>
		{#if children}
			{@render children()}
		{/if}
	</button>
{/if}

<style>
	.ui-button {
		position: relative;
		isolation: isolate;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		max-width: 100%;
		min-height: var(--control-height-md);
		padding-inline: var(--control-padding-inline-md);
		border-radius: var(--radius-sm);
		border: 1px solid transparent;
		font-family: inherit;
		font-size: 0.97rem;
		font-weight: 500;
		letter-spacing: 0;
		line-height: 1;
		text-decoration: none;
		text-align: center;
		white-space: normal;
		overflow: visible;
		overflow-wrap: anywhere;
		cursor: pointer;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		transition:
			background var(--duration-base) var(--ease-standard),
			color var(--duration-base) var(--ease-standard),
			border-color var(--duration-base) var(--ease-standard),
			box-shadow var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.ui-button:focus-visible {
		outline: 1px solid color-mix(in srgb, var(--color-accent-soft) 68%, white);
		outline-offset: 2px;
		box-shadow:
			0 0 0 3px color-mix(in srgb, var(--color-accent) 16%, transparent),
			0 0 0 1px color-mix(in srgb, var(--color-accent-deep) 32%, transparent) inset;
	}

	.ui-button:active {
		background-color: color-mix(in srgb, currentColor 5%, transparent);
		transform: translateY(1px) scale(0.99);
	}

	.ui-button--md {
		min-height: var(--control-height-md);
		padding-inline: var(--control-padding-inline-md);
	}

	.ui-button--lg {
		min-height: var(--control-height-lg);
		padding-inline: var(--control-padding-inline-lg);
	}

	.ui-button--primary {
		background: var(--color-accent);
		color: var(--color-surface-quiet);
		border-color: color-mix(in srgb, var(--color-accent-deep) 44%, var(--color-accent));
		box-shadow: none;
	}

	.ui-button--secondary {
		background: transparent;
		color: var(--color-text-primary);
		border-color: color-mix(in srgb, var(--color-border-strong) 48%, transparent);
		box-shadow: none;
	}

	.ui-button--ghost {
		background: transparent;
		color: var(--color-text-muted);
		border-color: transparent;
		box-shadow: none;
	}

	@media (hover: hover) {
		.ui-button:hover {
			border-color: color-mix(in srgb, var(--color-accent) 32%, var(--color-border-strong));
			transform: translateY(-1px);
		}

		.ui-button--primary:hover {
			background: color-mix(in srgb, var(--color-accent) 82%, var(--color-accent-deep));
			border-color: var(--color-accent-deep);
			box-shadow: 0 0.55rem 1.2rem rgb(226 29 47 / 0.18);
		}

		.ui-button--secondary:hover {
			background: color-mix(in srgb, var(--color-bg-elevated) 62%, transparent);
			border-color: color-mix(in srgb, var(--color-text-primary) 44%, var(--color-border-soft));
			box-shadow: 0 0.45rem 1rem rgb(16 19 22 / 0.07);
		}

		.ui-button--ghost:hover {
			color: var(--color-text-primary);
			background: color-mix(in srgb, var(--color-bg-elevated) 78%, transparent);
			border-color: color-mix(in srgb, var(--color-border-strong) 28%, transparent);
			box-shadow: none;
		}
	}

	.ui-button--full {
		width: 100%;
	}

	.ui-button--disabled,
	.ui-button[disabled],
	.ui-button[aria-disabled='true'] {
		opacity: 0.58;
		cursor: not-allowed;
		pointer-events: none;
	}
</style>
