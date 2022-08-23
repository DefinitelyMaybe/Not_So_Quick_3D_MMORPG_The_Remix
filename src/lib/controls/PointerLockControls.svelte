<script>
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { Camera } from 'three';
	import { PointerLockControls as ThreePointerLockControls } from './remixcontrols.js'//'three/examples/jsm/controls/PointerLockControls';
	import {
		useThrelte,
		DisposableObject,
		useParent
	} from '@threlte/core';

	// import { getThrelteUserData } from '../lib/getThrelteUserData'

	export let maxPolarAngle = 0;
	export let minPolarAngle = Math.PI;
	export let pointerSpeed = 1;
	export let dispose = undefined;

	const parent = useParent();

	const { renderer, invalidate } = useThrelte();

	if (!renderer)
		throw new Error('Threlte Context missing: Is <PointerLockControls> a child of <Canvas>?');

	if (!($parent instanceof Camera)) {
		throw new Error('Parent missing: <PointerLockControls> need to be a child of a <Camera>');
	}

	const dispatch = createEventDispatcher();

	const onChange = () => {
		invalidate('PointerLockcontrols: change event');
		dispatch('change');
	};
	const onStart = () => dispatch('start');
	const onEnd = () => dispatch('end');
	const controlsLocked = () => dispatch('lock');
	const controlsUnlocked = () => dispatch('unlock');

	export const controls = new ThreePointerLockControls($parent, renderer.domElement);
	// getThrelteUserData($parent).orbitControls = controls

	controls.addEventListener('change', onChange);
	controls.addEventListener('start', onStart);
	controls.addEventListener('end', onEnd);
	controls.addEventListener('lock', controlsLocked);
	controls.addEventListener('unlock', controlsUnlocked);

	onDestroy(() => {
		// if ($parent) {
		//   delete getThrelteUserData($parent).orbitControls
		// }
		controls.removeEventListener('change', onChange);
		controls.removeEventListener('start', onStart);
		controls.removeEventListener('end', onEnd);
		controls.removeEventListener('lock', controlsLocked);
		controls.removeEventListener('unlock', controlsUnlocked);
	});

	$: if (controls) {
		if (maxPolarAngle !== undefined) controls.maxPolarAngle = maxPolarAngle;
		if (minPolarAngle !== undefined) controls.minPolarAngle = minPolarAngle;
		if (pointerSpeed !== undefined) controls.pointerSpeed = pointerSpeed;
		invalidate('OrbitControls: props changed');
	}
</script>

<DisposableObject {dispose} object={controls} />
