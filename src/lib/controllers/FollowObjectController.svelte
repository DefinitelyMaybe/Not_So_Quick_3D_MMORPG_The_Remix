<script>
	import { Euler, Vector3 } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import { Group, useFrame, useThrelte, PerspectiveCamera, OrbitControls } from '@threlte/core';
	import { createEventDispatcher } from 'svelte';
	import { Collider, CollisionGroups, RigidBody } from '@threlte/rapier';

	export let cam = undefined
	export let camRotation = [0, 0, 0];
	export let position = undefined;
	export let height = 1.7;
	export let radius = 0.3;
	export let speed = 1;
	export let jumpStrength = 3;
	export let playerCollisionGroups = [0];
	export let groundCollisionGroups = [15];
	
	let rigidBody;
	
	export let minDistance = 5
	export let maxDistance = 10
	let followDistance = 10

	const { renderer } = useThrelte();
	if (!renderer) throw new Error();

	const keys = {
		forward: 0,
		backward: 0,
		left: 0,
		right: 0
	};

	const t = new Vector3();

	const dispatch = createEventDispatcher();

	let grounded = false;
	$: grounded ? dispatch('groundenter') : dispatch('groundexit');

	useFrame(() => {
		if (!rigidBody) return;
		// get direction
		const velVec = t.fromArray([keys.left - keys.right, 0, keys.forward - keys.backward]);
		// sort rotate and multiply by speed
		velVec.applyEuler(new Euler().fromArray(camRotation))
			.multiplyScalar(speed);
		// don't override falling velocity
		const linVel = rigidBody.linvel();
		t.y = linVel.y;
		// finally set the velocities and wake up the body
		rigidBody.setLinvel(t, true);

		// when body position changes update position prop for camera
		const pos = rigidBody.translation();
		position = {x:pos.x, y:pos.y, z:pos.z}
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
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup|preventDefault={onKeyUp} />

<PerspectiveCamera bind:camera={cam} position={{ x: 6, y: 14, z: 5 }}>
	<OrbitControls
		target={position}
		{minDistance}
		{maxDistance}
		on:change={() => {
			const camEuler = cam.rotation.clone();
			camEuler.reorder('YXZ');
			camEuler.x = 0;
			camEuler.y += DEG2RAD * 180
			camRotation = [...camEuler];
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
		<slot />
	</Group>
</RigidBody>
