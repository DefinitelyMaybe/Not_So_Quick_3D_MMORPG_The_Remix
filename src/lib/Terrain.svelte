<script lang="ts">
	import { Mesh } from '@threlte/core'
	import { AutoColliders } from '@threlte/rapier'
	import { PlaneBufferGeometry, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils';
  import { createNoise2D } from "simplex-noise";

  const noise2D = createNoise2D()
  // noise(x, y)
  const geometry = new PlaneBufferGeometry(100, 100, 20, 20)

  const positionAttribute = geometry.getAttribute('position').array
  for (let i = 0; i < positionAttribute.length; i+=3) {
    // 0: -50, 1: 50, 2: 0
    const x = positionAttribute[i];
    const y = positionAttribute[i+1];
    positionAttribute[i+2] = noise2D(x, y) * 4
  }

  // for lighting
  geometry.computeVertexNormals()
</script>

<AutoColliders shape={'trimesh'} position={{ y: -0.5 }}>
	<Mesh
		receiveShadow
		geometry={geometry}
		material={new MeshStandardMaterial()}
    rotation={{ x: DEG2RAD * -90 }}
	/>
</AutoColliders>