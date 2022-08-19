<script>
	import * as THREE from 'three';
	import { PerspectiveCamera, OrbitControls } from '@threlte/core';
	import { GLTF, useGltfAnimations, HTML } from '@threlte/extras';
	import { modelData } from '../../data/models/mod.js';
	import PlayerController from '../controllers/PlayerController.svelte';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';

	export let position = undefined;
	export let cam;
	let camRotation = [0, 0, 0];
	let scene;

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

<PerspectiveCamera bind:camera={cam} position={{ x: 6, y: 14, z: 5 }}>
	<OrbitControls
		target={position}
		on:change={() => {
			if (!scene) return;
			const camEuler = cam.rotation.clone();
			camEuler.reorder('YXZ');
			camEuler.x = 0;
			scene.rotation.set(camEuler.x, camEuler.y, camEuler.z);
			camRotation = [...camEuler];
		}} />
</PerspectiveCamera>

<!-- To detect the groundedness of the player, a collider on group 15 is used -->
<PlayerController
	{position}
	speed={6}
	radius={0.3}
	height={1.8}
	jumpStrength={2}
	playerCollisionGroups={[0]}
	groundCollisionGroups={[15]}>
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

<!-- if (params.firstPerson) {
	controls.maxPolarAngle = Math.PI;
	controls.minDistance = 1e-4;
	controls.maxDistance = 1e-4;
} else {
	controls.maxPolarAngle = Math.PI / 2;
	controls.minDistance = 1;
	controls.maxDistance = 20;
}

let playerIsOnGround = false;
let fwdPressed = false,
bkdPressed = false,
lftPressed = false,
rgtPressed = false;
let playerVelocity = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);
let tempVector = new THREE.Vector3();
let tempVector2 = new THREE.Vector3();
let tempBox = new THREE.Box3();
let tempMat = new THREE.Matrix4();
let tempSegment = new THREE.Line3();

function updatePlayer(delta) {
playerVelocity.y += playerIsOnGround ? 0 : delta * params.gravity;
player.position.addScaledVector(playerVelocity, delta);

// move the player
const angle = controls.getAzimuthalAngle();
if (fwdPressed) {
	tempVector.set(0, 0, -1).applyAxisAngle(upVector, angle);
	player.position.addScaledVector(tempVector, params.playerSpeed * delta);
}

if (bkdPressed) {
	tempVector.set(0, 0, 1).applyAxisAngle(upVector, angle);
	player.position.addScaledVector(tempVector, params.playerSpeed * delta);
}

if (lftPressed) {
	tempVector.set(-1, 0, 0).applyAxisAngle(upVector, angle);
	player.position.addScaledVector(tempVector, params.playerSpeed * delta);
}

if (rgtPressed) {
	tempVector.set(1, 0, 0).applyAxisAngle(upVector, angle);
	player.position.addScaledVector(tempVector, params.playerSpeed * delta);
}

player.updateMatrixWorld();

// adjust player position based on collisions
const capsuleInfo = player.capsuleInfo;
tempBox.makeEmpty();
tempMat.copy(collider.matrixWorld).invert();
tempSegment.copy(capsuleInfo.segment);

// get the position of the capsule in the local space of the collider
tempSegment.start.applyMatrix4(player.matrixWorld).applyMatrix4(tempMat);
tempSegment.end.applyMatrix4(player.matrixWorld).applyMatrix4(tempMat);

// get the axis aligned bounding box of the capsule
tempBox.expandByPoint(tempSegment.start);
tempBox.expandByPoint(tempSegment.end);

tempBox.min.addScalar(-capsuleInfo.radius);
tempBox.max.addScalar(capsuleInfo.radius);

collider.geometry.boundsTree.shapecast({
	intersectsBounds: (box) => box.intersectsBox(tempBox),

	intersectsTriangle: (tri) => {
		// check if the triangle is intersecting the capsule and adjust the
		// capsule position if it is.
		const triPoint = tempVector;
		const capsulePoint = tempVector2;

		const distance = tri.closestPointToSegment(tempSegment, triPoint, capsulePoint);
		if (distance < capsuleInfo.radius) {
			const depth = capsuleInfo.radius - distance;
			const direction = capsulePoint.sub(triPoint).normalize();

			tempSegment.start.addScaledVector(direction, depth);
			tempSegment.end.addScaledVector(direction, depth);
		}
	}
});

// get the adjusted position of the capsule collider in world space after checking
// triangle collisions and moving it. capsuleInfo.segment.start is assumed to be
// the origin of the player model.
const newPosition = tempVector;
newPosition.copy(tempSegment.start).applyMatrix4(collider.matrixWorld);

// check how much the collider was moved
const deltaVector = tempVector2;
deltaVector.subVectors(newPosition, player.position);

// if the player was primarily adjusted vertically we assume it's on something we should consider ground
playerIsOnGround = deltaVector.y > Math.abs(delta * playerVelocity.y * 0.25);

const offset = Math.max(0.0, deltaVector.length() - 1e-5);
deltaVector.normalize().multiplyScalar(offset);

// adjust the player model
player.position.add(deltaVector);

if (!playerIsOnGround) {
	deltaVector.normalize();
	playerVelocity.addScaledVector(deltaVector, -deltaVector.dot(playerVelocity));
} else {
	playerVelocity.set(0, 0, 0);
}

// adjust the camera
camera.position.sub(controls.target);
controls.target.copy(player.position);
camera.position.add(player.position);

// if the player has fallen too far below the level reset their position to the start
if (player.position.y < -25) {
	reset();
}
} -->
