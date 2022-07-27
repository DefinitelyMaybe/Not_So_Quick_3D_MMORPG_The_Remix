<script>
	// import { onMount } from 'svelte';
	// import { World } from '../worlds/entityViewer.js';
	import * as THREE from 'three';
	import { Canvas, AmbientLight, Mesh, OrbitControls, PerspectiveCamera } from '@threlte/core';

	// import Menu from '$lib/game/menu.svelte';
	// import ModelPicker from '$lib/dev/models.svelte';
	// import Inspector from '$lib/dev/inspector.svelte';

	// let world;
	// let model = 'paladin';
	// let obj;
	let scale = 1;

	// let focused = false;

	// function test() {
	// 	console.log(world);
	// }

	// function test2() {
	// 	console.log(world.camera);
	// 	console.log(world.entity.camera);
	// }

	// onMount(() => {
	// 	world = new World();
	// 	world.resize();
	// 	obj = world.entities.get(0);
	// });
</script>

<Canvas>
	<PerspectiveCamera fov={90}>
		<OrbitControls enableDamping />
	</PerspectiveCamera>

	<AmbientLight intensity={0.2} />

	<!-- Cube -->
	<Mesh
		interactive
		on:pointerenter={() => (scale = 2)}
		on:pointerleave={() => (scale = 1)}
		position={{ y: 0.5 }}
		castShadow
		geometry={new THREE.BoxBufferGeometry(1, 1, 1)}
		material={new THREE.MeshStandardMaterial({ color: '#333333' })}
	/>

	<!-- Floor -->
	<Mesh
		receiveShadow
		rotation={{ x: -90 * (Math.PI / 180) }}
		geometry={new THREE.CircleBufferGeometry(3, 72)}
		material={new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: 'white' })}
	/>
</Canvas>
<!-- <canvas class="absolute" id="game" />
<div class="absolute z-10">
	<Menu on:test={test} on:test2={test2} />
	<details class="flex flex-col" open>
		<summary>Helpers</summary>
		<ModelPicker
			bind:selected={model}
			on:change={() => {
				world.changeModel(model);
				obj = world.entities.get(0);
			}}
		/>
		<Inspector bind:object={obj} />
	</details>
</div> -->
