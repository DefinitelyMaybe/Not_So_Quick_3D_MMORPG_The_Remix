<script>
  import * as THREE from "three";
  import {
		Object3DInstance,
		useLoader
	} from '@threlte/core';
  import { derived } from "svelte/store";
	import { useGltf, useGltfAnimations, GLTF } from '@threlte/extras';
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
	
  export let data
  // use the data to load the model
  const {name, url} = data
  

  const { gltf } = useGltf(url)
  // const object = derived(gltf, (gltf) => {
	// 	console.log(gltf);
	// })

  $: console.log(name, url);
  $: console.log($gltf);
</script>

{#if $gltf}
<Object3DInstance object={$gltf.scene} />
{/if}

