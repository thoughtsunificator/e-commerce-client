import React, { useContext, useRef } from 'react';
import { Dom } from "react-three-fiber";
import ImageFlare from "../images/flare.png"

import * as THREE from "three";

import { store } from '../store/GalaxyProvider';

export default function SolarSystem(props) {
  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  const ref = useRef()
  const texture = new THREE.TextureLoader().load(ImageFlare);

  const handleClick = (event) => {
    if(typeof event.preventDefault !== "undefined") {
      event.preventDefault(); //will stop the link href to call the blog page
    }
    state.position.setFromMatrixPosition(ref.current.matrixWorld);
    dispatch({ type: "zoom", zoom: true })

    setTimeout(function () {
      state.history.push('/category/' + props.category_id)
    }, 700); //will call the function after 2 secs.
  }

  return (
    <mesh
      ref={ref}
      {...props}
      onClick={handleClick} // TODO Show tooltip
    >
      <planeBufferGeometry attach="geometry" args={[70, 70, 30]} />
      <meshBasicMaterial side={THREE.BackSide} depthTest={false} transparent attach="material" map={texture} />
      <Dom>
        <div onClick={handleClick}
          style={{ cursor: 'pointer' }} className="content-planet-sdauhsdayudash">
          <a className="categories" >{props.name}</a>
        </div>
      </Dom>
    </mesh>
  )
}
