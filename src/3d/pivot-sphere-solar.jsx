import React, { useContext, useRef } from 'react';
import { useFrame } from "react-three-fiber";

import SolarSystem from './solar-system-mini'

import { store } from '../store/GalaxyProvider';

export default function PivotSphere() {
  const ref = useRef()
  const { state } = useContext(store);
  useFrame(() => (ref.current.rotation.z += 0.001))
  return (
    <group>
      <mesh ref={ref} position={[0, 1, 0]} rotation-x={Math.PI / 2}>
        <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
        {[
          { name: state.categories[0].name, category_id: state.categories[0].id, position: [400, 1, -50], "rotation-z": Math.PI / 2 },
          { name: state.categories[1].name, category_id: state.categories[1].id, position: [2, 300, -50], "rotation-z": Math.PI / 2 },
          { name: state.categories[2].name, category_id: state.categories[2].id, position: [30, -400, -50], "rotation-z": Math.PI / 3 },
          { name: state.categories[3].name, category_id: state.categories[3].id, position: [-300, 0, -50], "rotation-z": Math.PI / 4 },
          { name: state.categories[4].name, category_id: state.categories[4].id, position: [200, 200, -50], "rotation-z": Math.PI / 5 }
        ].map(planetProps => (<SolarSystem key={planetProps.category_id} {...planetProps} />))}
      </mesh>
    </group>
  )
}