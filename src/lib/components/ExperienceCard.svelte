<script lang="ts">
	import type { Experience } from '@prisma/client';
	import * as Card from '$lib/components/ui/card';
	import formatPrice from '$utils/formatPrice';

	export let experience: Experience;
	$: ({ name, description, price, imageUrl } = experience);
</script>

<Card.Root>
	<figure class="h-60">
		<img src={imageUrl} alt={name} class="block h-full w-full object-cover" />
	</figure>
	<Card.Header>
		<Card.Title>{name}</Card.Title>
	</Card.Header>
	<Card.Content>
		<p>{formatPrice(price)}</p>
	</Card.Content>
</Card.Root>
