<script lang="ts">
	type Props = {
		label: string;
		inputId: string;
		error?: string | undefined;
		helper?: string | undefined;
		required?: boolean;
		children?: import('svelte').Snippet;
	};

	let { label, inputId, error, helper, required = false, children }: Props = $props();

	const hintText = $derived(error ?? helper ?? '');
	const hintId = $derived(`${inputId}-hint`);
</script>

<div class="form-field">
	<label class="form-field__label" for={inputId}>
		{label}
		{#if required}
			<span class="form-field__required" aria-hidden="true">*</span>
		{/if}
	</label>

	{#if children}
		<div class="form-field__control">
			{@render children()}
		</div>
	{/if}

	{#if hintText}
		<p
			id={hintId}
			class:form-field__hint--error={Boolean(error)}
			class="form-field__hint"
			aria-live={error ? 'polite' : undefined}
		>
			{hintText}
		</p>
	{/if}
</div>

<style>
	.form-field {
		display: grid;
		gap: var(--space-2);
		min-width: 0;
	}

	.form-field__label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		min-width: 0;
		font-size: var(--font-size-small);
		font-weight: 500;
		color: var(--color-text-muted);
	}

	.form-field__required {
		font-weight: 700;
		color: color-mix(in oklab, var(--color-danger) 76%, var(--color-text-muted));
	}

	.form-field__hint {
		margin: 0;
		font-size: var(--font-size-small);
		line-height: 1.4;
		color: var(--color-text-muted);
		overflow-wrap: anywhere;
		transition:
			color var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.form-field__hint--error {
		color: color-mix(in oklab, var(--color-danger) 88%, var(--color-text-primary));
		transform: translateX(0.12rem);
	}
</style>
