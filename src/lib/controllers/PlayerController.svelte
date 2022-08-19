<script>
	import { Vector2, Vector3 } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import { Group, useFrame, useThrelte } from '@threlte/core';
	import { createEventDispatcher } from 'svelte';
	import { Collider, CollisionGroups, RigidBody } from '@threlte/rapier';

	export let position = undefined;
	// export let camRotation;
	export let height = 1.7;
	export let radius = 0.3;
	export let speed = 1;
	export let jumpStrength = 3;
	export let playerCollisionGroups = [0];
	export let groundCollisionGroups = [15];

	let rigidBody;

	// $: console.log(camRotation)

	const { renderer } = useThrelte();
	if (!renderer) throw new Error();

	const keys = {
		up: false,
		down: false,
		left: false,
		right: false
	};

	const t = new Vector3();
	const t2 = new Vector2();

	const dispatch = createEventDispatcher();

	let grounded = false;
	$: grounded ? dispatch('groundenter') : dispatch('groundexit');

	useFrame(() => {
		if (!rigidBody) return;
		t.fromArray([0, 0, 0]);
		if (keys.down) t.x += 1;
		if (keys.up) t.x -= 1;
		if (keys.left) t.z += 1;
		if (keys.right) t.z -= 1;
		const l = t.length();

		const xzLength = t2.set(t.x, t.z).length();
		if (l > 0) t.divideScalar(l).multiplyScalar(speed);

		if (xzLength > 0) {
			rigidBody.resetForces(true);
			rigidBody.resetTorques(true);
		}
		const linVel = rigidBody.linvel();
		t.y = linVel.y;
		rigidBody.setLinvel(t, true);
	});

	/**
	 * @param {KeyboardEvent} e
	 */
	function onKeyDown(e) {
		switch (e.key) {
			case 's':
				keys.down = true;
				break;
			case 'w':
				keys.up = true;
				break;
			case 'a':
				keys.left = true;
				break;
			case 'd':
				keys.right = true;
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
				keys.down = false;
				break;
			case 'w':
				keys.up = false;
				break;
			case 'a':
				keys.left = false;
				break;
			case 'd':
				keys.right = false;
				break;
			default:
				break;
		}
	}
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup|preventDefault={onKeyUp} />

<RigidBody bind:rigidBody {position} enabledRotations={[false, true, false]} type={'dynamic'}>
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
