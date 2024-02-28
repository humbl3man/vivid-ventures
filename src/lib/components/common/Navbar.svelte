<script lang="ts">
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Role } from '@prisma/client';
	import Button from '../ui/button/button.svelte';

	$: shortenedName = $page.data.username?.charAt(0).toUpperCase();
</script>

<div class="p-4">
	<div class="mx-auto flex max-w-screen-2xl items-center justify-between">
		<a href="/" class="text-2xl font-bold">Vivid Ventures</a>
		<nav class="flex gap-6">
			<a href="/" class="link no-underline">Shop</a>
			<a href="/about" class="link no-underline">About</a>
		</nav>
		{#if $page.data.username}
			<div class="flex items-center gap-4">
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
			</div>
		{:else}
			<div class="flex gap-2">
				<Button href="/login" size="sm" variant="default">Login</Button>
				<Button href="/sign-up" size="sm" variant="secondary">Sign Up</Button>
			</div>
		{/if}
	</div>
</div>
