<script>
	import { GLTF, useGltfAnimations, HTML } from '@threlte/extras';
	import { modelData } from '../../data/models/mod.js';
	import PlayerController from '../controllers/FollowObjectController.svelte';

	export let position = undefined;
	export let cam;

	let scene;
	let camRotation

	const { name, url } = modelData.sorceror;
	const { gltf, actions } = useGltfAnimations(({ actions }) => {
		// actions could be: Armature|mixamo.com|Layer0, Attack, Dance, Death, Idle, Run, Walk
		actions[currentAction]?.play();
	});
	let currentAction = 'Idle';
	let movementKeysDown = 0;
	let forward = false;
	let backward = false;
	let left = false;
	let right = false;

	$: if (camRotation && scene) {
		scene.rotation.set(camRotation[0], camRotation[1], camRotation[2]);
	}

	function transitionTo(newAction, duration = 1) {
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

	function handleKeyDown(e) {
		switch (e.key) {
			case 'w':
				if (movementKeysDown == 0) {
					transitionTo('Run', 0.2);
				}
				if (!forward) {
					movementKeysDown += 1;
					forward = true;
				}
				break;
			case 'a':
				if (movementKeysDown == 0) {
					transitionTo('Run', 0.2);
				}
				if (!left) {
					movementKeysDown += 1;
					left = true;
				}
				break;
			case 'd':
				if (movementKeysDown == 0) {
					transitionTo('Run', 0.2);
				}
				if (!right) {
					movementKeysDown += 1;
					right = true;
				}
				break;
			case 's':
				if (movementKeysDown == 0) {
					transitionTo('Run', 0.2);
				}
				if (!backward) {
					movementKeysDown += 1;
					backward = true;
				}
				break;
			default:
				break;
		}
	}

	function handleKeyUp(e) {
		switch (e.key) {
			case 'w':
				forward = false;
				movementKeysDown -= 1;
				break;
			case 's':
				backward = false;
				movementKeysDown -= 1;
				break;
			case 'a':
				left = false;
				movementKeysDown -= 1;
				break;
			case 'd':
				right = false;
				movementKeysDown -= 1;
				break;
			default:
				break;
		}

		if (movementKeysDown == 0) {
			transitionTo('Idle', 0.2);
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<!-- To detect the groundedness of the player, a collider on group 15 is used -->
<PlayerController
	{position}
	speed={6}
	radius={0.3}
	height={1.8}
	jumpStrength={4}
	playerCollisionGroups={[0]}
	groundCollisionGroups={[15]}
	bind:cam
	bind:camRotation>
	<GLTF {url} receiveShadow castShadow bind:scene bind:gltf={$gltf}>
		<HTML center transform distanceFactor={2} position={{ y: 2.2 }} lookAt={cam}>
			<button
				class="btn"
				on:click={() => {
					console.log(`${name} clicked`);
				}}>{name}</button>
		</HTML>
	</GLTF>
</PlayerController>
