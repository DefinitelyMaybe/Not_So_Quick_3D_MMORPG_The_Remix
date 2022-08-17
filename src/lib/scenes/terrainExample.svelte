<script lang="ts">
	import { DirectionalLight, PerspectiveCamera, OrbitControls } from '@threlte/core';
	import { CollisionGroups, Debug } from '@threlte/rapier';
	import Terrain from '../Terrain.svelte';

	let cam;

	export const gui = {
		getCamera() {
			return cam;
		}
	};
</script>

<Debug />

<PerspectiveCamera bind:camera={cam} position={{ x: 72, y: 80, z: 81 }}>
	<OrbitControls />
</PerspectiveCamera>
<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

<CollisionGroups groups={[0, 15]}>
	<Terrain />
</CollisionGroups>
