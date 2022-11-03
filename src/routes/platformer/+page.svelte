<script>
	import { Canvas } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import { World } from '@threlte/rapier';
  import Scene from "$lib/scenes/Platformer.svelte";
</script>

<div class="relative h-full w-full overflow-hidden">
	<Canvas>
		<World>
			<Scene />
			<HTML center slot="fallback">
				<p>Your browser doesn't support WASM.</p>
			</HTML>
		</World>
	</Canvas>
	<div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex flex-col items-center h-full">
			<div class="pointer-events-auto">
				<a class="btn m-2" href="/">return</a>
			</div>
		</div>
	</div>
	<div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex h-full">
			<div class="pointer-events-auto">
				<button
					class="btn m-2"
					on:click={() => {
						console.log('test');
					}}>test</button>
				<button
					class="btn m-2"
					on:click={() => {
						console.log('test2');
					}}>test2</button>
			</div>
		</div>
	</div>
</div>
