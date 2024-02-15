<script lang="ts">
	import { page } from '$app/stores';
	$: isHomePage = $page.route.id === '/';
	$: console.log($page.data);
</script>

<div class="absolute right-0 top-0 z-50 w-full p-4 {isHomePage ? 'text-white' : ''}">
	<div class="mx-auto flex max-w-screen-2xl items-center justify-between">
		<a href="/" class="text-2xl font-bold">Vivid Ventures</a>
		<nav class="flex gap-6">
			<a href="/" class="link text-lg no-underline">Shop</a>
			<a href="/about" class="link text-lg no-underline">About</a>
		</nav>
		{#if $page.data.username}
			<div class="flex items-center gap-2">
				<a href="/user" class="btn btn-outline btn-primary btn-sm inline-flex items-center gap-2">
					{#if $page.data.avatar}
						<img class="max-w-6 object-contain" src={$page.data.avatar} alt={$page.data.username} />
						<span>{$page.data.username}</span>
					{:else}
						<span class="text-sm">{$page.data.username}</span>
					{/if}
				</a>
				<form method="post" action="/sign-out">
					<button type="submit" class="btn btn-outline btn-sm text-neutral-content">Sign Out</button
					>
				</form>
			</div>
		{:else}
			<div>
				<a href="/login" class="btn btn-accent btn-sm">Login</a>
				<a href="/sign-up" class="btn btn-ghost btn-sm">Sign Up</a>
			</div>
		{/if}
	</div>
</div>
