<script lang="ts">
	import { Mesh, useLoader } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { PlaneBufferGeometry, MeshStandardMaterial, TextureLoader, RepeatWrapping } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';

	// noise(x, y)
	const width = 100;
	const height = 100;

	const geometry = new PlaneBufferGeometry(width, height, 10, 10);

	const loader = useLoader(TextureLoader, () => new TextureLoader());
	const grassDiffuse = loader.load('./terrain/grass1-albedo3-1024.png');
	grassDiffuse.wrapS = RepeatWrapping;
	grassDiffuse.wrapT = RepeatWrapping;
	grassDiffuse.repeat.set( 20, 20 );
	
	const grassNormal = loader.load('./terrain/grass1-normal-1024.jpg');
	grassNormal.wrapS = RepeatWrapping;
	grassNormal.wrapT = RepeatWrapping;
	grassNormal.repeat.set( 20, 20 );

	const material = new MeshStandardMaterial({
		color: "#3de037",
		map: grassDiffuse,
		normalMap: grassNormal
	});
</script>

<AutoColliders shape={'trimesh'}>
	<Mesh receiveShadow {geometry} {material} rotation={{ x: DEG2RAD * -90 }} />
</AutoColliders>
