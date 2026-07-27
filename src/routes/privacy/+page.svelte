<script lang="ts">
	import LegalPage from '$lib/modules/legal/LegalPage.svelte';
	import { getLegalDocument } from '$lib/modules/legal/content';

	const document = getLegalDocument('privacy', 'en');
</script>

<LegalPage {document} locale="en" />
