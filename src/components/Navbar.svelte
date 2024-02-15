<script lang="ts">
	import { page } from '$app/stores';
	import { Role } from '@prisma/client';
	$: isHomePage = $page.route.id === '/';
	$: console.log($page.data);
</script>

<div class="absolute right-0 top-0 z-50 w-full p-4 {isHomePage ? 'text-white' : ''}">
	<div class="mx-auto flex max-w-screen-2xl items-center justify-between">
		<a href="/" class="text-2xl font-bold">Vivid Ventures</a>
		<nav class="flex gap-6 text-base">
			<a href="/" class="link no-underline">Shop</a>
			<a href="/about" class="link no-underline">About</a>
		</nav>
		{#if $page.data.username}
			<div class="flex items-center gap-2">
				<a
					href={$page.data.role === Role.ADMIN ? '/admin' : '/user'}
					class="btn btn-ghost btn-sm inline-flex items-center gap-2"
				>
					{#if $page.data.avatar}
						<img class="max-w-6 object-contain" src={$page.data.avatar} alt={$page.data.username} />
						<span>{$page.data.username}</span>
					{:else}
						<span class="text-sm">{$page.data.username}</span>
					{/if}
				</a>
				<form method="post" action="/sign-out">
					<button type="submit" class="btn btn-outline btn-error btn-sm">Sign Out</button>
				</form>
			</div>
		{:else}
			<div class="flex gap-2">
				<a href="/login" class="btn btn-sm">Login</a>
				<a href="/sign-up" class="btn btn-primary btn-sm">Sign Up</a>
			</div>
		{/if}
	</div>
</div>
