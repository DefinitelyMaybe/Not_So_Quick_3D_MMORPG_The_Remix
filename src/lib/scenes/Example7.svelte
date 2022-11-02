<script>
	import {
		PerspectiveCamera,
		OrbitControls,
		DirectionalLight,
		AmbientLight,
		Mesh
	} from '@threlte/core';
	import { HTML, Float } from '@threlte/extras';
	import * as THREE from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
</script>

<PerspectiveCamera position={{ x: -2, y: 3, z: 2 }} fov={80}>
	<OrbitControls target={{ y: 1.2 }} />
</PerspectiveCamera>
<!-- maxPolarAngle={DEG2RAD * 80} -->

<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
<AmbientLight intensity={0.2} />

<Float>
	<Mesh
		material={new THREE.MeshStandardMaterial({ color: 'white', side: THREE.DoubleSide })}
		geometry={new THREE.BoxBufferGeometry(1, 0.02, 2)}
		position={{ y: 2 }}
		rotation={{ x: DEG2RAD * -90 }}>
		<HTML transform rotation={{ x: DEG2RAD * 90 }} scale={0.1}>
			<div class="el1">
				<div class="el2">
					<button
						on:click={() => {
							console.log('hello test');
						}}
						class="button1">
						test
					</button>
				</div>
			</div>
		</HTML>
	</Mesh>
</Float>

<Mesh
	material={new THREE.MeshStandardMaterial({ side: THREE.DoubleSide })}
	geometry={new THREE.CircleBufferGeometry(3, 72)}
	rotation={{ x: DEG2RAD * -90 }} />

<style>
	.el1 {
		width: 375px;
		height: 667px;
		background-color: rgb(209 213 219);
		/* @apply w-[375px] h-[667px] bg-gray-300 */
	}

	.el2 {
		display: flex;
		justify-content: center;
		/* @apply flex justify-center */
	}
	.button1 {
		background-color: rgb(156 163 175);
		color: rgb(0 0 0);
		border-radius: 0.5rem;
		padding: 0.25rem;
		margin: 0.25rem;
		/* @apply bg-gray-400 text-black rounded-lg p-1 m-1 */
	}
</style>