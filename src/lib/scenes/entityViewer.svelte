<script>
  import { CircleBufferGeometry, MeshStandardMaterial, BoxBufferGeometry, DoubleSide } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import {
    AmbientLight,
    DirectionalLight,
    Mesh,
    OrbitControls,
    PerspectiveCamera,
		Object3DInstance,
		useLoader
  } from '@threlte/core'
	import { useGltf, useGltfAnimations, GLTF } from "@threlte/extras";
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

  export let url
  const loader = useLoader(OBJLoader, () => new OBJLoader())

  // Provide that store to the hook useGltfAnimations
  const {gltf} = useGltfAnimations(({ actions }) => {
    console.log(actions);
    actions['Idle']?.play()
  })
</script>

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
<GLTF url={url} bind:gltf={$gltf} />

<!-- Floor -->
<Mesh
  receiveShadow
  rotation={{ x: -90 * (Math.PI / 180) }}
  geometry={new CircleBufferGeometry(3, 72)}
  material={new MeshStandardMaterial({ side: DoubleSide, color: '#333333' })}
/>