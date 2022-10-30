<script>
	import * as THREE from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import {
		AmbientLight,
		DirectionalLight,
		OrbitControls,
		PerspectiveCamera,
		useThrelte,
		useLoader,
		Object3DInstance
	} from '@threlte/core';
	import { selectedEntity } from '../Store';
	import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
	// import Model from "../model.svelte";
	// import { modelData } from "../../data/models/mod.js";

	const { scene } = useThrelte();

	const loaderFBX = useLoader(FBXLoader, () => new FBXLoader());
	const loaderOBJ = useLoader(OBJLoader, () => new OBJLoader());
	const loaderGLTF = useLoader(GLTFLoader, () => new GLTFLoader());

	let object;
	let scale = 1
	let loading = true

	scene.add(new THREE.GridHelper(10, 10));

	$: if ($selectedEntity) {
		loading = true
		if ($selectedEntity.url.match(/glb|gltf/g)?.length > 0) {
			loaderGLTF.load($selectedEntity.url, (obj) => {
				console.log("GLTF loader");
				console.log(obj);
				object = obj.scene;
				loading = false
			});
		} else if ($selectedEntity.url.match(/fbx/g)?.length > 0) {
			loaderFBX.load($selectedEntity.url, (obj) => {
				console.log("FBX loader");
				console.log(obj);
				object = obj;
				loading = false
			});
		} else if ($selectedEntity.url.match(/obj/g)?.length > 0) {
			loaderOBJ.load($selectedEntity.url, (obj) => {
				console.log("OBJ loader");
				console.log(obj);
				object = obj;
				loading = false
			});
		}
	}

	$: if (object) {
		if ($selectedEntity.scale) {
			scale = $selectedEntity.scale
		} else {
			scale = 1
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
{#if object}
	<Object3DInstance bind:object={object} bind:scale={scale} visible={!loading}/>
{/if}
