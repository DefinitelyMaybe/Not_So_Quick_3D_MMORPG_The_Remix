<script>
	import * as THREE from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import {
		AmbientLight,
		DirectionalLight,
		Mesh,
		OrbitControls,
		PerspectiveCamera
	} from '@threlte/core';
  import Model from "../model.svelte";
  import { modelData } from "../../data/models/mod.js";

	const data = []

	for (const obj in modelData) {
		const {name, url} = modelData[obj]

		if (url.match(/glb|gltf/g)?.length > 0) {
			data.push({name, url})
		}
	}
</script>

<PerspectiveCamera position={{ x: 10, y: 10, z: 10 }} fov={24}>
	<OrbitControls maxPolarAngle={DEG2RAD * 80} target={{ y: 0.5 }} />
</PerspectiveCamera>

<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
<AmbientLight intensity={0.2} />

<!-- Object -->
<Model data={data[0]}></Model>

<!-- Floor -->
<Mesh
	receiveShadow
	rotation={{ x: -90 * (Math.PI / 180) }}
	geometry={new THREE.CircleBufferGeometry(3, 72)}
	material={new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: '#333333' })}
/>
