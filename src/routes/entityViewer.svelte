<script>
	import { Canvas } from "@threlte/core";
	import Scene from "$lib/scenes/entityViewer.svelte";
	import { modelData } from "../data/models/mod.js";

	const data = []
	for (const obj in modelData) {
		const {name, url} = modelData[obj]

		if (url.match(/glb|gltf/g)?.length > 0) {
			data.push({name, url})
		}
	}

	let url = data[1].url
	let modelURL1 = data[1].url
	let modelURL2 = data[0].url
</script>

<div class="relative h-full w-full">
  <Canvas>
    <Scene url={url}/>
  </Canvas>
	<div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex flex-col items-center h-full">
			<form on:submit|preventDefault class="form-control pointer-events-auto">
				<div>
					<button class="btn" on:click="{()=>{url=modelURL1}}">{modelURL1}</button>
					<button class="btn" on:click="{()=>{url=modelURL2}}">{modelURL2}</button>
				</div>
				<!-- <select class="input" bind:value={modelURL} on:change="{()=>{
					let {gltf} = useGltf(modelURL)
					}}">
					{#each data as obj}
						<option value="{obj.url}">{obj.name}</option>
					{/each}
				</select> -->
			</form>
		</div>
	</div>
</div>
