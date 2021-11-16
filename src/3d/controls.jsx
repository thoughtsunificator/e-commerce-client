import { useContext } from 'react';
import { useThree, useFrame } from "react-three-fiber";
import lerp from 'lerp'

import { store } from '../store/GalaxyProvider';

export default function Controls() {
  const { state } = useContext(store);
  const { camera } = useThree()

  useFrame(() => {
    if (state.zoom === false) {
      camera.position.x = lerp(camera.position.x, -150, 0.08)
      camera.position.y = lerp(camera.position.y, 300, 0.08)
      camera.position.z = lerp(camera.position.z, 750, 0.08)
    }
    else {
      camera.position.x = lerp(camera.position.x, state.position.x, 0.08)
      camera.position.y = lerp(camera.position.y, state.position.y, 0.08)
      camera.position.z = lerp(camera.position.z, state.position.z, 0.08)
    }
    camera.updateProjectionMatrix()
  })

  return null
}