<script lang="ts">
	import { GLTF, useGltfAnimations, HTML } from '@threlte/extras';
	import { characters } from '../../data/models/mod.js';
	import { Euler, Vector3 } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import { Group, useFrame, useThrelte, PerspectiveCamera, OrbitControls } from '@threlte/core';
	import { createEventDispatcher } from 'svelte';
	import { Collider, CollisionGroups, RigidBody } from '@threlte/rapier';

	export let cam = undefined;
	export let camRotation = [0, 0, 0];
	export let position = undefined;
	export let height = 1.7;
	export let radius = 0.3;
	export let speed = 6;
	export let jumpStrength = 4;
	export let playerCollisionGroups = [0];
	export let groundCollisionGroups = [15];

	let scene;

	$: if (scene) {
		const camEuler = cam.rotation.clone();
		camEuler.reorder('YXZ')
		camEuler.x = 0;
		camEuler.y += DEG2RAD * 180;
		scene.rotation.set(camEuler.x, camEuler.y, camEuler.z);
	}

	const { name, url } = characters.sorceror;
	const { gltf, actions } = useGltfAnimations(({ actions }) => {
		// actions could be: Armature|mixamo.com|Layer0, Attack, Dance, Death, Idle, Run, Walk
		actions[currentAction]?.play();
	});
	let currentAction = 'Idle';
	

	let forward = 0;
	let backward = 0;
	let left = 0;
	let right = 0;

	let rigidBody;

	const { renderer } = useThrelte();
	if (!renderer) throw new Error();

	const t = new Vector3();

	const dispatch = createEventDispatcher();

	let grounded = false;
	$: grounded ? dispatch('groundenter') : dispatch('groundexit');

	useFrame(() => {
		if (!rigidBody) return;
		// get direction
		const velVec = t.fromArray([right - left, 0, backward - forward]);
		// sort rotate and multiply by speed
		velVec.applyEuler(cam.rotation).multiplyScalar(speed);
		// don't override falling velocity
		const linVel = rigidBody.linvel();
		t.y = linVel.y;
		// finally set the velocities and wake up the body
		rigidBody.setLinvel(t, true);

		// when body position changes update position prop for camera
		const pos = rigidBody.translation();
		position = { x: pos.x, y: pos.y, z: pos.z };
	});

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

	/** @param {KeyboardEvent} e */
	function onKeyDown(e) {
		switch (e.key) {
			case 's':
				backward = 1;
				break;
			case 'w':
				forward = 1;
				break;
			case 'a':
				left = 1;
				break;
			case 'd':
				right = 1;
				break;
			case ' ':
				if (!rigidBody || !grounded) break;
				rigidBody.applyImpulse({ x: 0, y: jumpStrength, z: 0 }, true);
				break;
			default:
				break;
		}

		if (forward + backward + left + right > 0) {
			transitionTo('Run', 0.2);
		}
	}

	/** @param {KeyboardEvent} e */
	function onKeyUp(e) {
		switch (e.key) {
			case 's':
				backward = 0;
				break;
			case 'w':
				forward = 0;
				break;
			case 'a':
				left = 0;
				break;
			case 'd':
				right = 0;
				break;
			default:
				break;
		}

		if (forward + backward + left + right == 0) {
			transitionTo('Idle', 0.2);
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<!-- To detect the groundedness of the player, a collider on group 15 is used -->
<PerspectiveCamera bind:camera={cam} position={{ x: 6, y: 14, z: 5 }}>
	<OrbitControls
		target={position}
		enablePan={false}
		on:change={() => {
			// just to algin the visible character with the camera's direction
			if (!scene) return
			const camEuler = cam.rotation.clone();
			camEuler.reorder('YXZ')
			camEuler.x = 0;
			camEuler.y += DEG2RAD * 180;
			scene.rotation.set(camEuler.x, camEuler.y, camEuler.z);
		}} />
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
