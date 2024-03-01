<script lang="ts">
	import { page } from '$app/stores';
	import Navbar from '$lib/components/common/Navbar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
</script>

<div>
	<header>
		<Navbar />
	</header>
	<main class={$page.route.id !== '/' ? 'mx-auto max-w-screen-2xl p-4 pt-24' : ''}>
		<slot />
	</main>
</div>

<Toaster />
