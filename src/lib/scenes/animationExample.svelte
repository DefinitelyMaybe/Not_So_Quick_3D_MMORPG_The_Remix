<script>
	import * as THREE from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import { PerspectiveCamera, DirectionalLight, AmbientLight, Mesh, OrbitControls } from '@threlte/core';
	import { useGltfAnimations, GLTF, HTML } from '@threlte/extras';
	import { modelData } from '../../data/models/mod.js';

	const { name, url } = modelData.sorceror;
	const { gltf, actions, mixer } = useGltfAnimations(setup)

	const triggerAnimation = () => {
    if ($mixer) $mixer.timeScale = 0.5
    $actions['Attack']?.play()
  }
	
	function setup({ actions }) {
		console.log(actions);
	  // Either play your animations as soon as they are loaded
	  actions['Idle']?.play()
	}
</script>

<PerspectiveCamera position={{ x: 3, y: 3, z: 3 }} fov={90}>
	<OrbitControls
		maxPolarAngle={DEG2RAD * 80}
		autoRotate={false}
		enableZoom={false}
		target={{ y: 0.5 }}
	/>
</PerspectiveCamera>

<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
    <DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
    <AmbientLight intensity={0.2} />

<GLTF {url} bind:gltf={$gltf}/>

<Mesh
	material={new THREE.MeshStandardMaterial()}
	geometry={new THREE.CircleBufferGeometry(3, 72)}
	rotation={{ x: DEG2RAD * -90 }} />