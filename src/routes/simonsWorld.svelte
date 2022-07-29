<script>
	import { Canvas } from "@threlte/core";
	import { HTML } from "@threlte/extras";
	import { World } from "@threlte/rapier";
	import Scene from "$lib/scenes/simonsWorld.svelte"
</script>

<div class="relative h-full w-full">
	<Canvas>
		<World>
			<Scene/>
			<HTML center>
				<p>Your browser doesn't support WASM.</p>
			</HTML>
		</World>
	</Canvas>
</div>
