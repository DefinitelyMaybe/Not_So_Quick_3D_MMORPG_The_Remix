<script>
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { Euler, Camera, Vector3, MeshStandardMaterial, SphereBufferGeometry } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import { useThrelte, useParent, useFrame, Mesh } from '@threlte/core';

	export let position;
	export let minPolarAngle = 0;
	export let maxPolarAngle = Math.PI;

	export let pointerSpeed = 1.0;

	export let idealOffset = { x: -1, y: 2, z: -3 };
	export let idealLookAt = { x: 0, y: 1, z: 5 };

	const currentPosition = new Vector3();
	const currentLookAt = new Vector3();
	let tempVec = new Vector3(-1, 1, -3)

	let isLocked = false;

	const dispatch = createEventDispatcher();

	const tempEuler = new Euler(0, 0, 0);

	const _PI_2 = Math.PI / 2;

	const { renderer, invalidate } = useThrelte();
	const domElement = renderer.domElement;
	const camera = useParent();

	if (!renderer)
		throw new Error('Threlte Context missing: Is <PointerLockControls> a child of <Canvas>?');

	if (!($camera instanceof Camera)) {
		throw new Error('Parent missing: <PointerLockControls> need to be a child of a <Camera>');
	}

	const onChange = () => {
		invalidate('PointerLockcontrols: change event');
		dispatch('change');
	};

	export const lock = () => domElement.requestPointerLock();
	export const unlock = () => document.exitPointerLock();

	domElement.addEventListener('mousemove', onMouseMove);
	domElement.ownerDocument.addEventListener('pointerlockchange', onPointerlockChange);
	domElement.ownerDocument.addEventListener('pointerlockerror', onPointerlockError);

	onDestroy(() => {
		domElement.removeEventListener('mousemove', onMouseMove);
		domElement.ownerDocument.removeEventListener('pointerlockchange', onPointerlockChange);
		domElement.ownerDocument.removeEventListener('pointerlockerror', onPointerlockError);
	});

	useFrame((_, delta) => {
		// the object's position is bound to the prop
		if (position) {
			const offset = vectorFromObject(idealOffset);
			const lookAt = vectorFromObject(idealLookAt);

			const t = 1.0 - Math.pow(0.001, delta);

			currentPosition.lerp(offset, t);
			currentLookAt.lerp(lookAt, t);

			$camera.position.copy(currentPosition);
			$camera.lookAt(currentLookAt);

			tempVec.applyEuler(new Euler(0, DEG2RAD*10, 0))
		}
	});

	/**
	 * @param {MouseEvent} event
	 */
	function onMouseMove(event) {
		if (!isLocked) return;

		const { movementX, movementY } = event;

		tempEuler.setFromQuaternion($camera.quaternion);

		tempEuler.y += movementX * 0.002 * pointerSpeed;
		tempEuler.x += movementY * 0.002 * pointerSpeed;

		tempEuler.x = Math.max(_PI_2 - maxPolarAngle, Math.min(_PI_2 - minPolarAngle, tempEuler.x));

		// $camera.quaternion.setFromEuler(tempEuler);

		onChange();
	}

	function onPointerlockChange() {
		if (document.pointerLockElement === domElement) {
			dispatch('lock');
			isLocked = true;
		} else {
			dispatch('unlock');
			isLocked = false;
		}
	}

	function onPointerlockError() {
		console.error('THREE.PointerLockControls: Unable to use Pointer Lock API');
	}

	/**
	 * @param {{x:number,y:number,z:number}} vec
	 */
	export function vectorFromObject(vec) {
		const { x, y, z } = vec;
		const ideal = new Vector3(x, y, z);
		if (isLocked) {
			// console.log("locked");
			tempEuler.x = 0;
			tempEuler.y *= 0.1;
			tempEuler.z = 0;
			ideal.applyEuler(tempEuler);
			// console.log(position);
		}
		ideal.add(new Vector3(position.x, position.y, position.z));
		return ideal;
	}
</script>

<Mesh
	geometry={new SphereBufferGeometry(0.1, 5, 5)}
	material={new MeshStandardMaterial({ color: 'purple' })}
	position={tempVec} />
