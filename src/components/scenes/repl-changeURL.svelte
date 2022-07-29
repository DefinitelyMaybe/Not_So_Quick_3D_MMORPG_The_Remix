<script>
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import { AmbientLight, DirectionalLight, OrbitControls, PerspectiveCamera } from '@threlte/core';
	import { HTML, GLTF } from '@threlte/extras';

	let state = true;
	const onClick = () => {
		if (state) {
			url = url1;
			state = false;
			console.log('clicked. now url1');
		} else {
			url = url2;
			state = true;
			console.log('clicked. now url2');
		}
	};

	let url1 = 'https://threejs.org/examples/models/gltf/Flamingo.glb';
	let url2 = 'https://threejs.org/examples/models/gltf/Horse.glb';

	let url = url1;
</script>

<HTML position={{ y: 3 }} transform>
	<button on:click={onClick} class="btn"> test </button>
</HTML>
<PerspectiveCamera position={{ z: 10, y: 5, x: 10 }} fov={30}>
	<OrbitControls
		target={{ y: 0.75 }}
		maxPolarAngle={85 * DEG2RAD}
		minPolarAngle={20 * DEG2RAD}
		maxAzimuthAngle={45 * DEG2RAD}
		minAzimuthAngle={-45 * DEG2RAD}
		enableZoom={false}
	/>
</PerspectiveCamera>

<DirectionalLight position={{ y: 10, z: 10 }} />

<AmbientLight intensity={0.3} />

<GLTF {url} scale={0.01} />
