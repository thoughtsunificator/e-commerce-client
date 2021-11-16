import React, { useContext, useRef } from 'react';
import { useFrame } from "react-three-fiber";

import { store } from '../store/GalaxyProvider';

import Planet from './planet'

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function PivotSphere(props) {
  const { state } = useContext(store);
  const ref = useRef()
  useFrame(() => {
    if (state.hover === false) { ref.current.rotation.z += 0.002 }
  })

  return (
    <group>
      <mesh ref={ref} position={[0, 1, 0]} rotation-x={Math.PI / 2}>
        <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
        {state.shops.map(shop => (
          <Planet key={shop.id} shop_id={shop.id} shop_name={shop.name} position={[randomIntFromInterval(400, -400), randomIntFromInterval(400, -400), 0]} {...props} />
        ))}
      </mesh>
    </group>
  )
}