<script lang="ts">
	import { Button, FormField, TextInput, Textarea } from '$lib/components/ui';
	import { contactDetails, getHomeCopy } from '$lib/modules/home/content';
	import type { Locale } from '$lib/modules/i18n';
	import {
		type ContactFormErrors,
		type ContactFormValues,
		type ContactSubmissionResponse,
		contactFormFieldOrder,
		validateContactForm
	} from '$lib/modules/home/contact-form';

	type Props = {
		locale: Locale;
	};

	let { locale }: Props = $props();

	const defaultValues: ContactFormValues = {
		name: '',
		email: '',
		organization: '',
		message: ''
	};

	let values = $state<ContactFormValues>({ ...defaultValues });
	let website = $state('');
	let errors = $state<ContactFormErrors>({});
	let submitStatus = $state<ContactSubmissionResponse['state'] | 'idle' | 'submitting'>('idle');
	let statusMessage = $state('');
	const copy = $derived(getHomeCopy(locale));
	const localizedErrors = $derived.by<ContactFormErrors>(() => {
		if (locale !== 'ar') {
			return errors;
		}

		return Object.fromEntries(
			Object.keys(errors).map((field) => {
				const messages: Record<keyof ContactFormValues, string> = {
					name: 'يرجى إدخال الاسم.',
					email: 'يرجى إدخال بريد عمل صالح.',
					organization: 'يرجى تقصير اسم المؤسسة.',
					message: 'يرجى إضافة موجز قصير عن النطاق أو التوقيت أو الحاجة.'
				};

				return [field, messages[field as keyof ContactFormValues]];
			})
		);
	});

	const clearFieldError = (field: keyof ContactFormValues) => {
		if (!errors[field]) {
			return;
		}

		const nextErrors = { ...errors };
		delete nextErrors[field];
		errors = nextErrors;
	};

	const handleFieldInput = (field: keyof ContactFormValues, event: Event) => {
		const target = event.currentTarget;

		if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) {
			return;
		}

		values = {
			...values,
			[field]: target.value
		};

		clearFieldError(field);
		submitStatus = 'idle';
		statusMessage = '';
	};

	const focusFirstError = (validationErrors: ContactFormErrors) => {
		const firstInvalidField = contactFormFieldOrder.find((field) =>
			Boolean(validationErrors[field])
		);

		if (!firstInvalidField) {
			return;
		}

		const input = document.getElementById(`contact-${firstInvalidField}`);

		if (input instanceof HTMLElement) {
			input.focus();
		}
	};

	const applySubmissionResponse = (response: ContactSubmissionResponse) => {
		errors = response.errors ?? {};
		submitStatus = response.state;
		statusMessage = response.message;

		if (response.state === 'validation_error' && response.errors) {
			focusFirstError(response.errors);
		}

		if (response.ok) {
			values = { ...defaultValues };
			website = '';
		}
	};

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		const result = validateContactForm(values);
		values = result.values;
		errors = result.errors;

		if (!result.isValid) {
			submitStatus = 'idle';
			statusMessage = '';
			focusFirstError(result.errors);
			return;
		}

		errors = {};
		submitStatus = 'submitting';
		statusMessage = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({ ...result.values, website })
			});
			const body = (await response.json()) as ContactSubmissionResponse;

			applySubmissionResponse(body);
		} catch {
			submitStatus = 'error';
			statusMessage = 'The contact form could not reach the server.';
		} finally {
			const form = event.currentTarget;
			const activeElement = document.activeElement;

			if (
				form instanceof HTMLFormElement &&
				activeElement instanceof HTMLElement &&
				form.contains(activeElement)
			) {
				activeElement.blur();
			}
		}
	};
</script>

