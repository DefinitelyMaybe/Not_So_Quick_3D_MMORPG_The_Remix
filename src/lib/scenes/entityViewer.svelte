<script>
	import * as THREE from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import {
		AmbientLight,
		DirectionalLight,
		OrbitControls,
		PerspectiveCamera,
		useThrelte
	} from '@threlte/core';
  import Model from "../model.svelte";
  import { modelData } from "../../data/models/mod.js";

	const { scene } = useThrelte()

	scene.add(new THREE.GridHelper(10,10))

	const data = []

	for (const obj in modelData) {
		const {name, url} = modelData[obj]

		if (url.match(/glb|gltf/g)?.length > 0) {
			data.push({name, url})
			console.log(name, url, data.length-1);
		}
	}
</script>

<PerspectiveCamera position={{ x: 0, y: 2, z: 5 }} fov={90}>
	<OrbitControls maxPolarAngle={DEG2RAD * 80} />
</PerspectiveCamera>

<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
<AmbientLight intensity={0.2} />

<!-- Object -->
<Model data={data[0]}></Model>