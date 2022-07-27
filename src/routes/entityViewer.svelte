<script>
	import { CircleBufferGeometry, MeshStandardMaterial, BoxBufferGeometry, DoubleSide } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import {
    AmbientLight,
    Canvas,
    DirectionalLight,
    Group,
    HemisphereLight,
    Mesh,
    OrbitControls,
    PerspectiveCamera
  } from '@threlte/core'
	import { GLTF } from "@threlte/extras";
  import { spring } from 'svelte/motion'
	import { modelData } from "../data/models/mod.js";

	let modelURL = modelData.paladin.url

  const scale = spring(1)
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

    <!-- Cube -->
    <Group scale={$scale}>
			<GLTF url={modelURL} />
    </Group>

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
			<form class="pointer-events-auto">
				<button class="btn">hello world</button>
			</form>
		</div>
	</div>
</div>
<!-- <canvas class="absolute" id="game" />
<div class="absolute z-10">
	<Menu on:test={test} on:test2={test2} />
	<details class="flex flex-col" open>
		<summary>Helpers</summary>
		<ModelPicker
			bind:selected={model}
			on:change={() => {
				world.changeModel(model);
				obj = world.entities.get(0);
			}}
		/>
		<Inspector bind:object={obj} />
	</details>
</div> -->
