<script>
  import { Canvas } from "@threlte/core";
  import Scene from "$lib/scenes/repl-changeURL.svelte";
</script>

<div class="relative h-full w-full">
  <Canvas>
    <Scene/>
  </Canvas>
  <div class="absolute top-0 h-full w-full pointer-events-none">
		<div class="flex flex-col items-center h-full">
			<div class="pointer-events-auto">
				<a class="btn m-2" href="/">return</a>
			</div>
		</div>
	</div>
</div>