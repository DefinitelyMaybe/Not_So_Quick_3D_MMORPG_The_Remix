<script lang="ts">
	import {
		DirectionalLight,
		PerspectiveCamera,
		OrbitControls
	} from '@threlte/core'
	import { CollisionGroups, Debug } from '@threlte/rapier'
  import Terrain from '../Terrain.svelte'
	import Door from '../Door.svelte'
  import Player from "../Player.svelte";

  let mesh
  let cam

  export const gui = {
    getCamera(){
      return cam
    }
  }
</script>

<Debug />

<PerspectiveCamera bind:camera={cam} position={{ x: 72, y: 80, z: 81 }}>
	<OrbitControls />
</PerspectiveCamera>
<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

<!--
	The ground needs to be on both group 15 which is the group
	to detect the groundedness of the player as well as on group
	0 which is the group that the player is actually physically
	interacting with.
 -->
<CollisionGroups groups={[0, 15]}>
	<Terrain />
</CollisionGroups>

<!--
	All physically interactive stuff should be on group 0
-->
<CollisionGroups groups={[0]}>
	<!-- <Player bind:playerMesh={mesh} position={{ z: -3, y: 2 }} /> -->
	<Door />
</CollisionGroups>