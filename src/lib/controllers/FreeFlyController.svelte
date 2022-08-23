<script>
	import { Euler, Vector3 } from 'three';
	import { useFrame, useThrelte, PerspectiveCamera } from '@threlte/core';
	import { AutoColliders, RigidBody } from '@threlte/rapier';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import PointerLockControls from '../controls/PointerLockControlsRemix.svelte';

	export let cam = undefined;
	export let camRotation = [0, 0, 0];
	export let position = { x: 0, y: 0, z: 0 };
	$: console.log(position);

	export let speed = 1;
	export let jumpStrength = 3;

	let rigidBody;
	let lock;

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
	const lockControls = () => lock();

	renderer.domElement.addEventListener('click', lockControls);

	onDestroy(() => {
		renderer.domElement.removeEventListener('click', lockControls);
	});

	useFrame(() => {
		if (!rigidBody) return;
		// get direction
		const velVec = t.fromArray([keys.left - keys.right, 0, keys.forward - keys.backward]);
		// sort rotate and multiply by speed
		velVec.applyEuler(new Euler().fromArray(camRotation)).multiplyScalar(speed);
		// don't override falling velocity
		const linVel = rigidBody.linvel();
		t.y = linVel.y;
		// finally set the velocities and wake up the body
		rigidBody.setLinvel(t, true);

		// when body position changes update position prop for camera
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
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup|preventDefault={onKeyUp} />

<PerspectiveCamera bind:camera={cam} bind:position>
	<PointerLockControls bind:lock />
</PerspectiveCamera>

<RigidBody>
	<AutoColliders shape={'cuboid'}>
		<slot />
	</AutoColliders>
</RigidBody>
