<script>
	import { Euler, Vector3, SphereBufferGeometry, MeshStandardMaterial } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import { useFrame, useThrelte, PerspectiveCamera, Group, Mesh } from '@threlte/core';
	import { RigidBody, CollisionGroups, Collider } from '@threlte/rapier';
	import { GLTF, useGltfAnimations, HTML } from '@threlte/extras';
	import { modelData } from '../../data/models/mod.js';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import Controller from '../controls/ThirdPersonControls.svelte';

	export let cam = undefined;
	export let camRotation = [0, 0, 0];
	export let position = { x: 0, y: 0, z: 0 };
	export let playerCollisionGroups = [0];
	export let groundCollisionGroups = [15];
	export let radius = 0.3;
	export let height = 1.7;
	export let speed = 1;
	export let jumpStrength = 3;

	const { name, url } = modelData.paladin;
	const { gltf, actions } = useGltfAnimations(({ actions }) => {
		// socerer actions: Armature|mixamo.com|Layer0, Attack, Dance, Death, Idle, Run, Walk
		// paladin actions: Attack, Dance, Death, Idle, Run, Walk
		// zombie actions: Attack, Death, Idle, Walk
		actions[currentAction]?.play();
	});
	let scene;
	let currentAction = 'Idle';

	let movementKeysDown = 0;
	let forward = false;
	let backward = false;
	let left = false;
	let right = false;
	const keys = {
		forward: 0,
		backward: 0,
		left: 0,
		right: 0
	};

	const tempVec = new Vector3(1, 1, 3)
	tempVec.applyEuler(new Euler(0, 1, 0))
	console.log(tempVec);

	let rigidBody;

	let lock;

	// Set rotation in scene load
	$: if (camRotation && scene) {
		scene.rotation.set(camRotation[0], camRotation[1], camRotation[2]);
	}

	const { renderer } = useThrelte();
	if (!renderer) throw new Error();

	const temp = new Vector3();
	const dispatch = createEventDispatcher();

	let grounded = false;
	$: grounded ? dispatch('groundenter') : dispatch('groundexit');
	const lockControls = () => lock?.();

	renderer.domElement.addEventListener('click', lockControls);

	onDestroy(() => {
		renderer.domElement.removeEventListener('click', lockControls);
	});

	useFrame(() => {
		if (!rigidBody) return;
		// get direction
		const velVec = temp.fromArray([keys.left - keys.right, 0, keys.forward - keys.backward]);
		// sort rotate and multiply by speed
		velVec.applyEuler(new Euler().fromArray(camRotation)).multiplyScalar(speed);
		// don't override falling velocity
		const linVel = rigidBody.linvel();
		temp.y = linVel.y;
		// finally set the velocities and wake up the body
		rigidBody.setLinvel(temp, true);

		// when body position changes update camera position
		const pos = rigidBody.translation();
		position = { x: pos.x, y: pos.y, z: pos.z };
	});

	/**
	 * @param {KeyboardEvent} e
	 */
	function onKeyDown(e) {
		switch (e.key) {
			case 's':
				keys.backward = 1;
				break;
			case 'w':
				keys.forward = 1;
				break;
			case 'a':
				keys.left = 1;
				break;
			case 'd':
				keys.right = 1;
				break;
			case ' ':
				if (!rigidBody || !grounded) break;
				rigidBody.applyImpulse({ x: 0, y: jumpStrength, z: 0 }, true);
				break;
			default:
				break;
		}
	}

	/**
	 * @param {KeyboardEvent} e
	 */
	function onKeyUp(e) {
		switch (e.key) {
			case 's':
				keys.backward = 0;
				break;
			case 'w':
				keys.forward = 0;
				break;
			case 'a':
				keys.left = 0;
				break;
			case 'd':
				keys.right = 0;
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

<PerspectiveCamera bind:camera={cam} bind:position fov={90}>
	<Controller
		bind:position
		bind:lock
		on:change={() => {
			// console.log(cam.position.sub(new Vector3(position.x, position.y, position.z)));
			// const camEuler = cam.rotation.clone();
			// camEuler.reorder('YXZ');
			// camEuler.x = 0;
			// camEuler.y += DEG2RAD * 180;
			// camRotation = [...camEuler];
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
			<Mesh
				geometry={new SphereBufferGeometry(0.1, 5, 5)}
				material={new MeshStandardMaterial({ color: 'red' })}
				position={{ x: 0, y: 1, z: 5 }} />
			<Mesh
				geometry={new SphereBufferGeometry(0.1, 5, 5)}
				material={new MeshStandardMaterial({ color: 'green' })}
				position={{ x: -1, y: 2, z: -3 }} />
			<Mesh
				geometry={new SphereBufferGeometry(0.1, 5, 5)}
				material={new MeshStandardMaterial({ color: 'blue' })} />
			<Mesh
				geometry={new SphereBufferGeometry(0.1, 5, 5)}
				material={new MeshStandardMaterial({ color: 'black' })}
				position={{ x: 1, y: 1, z: 3 }} />
			<Mesh
				geometry={new SphereBufferGeometry(0.1, 5, 5)}
				material={new MeshStandardMaterial({ color: 'grey' })}
				position={tempVec} />
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
