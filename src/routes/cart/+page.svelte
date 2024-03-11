<script lang="ts">
	import formatPrice from '$utils/formatPrice';
	import * as Alert from '$lib/components/ui/alert';

	export let data;
	$: ({ userCart } = data);
	$: cartItems = userCart?.items ?? [];
	$: cartHasIssues = cartItems.find((item) => !item.experience.isAvailable);
</script>

<h1>Shopping Cart</h1>

{#if cartHasIssues}
	<Alert.Root variant="destructive" class="my-16">
		<Alert.Title>There are issues with your cart</Alert.Title>
		<Alert.Description>This experience is no longer available.</Alert.Description>
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
				<div class="mb-2 text-xl font-semibold">{item.experience.name}</div>
				<div>{formattedPrice}</div>
				{#if !item.experience.isAvailable}
					<Alert.Root variant="destructive" class="inline-block w-auto">
						<Alert.Title>Unavailable</Alert.Title>
						<Alert.Description>This experience is no longer available.</Alert.Description>
					</Alert.Root>
				{/if}
			</div>
		</div>
	{/each}
</section>

<style lang="postcss">
	.cart-item {
		@apply grid gap-[2rem] pt-4;
		grid-template-columns: 300px 1fr;
	}
</style>
