<script lang="ts">
	export let data;
	$: ({ name, description, price, imageUrl } = data.experience);
</script>

<h1>{name}</h1>
