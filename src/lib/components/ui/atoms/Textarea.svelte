<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { cn } from '../classnames';

	type Props = HTMLTextareaAttributes & {
		invalid?: boolean;
		class?: string;
	};

	let { invalid = false, class: className = '', ...attributes }: Props = $props();

	const textareaClass = $derived(cn('ui-textarea', invalid && 'ui-textarea--invalid', className));
</script>

<textarea class={textareaClass} aria-invalid={invalid || undefined} {...attributes}></textarea>

<style>
	.ui-textarea {
		width: 100%;
		min-width: 0;
		font: inherit;
		font-size: var(--font-size-body);
		line-height: 1.5;
		padding: var(--control-padding-block) var(--control-padding-inline-field);
		border-radius: var(--radius-sm);
		border: 1px solid color-mix(in srgb, var(--color-border-strong) 42%, transparent);
		background: var(--color-surface-quiet);
		color: var(--color-text-primary);
		caret-color: var(--color-accent);
		resize: vertical;
		min-height: 8rem;
		overflow: auto;
		overflow-wrap: anywhere;
		transition:
			border-color var(--duration-base) var(--ease-standard),
			box-shadow var(--duration-base) var(--ease-standard),
			background-color var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.ui-textarea::placeholder {
		color: color-mix(in srgb, var(--color-text-muted) 78%, transparent);
	}

	.ui-textarea:focus-visible {
		outline: 1px solid color-mix(in srgb, var(--color-accent-soft) 66%, white);
		outline-offset: 2px;
		border-color: color-mix(in srgb, var(--color-accent) 58%, var(--color-border-strong));
		box-shadow:
			0 0 0 3px color-mix(in srgb, var(--color-accent) 14%, transparent),
			0 0 0 1px color-mix(in srgb, var(--color-accent-deep) 22%, transparent) inset;
		transform: translateY(-1px);
	}

	.ui-textarea--invalid {
		border-color: color-mix(in srgb, var(--color-danger) 72%, var(--color-border-soft));
		background: color-mix(in srgb, var(--color-danger) 5%, var(--color-bg-elevated));
	}

	.ui-textarea:disabled {
		cursor: not-allowed;
		opacity: 0.72;
	}

	@media (prefers-reduced-motion: reduce) {
		.ui-textarea:focus-visible {
			transform: none;
		}
	}
</style>
