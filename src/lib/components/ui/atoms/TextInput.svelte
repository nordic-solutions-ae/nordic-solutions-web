<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '../classnames';

	type Props = HTMLInputAttributes & {
		invalid?: boolean;
		class?: string;
	};

	let { invalid = false, class: className = '', ...attributes }: Props = $props();

	const inputClass = $derived(cn('ui-text-input', invalid && 'ui-text-input--invalid', className));
</script>

<input class={inputClass} aria-invalid={invalid || undefined} {...attributes} />

<style>
	.ui-text-input {
		width: 100%;
		min-width: 0;
		font: inherit;
		font-size: var(--font-size-body);
		line-height: 1.4;
		padding: var(--control-padding-block) var(--control-padding-inline-field);
		border-radius: var(--radius-sm);
		border: 1px solid color-mix(in srgb, var(--color-border-strong) 42%, transparent);
		background: var(--color-surface-quiet);
		color: var(--color-text-primary);
		text-overflow: ellipsis;
		caret-color: var(--color-accent);
		transition:
			border-color var(--duration-base) var(--ease-standard),
			box-shadow var(--duration-base) var(--ease-standard),
			background-color var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.ui-text-input::placeholder {
		color: color-mix(in srgb, var(--color-text-muted) 78%, transparent);
	}

	.ui-text-input:focus-visible {
		outline: 1px solid color-mix(in srgb, var(--color-accent-soft) 66%, white);
		outline-offset: 2px;
		border-color: color-mix(in srgb, var(--color-accent) 58%, var(--color-border-strong));
		box-shadow:
			0 0 0 3px color-mix(in srgb, var(--color-accent) 14%, transparent),
			0 0 0 1px color-mix(in srgb, var(--color-accent-deep) 22%, transparent) inset;
		transform: translateY(-1px);
	}

	.ui-text-input--invalid {
		border-color: color-mix(in srgb, var(--color-danger) 72%, var(--color-border-soft));
		background: color-mix(in srgb, var(--color-danger) 5%, var(--color-bg-elevated));
	}

	.ui-text-input:disabled {
		cursor: not-allowed;
		opacity: 0.72;
	}

	@media (prefers-reduced-motion: reduce) {
		.ui-text-input:focus-visible {
			transform: none;
		}
	}
</style>
