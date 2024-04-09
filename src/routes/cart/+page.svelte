<script lang="ts">
	import formatPrice from '$utils/formatPrice';
	import * as Alert from '$lib/components/ui/alert';
	import { AlertCircle, CircleDashed, Trash2Icon } from 'lucide-svelte';
	import FormButton from '$lib/components/ui/form/form-button.svelte';
	import { enhance } from '$app/forms';

	export let data;
	$: ({ userCart } = data);
	$: cartItems = userCart?.items ?? [];
	$: cartHasIssues = cartItems.find((item) => !item.experience.isAvailable);
</script>

<h1>Shopping Cart</h1>

{#if cartHasIssues}
	<Alert.Root variant="destructive" class="my-16">
		<AlertCircle />
		<Alert.Title>There are issues with your cart</Alert.Title>
	</Alert.Root>
{/if}

<section class="mt-16 space-y-10 border-t pt-8">
	{#each cartItems as item (item.id)}
		{@const formattedPrice = formatPrice(item.experience.price)}
		<div class="cart-item">
			<figure>
				<img
					class="rounded-md object-contain"
					src={item.experience.imageUrl}
					alt={item.experience.name}
				/>
			</figure>
			<div>
				<div class="name mb-2 text-xl font-semibold">{item.experience.name}</div>
				<div class="price">{formattedPrice}</div>
				{#if !item.experience.isAvailable}
					<p class="error text-red-600">This experience is no longer available.</p>
				{/if}
				<form action="?/remove" method="post" use:enhance>
					<input type="hidden" name="experience_id" value={item.experience.id} />
					<FormButton variant="secondary" size="sm" class="mt-2"
						><Trash2Icon class="mr-2" /> Remove From Cart</FormButton
					>
				</form>
			</div>
		</div>
	{/each}
</section>

<style lang="postcss">
	.cart-item {
		@apply grid gap-[2rem] pt-4;
		grid-template-columns: 300px 1fr;
	}

	.cart-item:has(.error) img,
	.cart-item:has(.error) .name,
	.cart-item:has(.error) .price {
		@apply opacity-30;
	}
</style>
