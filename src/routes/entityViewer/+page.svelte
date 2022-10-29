<script>
	import { Canvas } from "@threlte/core";
	import Scene from "$lib/scenes/entityViewer.svelte";

	let show = false
	let currentEntity
</script>

<div class="relative h-full w-full">
  <Canvas>
    <Scene bind:currentEntity/>
  </Canvas>
	<div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex flex-col items-center h-full">
			<div class="pointer-events-auto">
				<a class="btn m-2" href="/">return</a>
			</div>
		</div>
	</div>

	<div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex {!show?"":"hidden"}">
			<div class="pointer-events-auto">
				<button class="btn" on:click={()=>{show = true}}>Open</button>
			</div>
		</div>
	</div>

	<div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex flex-col w-1/3 h-full pointer-events-auto bg-stone-500/50 {show?"":"hidden"}">
			<div class="flex justify-end">
				<button class="btn" on:click={()=>{show = false}}>Close</button>
			</div>
			<div>

			</div>
		</div>
	</div>
</div>
