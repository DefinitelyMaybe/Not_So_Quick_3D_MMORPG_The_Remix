<script>
	import { AmbientLight, DirectionalLight, Mesh } from '@threlte/core';
	import { AutoColliders, CollisionGroups, Debug } from '@threlte/rapier';
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'
	import Door from '../Door.svelte';
	import Player from '../characters/PlayerV5.svelte';

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
	<AutoColliders shape={'cuboid'} position={{ y: -0.5 }}>
    <Mesh
      receiveShadow
      geometry={new BoxBufferGeometry(100, 1, 100)}
      material={new MeshStandardMaterial()}
    />
  </AutoColliders>
</CollisionGroups>

<!--
	All physically interactive stuff should be on group 0
-->
<CollisionGroups groups={[0]}>
	<Player bind:cam position={{ x: 2 }} />
	<Door />
</CollisionGroups>
