<script>
	import {
		OrthographicCamera,
		OrbitControls,
		DirectionalLight,
		AmbientLight,
		Mesh
	} from '@threlte/core';
	import { Debug, RigidBody, AutoColliders, Collider } from '@threlte/rapier';
	import * as THREE from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
</script>

<Debug />

<OrthographicCamera zoom={40} position={{ z: 1 }}>
	<OrbitControls mouseButtons={{ LEFT: THREE.MOUSE.RIGHT }} />
</OrthographicCamera>

<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
<AmbientLight intensity={0.2} />

<AutoColliders shape={'cuboid'}>
	<Mesh
		material={new THREE.MeshStandardMaterial({ color: 'red' })}
		geometry={new THREE.BoxBufferGeometry(100, 1, 1)}
		rotation={{ x: DEG2RAD * -90 }} />
</AutoColliders>

<RigidBody>
	<AutoColliders shape={'cuboid'}>
		<Mesh
			material={new THREE.MeshStandardMaterial()}
			geometry={new THREE.BoxBufferGeometry(1, 1, 1)}
			position={{ y: 2 }} />
	</AutoColliders>
</RigidBody>
