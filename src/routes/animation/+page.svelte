<script>
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/scenes/animationExample.svelte';
	import { buttonIdle, buttonWalk, buttonRun } from '$lib/scenes/animationExample.js';
</script>

<div class="relative h-full w-full">
	<Canvas>
		<Scene />
	</Canvas>
	<div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex flex-col items-center h-full">
			<div class="pointer-events-auto">
				<a class="btn m-2" href="/">return</a>
			</div>
		</div>
	</div>
	<div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex items-center h-full">
			<div class="flex flex-col">
				<div class="pointer-events-auto">
					<button
						class="btn m-2"
						on:click={() => {
							$buttonIdle = !$buttonIdle;
						}}>Idle</button>
					<button
						class="btn m-2"
						on:click={() => {
							$buttonWalk = !$buttonWalk;
						}}>Walk</button>
					<button
						class="btn m-2"
						on:click={() => {
							$buttonRun = !$buttonRun;
						}}>Run</button>
				</div>
				<span>Also you can press a, s, d for Idle, Walk and Run</span>
			</div>
		</div>
	</div>
</div>
