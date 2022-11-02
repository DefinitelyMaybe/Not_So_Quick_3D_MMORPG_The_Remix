<script>
	import { Canvas } from '@threlte/core';
  import { HTML } from "@threlte/extras";
	import { World } from "@threlte/rapier";
	import Scene from '$lib/scenes/Example7.svelte';

  let gui
</script>

<div class="relative h-full w-full overflow-hidden">
	<Canvas>
    <World>
      <Scene bind:gui/>
      <HTML transform center slot="fallback">
				<p>Your browser doesn't support WASM.</p>
			</HTML>
    </World>
	</Canvas>
	<div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex flex-col items-center h-full">
			<div class="pointer-events-auto">
				<a class="btn m-2" href="/">return</a>
			</div>
		</div>
	</div>
  <div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex h-full">
			<div class="pointer-events-auto">
				<button class="btn m-2" on:click={()=>{
          const cam = gui.getCamera()
          console.log(cam);
        }}>test</button>
				<button class="btn m-2" on:click={()=>{
          console.log("hello world");
        }}>test2</button>
			</div>
		</div>
	</div>
</div>
