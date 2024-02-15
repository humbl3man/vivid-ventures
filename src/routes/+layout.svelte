<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
</script>

<div data-theme="winter">
	<header>
		<Navbar />
	</header>
	<main class={$page.route.id !== '/' ? 'mx-auto max-w-screen-2xl p-4 pt-24' : ''}>
		<slot />
	</main>
</div>
