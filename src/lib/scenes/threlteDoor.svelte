<script lang="ts">
	import {
		DirectionalLight,
		PerspectiveCamera,
		OrbitControls
	} from '@threlte/core'
	import { CollisionGroups, Debug } from '@threlte/rapier'
	import Door from '../Door.svelte'
	import Ground from '../Ground.svelte'
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
	<!-- <Player bind:playerMesh position={{ z: -3, y: 2 }} /> -->
	<Door />
</CollisionGroups>