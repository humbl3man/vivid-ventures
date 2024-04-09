<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="rounded-sm p-16 text-center">
	<h1 class="text-6xl">{$page.status}</h1>
	<p class="text-lg">{$page.error?.message ?? ''}</p>
</section>
