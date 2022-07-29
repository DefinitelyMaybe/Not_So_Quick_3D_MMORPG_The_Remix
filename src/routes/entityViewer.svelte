<script>
	import { Canvas } from "@threlte/core";
	import Scene from "$lib/scenes/entityViewer.svelte";
</script>

<div class="relative h-full w-full">
  <Canvas>
    <Scene/>
  </Canvas>

	<div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex flex-col items-center h-full">
			<form on:submit|preventDefault class="form-control pointer-events-auto">
				<div>
					<button class="btn" on:click="{()=>{}}">hello</button>
					<button class="btn" on:click="{()=>{}}">world</button>
				</div>
				<!-- <select class="input m-2" bind:value={url}>
					{#each data as obj}
				 		<option value="{obj.url}">{obj.name}</option>
				 	{/each}
				 </select> -->
			</form>
		</div>
	</div>
</div>
