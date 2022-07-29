<script>
	import { useGltfAnimations, GLTF } from '@threlte/extras';
	
  export let data
  // use the data to load the model
  const {name, url} = data
  const { gltf, actions } = useGltfAnimations(({ actions }) => {
    // Either play your animations as soon as they are loaded
    actions['Idle']?.play()
  })

</script>

<GLTF {url} bind:gltf={$gltf} />

