<script>
	import * as THREE from 'three';
	import { onDestroy, onMount } from 'svelte';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import {
		PerspectiveCamera,
		DirectionalLight,
		AmbientLight,
		Mesh,
		OrbitControls
	} from '@threlte/core';
	import { useGltfAnimations, GLTF, HTML } from '@threlte/extras';
	import { modelData } from '../../data/models/mod.js';
	import { state } from './animationExample.js';

	const { name, url } = modelData.sorceror;
	const { gltf, actions, mixer } = useGltfAnimations(({ actions }) => {
		console.log(actions);
		// Armature|mixamo.com|Layer0
		// Attack,
		// Dance,
		// Death,
		// Idle,
		// Run,
		// Walk
		// Either play your animations as soon as they are loaded
		actions['Idle']?.play();
	});
	let init = true;
	let cam

	const unsubscribe = state.subscribe(() => {
		// triggerAnimation();
		if (init) return;
		console.log('hello');
		prepareCrossFade('Idle', 'Run', 0.5);
	});

	// const triggerAnimation = () => {
	// 	if (!$gltf) return;

	// 	$actions['Idle']?.stop();
	// 	$actions['Attack']?.play();
	// 	const onLoopFinished = () => {
	// 		$mixer.removeEventListener('loop', onLoopFinished);
	// 		console.log('loop');
	// 		$actions['Attack']?.stop();
	// 		$actions['Idle']?.play();
	// 	};
	// 	$mixer.addEventListener('loop', onLoopFinished);
	// };

	function prepareCrossFade(startAction, endAction, defaultDuration) {
		// Switch default / custom crossfade duration (according to the user's choice)
		const duration = defaultDuration;

		// Make sure that we don't go on in singleStepMode, and that all actions are unpaused
		// singleStepMode = false;
		unPauseAllActions();

		// If the current action is 'idle' (duration 4 sec), execute the crossfade immediately;
		// else wait until the current action has finished its current loop
		if (startAction === 'Idle') {
			executeCrossFade(startAction, endAction, duration);
		} else {
			synchronizeCrossFade(startAction, endAction, duration);
		}
	}

	function synchronizeCrossFade(startAction, endAction, duration) {
		$mixer.addEventListener('loop', onLoopFinished);

		function onLoopFinished(event) {
			if (event.action === startAction) {
				$mixer.removeEventListener('loop', onLoopFinished);

				executeCrossFade(startAction, endAction, duration);
			}
		}
	}

	function executeCrossFade(startAction, endAction, duration) {
		// Not only the start action, but also the end action must get a weight of 1 before fading
		// (concerning the start action this is already guaranteed in this place)

		setWeight(endAction, 1);
		$actions[endAction].time = 0;

		// Crossfade with warping - you can also try without warping by setting the third parameter to false

		$actions[startAction].crossFadeTo($actions[endAction], duration, true);
	}

	// This function is needed, since animationAction.crossFadeTo() disables its start action and sets
	// the start action's timeScale to ((start animation's duration) / (end animation's duration))

	function setWeight(action, weight) {
		$actions[action].enabled = true;
		$actions[action].setEffectiveTimeScale(1);
		$actions[action].setEffectiveWeight(weight);
	}

	function unPauseAllActions() {
		for (const action in $actions) {
			if ($actions[action].paused) {
				console.log(action, 'was paused');
			}
			$actions[action].paused = false;
		}
	}

	onMount(() => {
		init = false;
	});
	onDestroy(unsubscribe);
</script>

<PerspectiveCamera bind:camera={cam} position={{ x: -0.9, y: 1.6, z: 1.5 }} fov={90}>
	<OrbitControls  target={{ y: 1.2 }} />
</PerspectiveCamera>
<!-- maxPolarAngle={DEG2RAD * 80} -->

<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
<AmbientLight intensity={0.2} />

<HTML center transform distanceFactor={1} position={{y:2.2}} lookAt={cam} occlude>
	<button class="btn">{name}</button>
</HTML>
<GLTF {url} bind:gltf={$gltf}/>

<Mesh
	material={new THREE.MeshStandardMaterial({side: THREE.DoubleSide})}
	geometry={new THREE.CircleBufferGeometry(3, 72)}
	rotation={{ x: DEG2RAD * -90 }} />
