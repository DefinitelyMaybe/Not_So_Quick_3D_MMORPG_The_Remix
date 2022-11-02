<script>
	import * as THREE from 'three';
	import { onDestroy } from 'svelte';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import {
		PerspectiveCamera,
		DirectionalLight,
		AmbientLight,
		Mesh,
		OrbitControls
	} from '@threlte/core';
	import { useGltfAnimations, GLTF, HTML } from '@threlte/extras';
	import { characters } from '../../data/models/mod.js';
	import { buttonIdle, buttonWalk, buttonRun } from './animationExample.js';

	const { name, url } = characters.sorceror;
	const { gltf, actions } = useGltfAnimations(({ actions }) => {
		console.log(actions);
		// Armature|mixamo.com|Layer0
		// Attack,
		// Dance,
		// Death,
		// Idle,
		// Run,
		// Walk
		// Either play your animations as soon as they are loaded
		actions[currentAction]?.play();
	});
	let currentAction = 'Idle';
	let cam;

	const unsubscribe1 = buttonIdle.subscribe(() => {
		transition('Idle');
	});
	const unsubscribe2 = buttonWalk.subscribe(() => {
		transition('Walk');
	});
	const unsubscribe3 = buttonRun.subscribe(() => {
		transition('Run');
	});

	function transition(newAction, duration = 1) {
		const action = $actions[currentAction];
		const nextAction = $actions[newAction];
		if (action === nextAction) return;
		// Function inspired by: https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html
		nextAction.enabled = true;

		if (action) {
			action.crossFadeTo(nextAction, duration, true);
		}

		// Not sure why I need this but the source code does not
		nextAction.play();
		currentAction = newAction;
	}

	function handleKeyDown(event) {
		switch (event.key) {
			case 'a':
				transition('Idle', 0.2);
				break;
			case 's':
				transition('Walk', 0.2);
				break;
			case 'd':
				transition('Run', 0.2);
				break;
			default:
				break;
		}
	}

	function handleKeyUp(event) {
		transition('Idle', 0.2);
	}

	onDestroy(() => {
		unsubscribe1();
		unsubscribe2();
		unsubscribe3();
	});
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<PerspectiveCamera bind:camera={cam} position={{ x: -0.9, y: 1.6, z: 1.5 }} fov={90}>
	<OrbitControls target={{ y: 1.2 }} />
</PerspectiveCamera>
<!-- maxPolarAngle={DEG2RAD * 80} -->

<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
<AmbientLight intensity={0.2} />

<HTML center transform distanceFactor={1} position={{ y: 2.2 }} lookAt={cam} occlude>
	<button class="btn">{name}</button>
</HTML>
<GLTF {url} bind:gltf={$gltf} />

<Mesh
	material={new THREE.MeshStandardMaterial({ side: THREE.DoubleSide })}
	geometry={new THREE.CircleBufferGeometry(3, 72)}
	rotation={{ x: DEG2RAD * -90 }} />
