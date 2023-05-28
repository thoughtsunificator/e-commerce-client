import React, { useEffect, useContext } from 'react';
import { Canvas, extend} from "react-three-fiber";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import System from '../3d/solar-system'
import PivotSphere from '../3d/pivot-sphere-planets'
import Controls from '../3d/controls'

import { store, GalaxyProvider } from '../store/GalaxyProvider';
import Background from '../images/space.jpg';

extend({ OrbitControls, UnrealBloomPass, EffectComposer, RenderPass })

function Content(props) {
	const globalState = useContext(store);
	const { dispatch } = globalState;
	useEffect(() => {
		dispatch({ type: "loadingShops", history: props.history, category_id: props.category_id })
		fetch(`${process.env.REACT_APP_API_URL}/shops?category=${props.category_id}`)
			.then(res => res.json())
			.then(res => {
				dispatch({ type: "shopsLoaded", shops: res["hydra:member"] })
			})
	}, [])
	if (globalState.state.loadingShops === false) {
		return (
			<React.Fragment>
				<pointLight position={[1, 1, 1]} />
				<ambientLight intensity={0.2} />
				<System />
				<PivotSphere />
				<Controls />
			</React.Fragment>
		)
	} else {
		return null
	}
}

export default function (props) {
	return (
		<Canvas
			onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
			style={{ position: "absolute", top: 0, backgroundImage: `url(${Background})` }}
			camera={{ position: [-1000, 2000, 5000], fov: 50, near: 100, far: 5000 }}
			resize={{ scroll: false }}
		>
			<GalaxyProvider>
				<Content history={props.history} category_id={props.category_id} />
			</GalaxyProvider>
		</Canvas>
	)
}