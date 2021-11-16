import React, { useRef } from 'react';
import { useFrame } from "react-three-fiber";

import * as THREE from "three";

export default function System() {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.002))
  const texture = new THREE.TextureLoader().load('/img/2k_sun.jpg');
  return (
    <mesh ref={ref} position={[0, 1, 0]} rotation-y={Math.PI / 2}>
      <sphereGeometry attach="geometry" args={[100, 100, 100]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  )
}