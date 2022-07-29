<script>
	import { Canvas } from "@threlte/core";
	import { HTML } from "@threlte/extras";
	import { World } from "@threlte/rapier";
	import Scene from "$lib/scenes/simonsWorld.svelte"
</script>

<div class="relative h-full w-full overflow-hidden">
	<Canvas>
		<World>
			<Scene/>
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
</div>
