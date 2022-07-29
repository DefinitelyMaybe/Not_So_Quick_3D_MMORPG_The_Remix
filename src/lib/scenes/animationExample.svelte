<script>
	import * as THREE from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import { PerspectiveCamera, DirectionalLight, AmbientLight, Mesh } from '@threlte/core';
	import { useGltfAnimations, GLTF } from '@threlte/extras';
	import { modelData } from '../../data/models/mod.js';

	const { name, url } = modelData.sorceror;
	// const { gltf, actions } = useGltfAnimations<'All Animations'>(({ actions }) => {
	//   // Either play your animations as soon as they are loaded
	//   actions['All Animations']?.play()
	// })
</script>

<PerspectiveCamera fov={90} />

<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
<AmbientLight intensity={0.5} />

<GLTF {url} />
<Mesh
	material={new THREE.MeshStandardMaterial()}
	geometry={new THREE.CircleBufferGeometry()}
	rotation={{ x: DEG2RAD * -90 }} />
