import React, { useRef, useMemo } from 'react';
import { useFrame } from "react-three-fiber";

import * as THREE from "three";

export default function SpiralGalaxy(props) {
  let t = props.t
  const ref = useRef()
  useFrame(() => (ref.current.rotation.y -= 0.001))
  const { iteration, floatSpread, distanceFactor, color } = props
  const positions = useMemo(() => {
    let positions = []
    for (let y = 0; y < iteration; y++) {
      t++
      for (let i = 0; i < 1000; i++) {
        const norm = i / 1000;
        const theta = norm * Math.PI + t + THREE.Math.randFloatSpread(floatSpread);
        const phi = THREE.Math.randFloatSpread(0.15)
        const distance = norm * distanceFactor;
        positions.push(distance * Math.sin(theta) * Math.cos(phi))
        positions.push(distance * Math.sin(theta) * Math.sin(phi))
        positions.push(distance * Math.cos(theta))
      }
    }
    return new Float32Array(positions)
  }, [iteration, floatSpread, t, distanceFactor])
  return (
    <points ref={ref}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" color={color} />
    </points>
  )
}
