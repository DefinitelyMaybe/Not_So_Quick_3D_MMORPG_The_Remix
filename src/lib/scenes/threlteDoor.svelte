<script lang="ts">
	import { BoxBufferGeometry, MeshStandardMaterial } from "three";
	import {
		DirectionalLight,
		PerspectiveCamera,
		OrbitControls, Mesh
	} from '@threlte/core'
	import { CollisionGroups, Debug, AutoColliders } from '@threlte/rapier'
	import Door from '../Door.svelte'
	import Ground from '../Ground.svelte'
	import Player from "../characters/Player.svelte";

	let playerMesh
</script>

<PerspectiveCamera position={{ x: 10, y: 10, z: 10 }}>
	<OrbitControls />
</PerspectiveCamera>
<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

<Debug />

<!--
	The ground needs to be on both group 15 which is the group
	to detect the groundedness of the player as well as on group
	0 which is the group that the player is actually physically
	interacting with.
 -->
<CollisionGroups groups={[0, 15]}>
	<Ground />
</CollisionGroups>

<!--
	All physically interactive stuff should be on group 0
-->
<CollisionGroups groups={[0]}>
	<Player bind:playerMesh={playerMesh} position={{ z: -3, y: 2 }} />
	<Door />
	<!-- WALLS -->
	<AutoColliders shape={'cuboid'}>
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 1.275, x: 30 + 0.7 + 0.15 }}
			geometry={new BoxBufferGeometry(60, 2.55, 0.15)}
			material={new MeshStandardMaterial({
				transparent: true,
				opacity: 0.5,
				color: 0x333333
			})}
		/>
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 1.275, x: -30 - 0.7 - 0.15 }}
			geometry={new BoxBufferGeometry(60, 2.55, 0.15)}
			material={new MeshStandardMaterial({
				transparent: true,
				opacity: 0.5,
				color: 0x333333
			})}
		/>
	</AutoColliders>
</CollisionGroups>