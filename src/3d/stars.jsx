import React from 'react';

import SpiralGalaxy from './spiral-galaxy'

export default function Stars() {  // TODO
  return (
    <>
      <SpiralGalaxy iteration={8} t={0} floatSpread={0.5} distanceFactor={1000} color={0xffffff} />
      <SpiralGalaxy iteration={12} t={16} floatSpread={10} distanceFactor={1500} color="#51fcff" /> // TODO
      <SpiralGalaxy iteration={8} t={8} floatSpread={0.5} distanceFactor={500} color={0xffffff} />
    </>
  )
}