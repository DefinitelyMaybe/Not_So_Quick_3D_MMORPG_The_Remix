<script>
  import { useLoader, useThrelte } from '@threlte/core';
  import { CubeTextureLoader } from "three";
  const loader = useLoader(CubeTextureLoader, () => new CubeTextureLoader())
	const texture = loader.load([
			'./terrain/space-posx.jpg',
			'./terrain/space-negx.jpg',
			'./terrain/space-posy.jpg',
			'./terrain/space-negy.jpg',
			'./terrain/space-posz.jpg',
			'./terrain/space-negz.jpg'
		]);
	const { scene } = useThrelte()
	scene.background = texture
</script>