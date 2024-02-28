<script lang="ts">
	import type { Experience } from '@prisma/client';
	export let experience: Experience;
</script>

<div class="card-full card card-bordered">
	<figure>
		<img src={experience.imageUrl} alt={experience.name} />
	</figure>
	<div class="card-body">
		<div class="card-title">
			{experience.name}
		</div>
	</div>
</div>
