<script>
	import {
		CapsuleBufferGeometry,
		MeshStandardMaterial,
	} from 'three';
	import { Mesh } from '@threlte/core';
	import PlayerController from "../controllers/PlayerController.svelte";

	export let position = undefined;

	export let playerMesh;
</script>

<!-- To detect the groundedness of the player, a collider on group 15 is used -->
<PlayerController
	{position}
	speed={3}
	radius={0.3}
	height={1.8}
	jumpStrength={2}
	groundCollisionGroups={[15]}
	playerCollisionGroups={[0]}>
	<Mesh
		bind:mesh={playerMesh}
		position={{ y: 0.9 }}
		receiveShadow
		castShadow
		geometry={new CapsuleBufferGeometry(0.3, 1.8 - 0.3 * 2)}
		material={new MeshStandardMaterial()} />
</PlayerController>