<script>
	import { AmbientLight, DirectionalLight, HemisphereLight, FogExp2 } from '@threlte/core';
	import { CollisionGroups, Debug } from '@threlte/rapier';
	import Door from '../Door.svelte';
	import Player from '../characters/PlayerV4.svelte';
	import Terrain from '../TerrainV2.svelte';
	import Background from '../SpaceBackground.svelte';

	let cam = undefined;

	export const gui = {
		getCamera() {
			return cam;
		}
	};
</script>

<Debug />

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />
<HemisphereLight groundColor={'#424a75'} skyColor={'#6a88b5'} intensity={0.7} />
<AmbientLight intensity={0.2} />

<Background />
<FogExp2 color={'#89b2eb'} density={0.01} />

<Player bind:cam position={{ x: 2, y: 15 }} />
<!--
	The ground needs to be on both group 15 which is the group
	to detect the groundedness of the player as well as on group
	0 which is the group that the player is actually physically
	interacting with.
 -->
<CollisionGroups groups={[0, 15]}>
	<Terrain
		on:ready={() => {
			console.log('hello world');
		}} />
</CollisionGroups>

<!--
	All physically interactive stuff should be on group 0
-->
<CollisionGroups groups={[0]}>
	<Door position={{ y: 4 }} />
</CollisionGroups>