<section id="contact" class="contact-section">
	<div class="contact-section__frame reveal-stagger">
		<div class="contact-section__intro">
			<p class="contact-section__eyebrow">{copy.contact.eyebrow}</p>
			<h2>{copy.contact.title}</h2>
			<p>
				{copy.contact.description}
			</p>

			<ul class="contact-section__details">
				<li>
					<span>{copy.contact.details.email}</span>
					<a href={`mailto:${contactDetails.email}`}><bdi dir="ltr">{contactDetails.email}</bdi></a>
				</li>
				<li>
					<span>{copy.contact.details.phone}</span>
					<a href={`tel:${contactDetails.phone}`}><bdi dir="ltr">{contactDetails.phone}</bdi></a>
				</li>
				<li>
					<span>{copy.contact.details.address}</span>
					<p>
						<bdi dir="ltr">{contactDetails.addressLine1}</bdi><br />
						<bdi dir="ltr">{contactDetails.addressLine2}</bdi>
					</p>
				</li>
			</ul>
		</div>

		<div class="contact-section__form-wrap">
			<form class="contact-section__form" onsubmit={handleSubmit} novalidate>
				<p class="contact-section__form-context">
					{copy.contact.formContext}
				</p>

				<FormField
					inputId="contact-name"
					label={copy.contact.fields.name.label}
					required={true}
					error={localizedErrors.name}
					helper={copy.contact.fields.name.helper}
				>
					<TextInput
						id="contact-name"
						name="name"
						type="text"
						autocomplete="name"
						placeholder={copy.contact.fields.name.placeholder}
						maxlength={120}
						required
						value={values.name}
						invalid={Boolean(localizedErrors.name)}
						aria-describedby="contact-name-hint"
						oninput={(event) => handleFieldInput('name', event)}
					/>
				</FormField>

				<FormField
					inputId="contact-email"
					label={copy.contact.fields.email.label}
					required={true}
					error={localizedErrors.email}
					helper={copy.contact.fields.email.helper}
				>
					<TextInput
						id="contact-email"
						name="email"
						type="email"
						inputmode="email"
						autocomplete="email"
						placeholder={copy.contact.fields.email.placeholder}
						maxlength={180}
						required
						value={values.email}
						invalid={Boolean(localizedErrors.email)}
						aria-describedby="contact-email-hint"
						oninput={(event) => handleFieldInput('email', event)}
					/>
				</FormField>

				<FormField
					inputId="contact-organization"
					label={copy.contact.fields.organization.label}
					error={localizedErrors.organization}
					helper={copy.contact.fields.organization.helper}
				>
					<TextInput
						id="contact-organization"
						name="organization"
						type="text"
						autocomplete="organization"
						placeholder={copy.contact.fields.organization.placeholder}
						maxlength={180}
						value={values.organization}
						invalid={Boolean(localizedErrors.organization)}
						aria-describedby="contact-organization-hint"
						oninput={(event) => handleFieldInput('organization', event)}
					/>
				</FormField>

				<FormField
					inputId="contact-message"
					label={copy.contact.fields.message.label}
					required={true}
					error={localizedErrors.message}
					helper={copy.contact.fields.message.helper}
				>
					<Textarea
						id="contact-message"
						name="message"
						rows={4}
						placeholder={copy.contact.fields.message.placeholder}
						maxlength={1200}
						required
						value={values.message}
						invalid={Boolean(localizedErrors.message)}
						aria-describedby="contact-message-hint"
						oninput={(event) => handleFieldInput('message', event)}
					></Textarea>
				</FormField>

				<div class="contact-section__honeypot" aria-hidden="true">
					<label for="contact-website">Website</label>
					<input
						id="contact-website"
						name="website"
						type="text"
						autocomplete="off"
						tabindex="-1"
						bind:value={website}
					/>
				</div>

				{#if Object.keys(errors).length > 0}
					<p class="contact-section__status contact-section__status--error" role="alert">
						{copy.contact.errors.generic}
					</p>
				{:else if submitStatus === 'error'}
					<p class="contact-section__status contact-section__status--error" role="alert">
						{statusMessage}
						<a href={`mailto:${contactDetails.email}`}
							>{copy.contact.errors.reachByEmail} {contactDetails.email}</a
						>
						{copy.contact.errors.or}
						<a href={`tel:${contactDetails.phone}`}
							>{copy.contact.errors.call} {contactDetails.phone}</a
						>.
					</p>
				{:else if submitStatus === 'success'}
					<p class="contact-section__status contact-section__status--success" role="status">
						{statusMessage}
					</p>
				{/if}

				<Button type="submit" size="lg" disabled={submitStatus === 'submitting'}>
					{submitStatus === 'submitting'
						? copy.contact.button.submitting
						: copy.contact.button.idle}
				</Button>
			</form>
		</div>
	</div>
</section>

<style>
	.contact-section {
		padding-top: clamp(2.15rem, 4.3vw, 4rem);
	}

	.contact-section__frame {
		--contact-frame-padding: clamp(1.25rem, 3vw, 2rem);

		display: grid;
		grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		min-width: 0;
		padding: var(--contact-frame-padding);
		border-radius: var(--radius-lg);
		background: var(--color-dark-surface);
		color: var(--color-surface-quiet);
		border: 1px solid color-mix(in srgb, var(--color-border-soft) 16%, transparent);
		box-shadow: none;
	}

	.contact-section__intro {
		display: grid;
		align-content: start;
		gap: 1rem;
		min-width: 0;
	}

	.contact-section__eyebrow {
		margin: 0;
		font-size: var(--font-size-kicker);
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgb(238 241 244 / 0.54);
	}

	.contact-section__intro h2,
	.contact-section__details a {
		color: var(--color-bg-canvas);
	}

	.contact-section__intro > p {
		color: rgb(243 240 238 / 0.7);
	}

	.contact-section__details {
		display: grid;
		gap: 0.65rem;
		margin: 0.4rem 0 0;
		padding: 0;
		list-style: none;
	}

	.contact-section__details li {
		display: grid;
		align-content: start;
		gap: 0.34rem;
		padding: 0.72rem 0.9rem;
		border-radius: var(--radius-md);
		background: rgb(255 255 255 / 0.05);
		border: 1px solid rgb(255 255 255 / 0.08);
		min-width: 0;
	}

	.contact-section__details span {
		display: block;
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgb(243 240 238 / 0.52);
	}

	.contact-section__details p {
		color: rgb(243 240 238 / 0.78);
	}

	.contact-section__details a,
	.contact-section__details p {
		overflow-wrap: anywhere;
	}

	.contact-section__details a {
		display: inline-flex;
		align-items: center;
		min-height: 0;
		white-space: nowrap;
	}

	.contact-section__form-wrap {
		padding: 1rem;
		border-radius: var(--radius-lg);
		background: var(--color-bg-elevated);
		border: 1px solid var(--panel-border-color);
		min-width: 0;
	}

	.contact-section__form {
		display: grid;
		gap: 1rem;
		min-width: 0;
	}

	.contact-section__form-context {
		margin: 0 0 0.15rem;
		color: var(--color-text-muted);
		font-size: var(--font-size-small);
		line-height: 1.5;
		overflow-wrap: anywhere;
	}

	.contact-section__honeypot {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.contact-section__status {
		padding: 0.85rem 1rem;
		border-radius: var(--radius-md);
		font-size: 0.92rem;
		line-height: 1.45;
		overflow-wrap: anywhere;
		border: 1px solid transparent;
		animation: contact-status-in var(--duration-base) var(--ease-expressive);
	}

	.contact-section__status--error {
		background: color-mix(in srgb, var(--color-danger) 10%, white);
		color: var(--color-danger);
		border-color: color-mix(in srgb, var(--color-danger) 22%, transparent);
	}

	.contact-section__status--success {
		background: color-mix(in srgb, var(--color-success) 10%, white);
		color: var(--color-success);
		border-color: color-mix(in srgb, var(--color-success) 22%, transparent);
	}

	.contact-section__status a {
		color: inherit;
		font-weight: 700;
		text-underline-offset: 0.18em;
	}

	@media (max-width: 900px) {
		.contact-section__frame {
			--contact-frame-padding: clamp(1.15rem, 5vw, 1.5rem);

			grid-template-columns: 1fr;
			gap: 0;
			padding: 0;
			overflow: hidden;
			border: 0;
			background: var(--color-bg-elevated);
		}

		.contact-section__intro {
			padding: var(--contact-frame-padding);
			background: var(--color-dark-surface);
		}

		.contact-section__form-wrap {
			padding: var(--contact-frame-padding);
			border: 0;
			border-radius: 0;
		}
	}

	@media (min-width: 901px) {
		.contact-section__intro {
			display: flex;
			flex-direction: column;
		}

		.contact-section__details {
			margin-top: auto;
		}
	}

	@keyframes contact-status-in {
		from {
			opacity: 0;
			transform: translate3d(0, 0.35rem, 0);
		}

		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}
</style>
