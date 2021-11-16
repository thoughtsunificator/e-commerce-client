import { useContext } from 'react';
import { useThree, useFrame } from "react-three-fiber";
import lerp from 'lerp'

import { store } from '../store/GalaxyProvider';

export default function CameraController() {
  const { state } = useContext(store);
  const { camera } = useThree()
  useFrame(() => {
    if (state.zoom === false) {
      camera.position.x = lerp(camera.position.x, -200, 0.08)
      camera.position.y = lerp(camera.position.y, 400, 0.08)
      camera.position.z = lerp(camera.position.z, 1000, 0.08)
    }
    else {
      camera.position.x = lerp(camera.position.x, state.position.x, 0.08)
      camera.position.y = lerp(camera.position.y, state.position.y, 0.08)
      camera.position.z = lerp(camera.position.z, state.position.z, 0.08)
    }
    camera.updateProjectionMatrix()
  })

  // Zooms the cam from 100 to 7. Since it's inside the Suspense boundary, it will
  // start doing that once everything's loaded/processed :]

  return null
}