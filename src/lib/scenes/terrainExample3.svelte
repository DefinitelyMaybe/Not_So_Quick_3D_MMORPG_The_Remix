<script lang="ts">
	import { AmbientLight, DirectionalLight } from '@threlte/core';
	import { CollisionGroups, Debug } from '@threlte/rapier';
	import Terrain from '../Terrain.svelte';
	import Door from '../Door.svelte';
	import Player from '../characters/PlayerV3.svelte';

	let cam = undefined;

	export const gui = {
		getCamera() {
			return cam;
		}
	};
</script>

<Debug />

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />
<AmbientLight intensity={0.2} />

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
	<Player bind:cam position={{ y: 9 }} />
	<Door position={{ y: 5 }} />
</CollisionGroups>
