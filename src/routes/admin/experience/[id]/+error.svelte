<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1 class="mb-3 text-4xl">404</h1>
<p>{$page.error?.message || 'Experience not found'}</p>
