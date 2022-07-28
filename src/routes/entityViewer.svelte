<script>
	import { CircleBufferGeometry, MeshStandardMaterial, BoxBufferGeometry, DoubleSide } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import {
    AmbientLight,
    Canvas,
    DirectionalLight,
    Mesh,
    OrbitControls,
    PerspectiveCamera,
		Object3DInstance,
		useLoader
  } from '@threlte/core'
	import { useGltf, useGltfAnimations, GLTF } from "@threlte/extras";
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
	import { modelData } from "../data/models/mod.js";

	const loader = useLoader(OBJLoader, () => new OBJLoader())

	const data = []
	for (const obj in modelData) {
		const {name, url} = modelData[obj]

		if (url.match(/glb|gltf/g)?.length > 0) {
			data.push({name, url})
		}
	}

	let url = data[1].url
	let modelURL1 = data[1].url
	let modelURL2 = data[0].url

  // Provide that store to the hook useGltfAnimations
  // useGltfAnimations(gltf, ({ actions }) => {
  //   actions['All Animations']?.play()
  // })

</script>

<div class="relative h-full w-full">
  <Canvas>
    <PerspectiveCamera position={{ x: 10, y: 10, z: 10 }} fov={24}>
      <OrbitControls
        maxPolarAngle={DEG2RAD * 80}
        target={{ y: 0.5 }}
      />
    </PerspectiveCamera>

    <DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
    <DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
    <AmbientLight intensity={0.2} />

    <!-- Object -->
		<GLTF url={url} />

    <!-- Floor -->
    <Mesh
      receiveShadow
      rotation={{ x: -90 * (Math.PI / 180) }}
      geometry={new CircleBufferGeometry(3, 72)}
      material={new MeshStandardMaterial({ side: DoubleSide, color: '#333333' })}
    />
  </Canvas>
	<div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex flex-col items-center h-full">
			<form on:submit|preventDefault class="form-control pointer-events-auto">
				<div>
					<button class="btn" on:click="{()=>{url=modelURL1}}">{modelURL1}</button>
					<button class="btn" on:click="{()=>{url=modelURL2}}">{modelURL2}</button>
				</div>
				<!-- <select class="input" bind:value={modelURL} on:change="{()=>{
					let {gltf} = useGltf(modelURL)
					}}">
					{#each data as obj}
						<option value="{obj.url}">{obj.name}</option>
					{/each}
				</select> -->
			</form>
		</div>
	</div>
</div>
