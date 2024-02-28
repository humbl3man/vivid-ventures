<script>
	import { page } from '$app/stores';
	import { Role } from '@prisma/client';
</script>

<h1 class="mb-8 text-4xl font-bold">Welcome, {$page.data.username}</h1>

{#if $page.data.role === Role.ADMIN}
	<a href="/admin">Admin Tools</a>
{/if}
