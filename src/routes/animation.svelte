<script>
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/scenes/animationExample.svelte';
	import { state } from '$lib/scenes/animationExample.js';
</script>

<div class="relative h-full w-full">
	<Canvas>
		<Scene />
	</Canvas>
	<div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex flex-col items-center h-full">
			<div class="pointer-events-auto">
				<a class="btn m-2" href="/">return</a>
			</div>
		</div>
	</div>
	<div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex items-center h-full">
			<div class="pointer-events-auto">
				<button
					class="btn m-2"
					on:click={() => {
						$state = !$state;
					}}>Test</button>
			</div>
		</div>
	</div>
</div>
