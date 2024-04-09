<script lang="ts">
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Role } from '@prisma/client';
	import { Button } from '$lib/components/ui/button';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	import { ShoppingCartIcon } from 'lucide-svelte';

	$: shortenedName = $page.data.username?.charAt(0).toUpperCase();
	$: userLoggedIn = Boolean($page.data.username);
</script>

<div class="p-4">
	<div class="mx-auto flex max-w-screen-2xl items-center justify-between">
		<a href="/" class="text-2xl font-bold">Vivid Ventures</a>
		<nav class="flex gap-6">
			<a href="/shop" class="link no-underline">Shop</a>
			<a href="/about" class="link no-underline">About</a>
		</nav>

		<div class="flex items-center gap-2">
			<Button on:click={toggleMode} variant="ghost" size="icon">
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
			{#if userLoggedIn}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root>
							{#if $page.data.avatar}
								<Avatar.Image src={$page.data.avatar} alt={$page.data.username} />
								<Avatar.Fallback>{shortenedName}</Avatar.Fallback>
							{:else}
								<Avatar.Fallback>{shortenedName}</Avatar.Fallback>
							{/if}
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label>My Account</DropdownMenu.Label>
							<DropdownMenu.Separator />
							{#if $page.data.role === Role.ADMIN}
								<DropdownMenu.Item>
									<a href="/admin" class="block w-full">Admin Tools</a>
								</DropdownMenu.Item>
							{/if}
							<DropdownMenu.Item>
								<a href="/dashboard" class="block w-full">Dashboard</a>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<form method="post" action="/sign-out" class="block w-full">
									<button type="submit" class="block w-full text-left text-red-700">Sign Out</button
									>
								</form>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<a href="/cart" class="inline-flex items-center gap-1">
					<ShoppingCartIcon />
					{#if $page.data.cartItemsCount > 0}
						<span
							class="inline-flex h-3 w-3 -translate-x-[12px] items-center justify-center rounded-full bg-primary p-2 text-[12px] text-white"
							>{$page.data.cartItemsCount}</span
						>
					{/if}
				</a>
			{:else}
				<Button href="/login" size="sm" variant="default">Login</Button>
				<Button href="/sign-up" size="sm" variant="secondary">Sign Up</Button>
			{/if}
		</div>
	</div>
</div>
