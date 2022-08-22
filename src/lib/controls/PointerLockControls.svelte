<script>
  import { createEventDispatcher, onDestroy } from 'svelte'
  import { Camera, Object3D } from 'three'
  import { PointerLockControls as ThreePointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
  import { useFrame, useThrelte, DisposableObject, HierarchicalObject, TransformableObject, useParent } from '@threlte/core'
  
  // import { getThrelteUserData } from '../lib/getThrelteUserData'

  export let maxPolarAngle = 0
  export let minPolarAngle = Math.PI
  export let rotateSpeed = 1
  export let dispose = undefined

  const parent = useParent()

  const { renderer, invalidate } = useThrelte()

  if (!renderer) throw new Error('Threlte Context missing: Is <PointerLockControls> a child of <Canvas>?')

  if (!($parent instanceof Camera)) {
    throw new Error('Parent missing: <PointerLockControls> need to be a child of a <Camera>')
  }

  const dispatch = createEventDispatcher()

  const onChange = () => {
    invalidate('Orbitcontrols: change event')
    dispatch('change')
  }
  const onStart = () => dispatch('start')
  const onEnd = () => dispatch('end')

  export const controls = new ThreePointerLockControls($parent, renderer.domElement)
  // getThrelteUserData($parent).orbitControls = controls

  controls.addEventListener('change', onChange)
  controls.addEventListener('start', onStart)
  controls.addEventListener('end', onEnd)

  onDestroy(() => {
    // if ($parent) {
    //   delete getThrelteUserData($parent).orbitControls
    // }
    controls.removeEventListener('change', onChange)
    controls.removeEventListener('start', onStart)
    controls.removeEventListener('end', onEnd)
  })

  $: {
    if (maxPolarAngle !== undefined) controls.maxPolarAngle = maxPolarAngle
    if (minPolarAngle !== undefined) controls.minPolarAngle = minPolarAngle
    // if (rotateSpeed !== undefined) controls.rotateSpeed = rotateSpeed
    invalidate('OrbitControls: props changed')
  }


</script>

<DisposableObject {dispose} object={controls} />