<script>
	import { Euler, Vector3, SphereBufferGeometry, MeshStandardMaterial } from 'three';
	import {
		useFrame,
		useThrelte,
		PerspectiveCamera,
		Group,
		Mesh,
		OrbitControls
	} from '@threlte/core';
	import { RigidBody, CollisionGroups, Collider } from '@threlte/rapier';
	import { GLTF, useGltfAnimations, HTML } from '@threlte/extras';
	import { createEventDispatcher } from 'svelte';

	export let cam = undefined;
	export let position = { x: 0, y: 0, z: 0 };
	export let playerCollisionGroups = [0];
	export let groundCollisionGroups = [15];
	export let radius = 0.3;
	export let height = 1.7;
	export let speed = 1;
	export let jumpStrength = 3;

	const name = 'Xbot';
	const url = 'https://threejs.org/examples/models/gltf/Xbot.glb';

	const { gltf, actions } = useGltfAnimations(({ actions }) => {
		// socerer actions: Armature|mixamo.com|Layer0, Attack, Dance, Death, Idle, Run, Walk
		// paladin actions: Attack, Dance, Death, Idle, Run, Walk
		// zombie actions: Attack, Death, Idle, Walk
		// Xbot actions: agree, headShake, idle, run, sad_pose, sneak_pose, walk
		actions[currentAction]?.play();
	});
	let scene;
	let currentAction = 'idle';

	let rigidBody;

	const { renderer } = useThrelte();
	if (!renderer) throw new Error();

	const temp = new Vector3();
	const dispatch = createEventDispatcher();

	/** @param {KeyboardEvent} e */
	function onKeyDown(e) {
		switch (e.key) {
			case 'q':
				break;
			case 'w':
				break;
			case 'e':
				break;
			case 'r':
				break;
			default:
				break;
		}
	}

	/** @param {KeyboardEvent} e */
	function onKeyUp(e) {
		switch (e.key) {
			case 'q':
				break;
			case 'w':
				break;
			case 'e':
				break;
			case 'r':
				break;
			default:
				break;
		}
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
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup|preventDefault={onKeyUp} />

<PerspectiveCamera bind:camera={cam} position={{ x: 2, y: 5.8, z: 3.3 }} fov={60}>
	<OrbitControls screenSpacePanning={false} target={position} enableRotate={false} />
</PerspectiveCamera>

<RigidBody bind:rigidBody {position} enabledRotations={[false, false, false]}>
	<CollisionGroups groups={playerCollisionGroups}>
		<Collider shape={'capsule'} args={[height / 2 - radius, radius]} />
	</CollisionGroups>

	<CollisionGroups groups={groundCollisionGroups}>
		<Collider
			sensor
			on:sensorenter={() => (grounded = true)}
			on:sensorexit={() => (grounded = false)}
			shape={'ball'}
			args={[radius * 1.2]}
			position={{ y: -height / 2 + radius }} />
	</CollisionGroups>

	<Group position={{ y: -height / 2 }}>
		<GLTF {url} receiveShadow castShadow bind:scene bind:gltf={$gltf}>
			<Mesh
				geometry={new SphereBufferGeometry(0.1, 5, 5)}
				material={new MeshStandardMaterial({ color: 'red' })}
				position={{ x: 0, y: 1, z: 5 }} />
			<HTML center transform distanceFactor={2} position={{ y: 2.2 }} lookAt={cam}>
				<button
					class="btn"
					on:click={() => {
						console.log(`${name} clicked`);
					}}>{name}</button>
			</HTML>
		</GLTF>
	</Group>
</RigidBody>
