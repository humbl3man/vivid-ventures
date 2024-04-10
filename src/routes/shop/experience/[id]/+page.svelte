<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import formatPrice from '$utils/formatPrice';
	import { AlertCircle, ChevronDown, ChevronUp, ShoppingCartIcon } from 'lucide-svelte';

	export let data;
	$: ({ username } = data);
	$: isLoggedIn = !!username;
	$: ({ name, description, price, imageUrl } = data.experience);
</script>

<section class="grid gap-12 md:grid-flow-col md:grid-cols-2">
	<div>
		<figure>
			<img src={imageUrl} alt={name} />
		</figure>
	</div>
	<div>
		<h1 class="mb-6">{name}</h1>
		<h2 class="mb-6 flex items-start text-4xl">
			{formatPrice(price)} <span class="ml-2 text-base font-normal"> per person</span>
		</h2>
		<!-- add to bag -->
		{#if isLoggedIn}
			<div class="mb-12">
				<form method="post" action="?/addToCart">
					<Button type="submit" class="inline-flex items-center" variant="default" size="lg"
						><ShoppingCartIcon class="mr-2 inline-block h-6 w-6" /> Add To Bag</Button
					>
				</form>
			</div>
		{:else}
			<Alert.Root class="mb-12 border-orange-600 bg-orange-50 ">
				<AlertCircle class="t-0 r-0 h-6 w-6 " />
				<Alert.Title class="text-orange-800">We are sorry</Alert.Title>
				<Alert.Description class="text-orange-800"
					>Add To Cart is only available to logged in users.</Alert.Description
				>
			</Alert.Root>
		{/if}
		<Collapsible.Root>
			<Collapsible.Trigger asChild let:builder>
				{@const isOpen = builder['data-state'] === 'open'}
				<h2 class="text-2xl">
					Description <Button
						variant="ghost"
						size="sm"
						class="ml-1 inline-flex w-8 items-center justify-center p-0"
						builders={[builder]}
					>
						{#if isOpen}
							<ChevronUp class="block h-4 w-4" />
						{:else}
							<ChevronDown class="block h-4 w-4" />
						{/if}
						<span class="sr-only" /></Button
					>
				</h2>
			</Collapsible.Trigger>
			<Collapsible.Content class="py-4">
				<p>{description}</p>
			</Collapsible.Content>
		</Collapsible.Root>
	</div>
</section>
