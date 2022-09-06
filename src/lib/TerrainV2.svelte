<script lang="ts">
	import { Mesh, useLoader } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { PlaneBufferGeometry, MeshStandardMaterial, TextureLoader, RepeatWrapping } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import { createEventDispatcher, onMount } from 'svelte';
	import { createNoise2D } from 'simplex-noise';

	const dispatch = createEventDispatcher();

	const noise2D = createNoise2D();
	const persistence = 0;
	const octaves = 2;
	const lacunarity = 2;
	const scale = 100;

	// noise(x, y)
	const width = 100;
	const height = 100;

	const geometry = new PlaneBufferGeometry(width, height, 10, 10);
	const G = Math.pow(2, -persistence);
	const relativeScale = Math.pow(width, -scale / 100);

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

	const positionAttribute = geometry.getAttribute('position').array;
	for (let i = 0; i < positionAttribute.length; i += 3) {
		// 0: -50, 1: 50, 2: 0
		const x = positionAttribute[i];
		const y = positionAttribute[i + 1];

		const sX = x * relativeScale;
		const sY = y * relativeScale;

		let total = 0;
		let amplitude = 1;
		let frequency = 1;
		let normalization = 0;

		for (let j = 0; j < octaves; j++) {
			// Restrict the octave between [0, 1]
			const octave = (noise2D(sX * frequency, sY * frequency) + 1) / 2;

			total += octave * amplitude;
			normalization += amplitude;
			amplitude *= G;
			frequency *= lacunarity;
		}

		total /= normalization;

		positionAttribute[i + 2] = total * 10;
	}

	// for lighting
	geometry.computeVertexNormals();

	// TODO-DefinitelyMaybe: ViewportAware ness for terrain chunks
	// Try only render chunks that are within the viewport?
	onMount(() => dispatch('ready'));
</script>

<AutoColliders shape={'trimesh'}>
	<Mesh receiveShadow {geometry} {material} rotation={{ x: DEG2RAD * -90 }} />
</AutoColliders>
