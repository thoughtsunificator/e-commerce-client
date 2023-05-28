import React, { useEffect , useContext } from 'react';
import { Canvas } from "react-three-fiber";

import Galaxy from '../3d/galaxy'
import Stars from '../3d/stars'
import CameraController from '../3d/camera-controller'
import PivotSphere from '../3d/pivot-sphere-solar'

import { store, GalaxyProvider } from '../store/GalaxyProvider';
import Background from '../images/space.jpg';

function Content(props) {
	const globalState = useContext(store);
	const { dispatch } = globalState;
	useEffect(() => {
		dispatch({ type: "loadingCategories", history: props.history })
		fetch(`${process.env.REACT_APP_API_URL}/categories`)
			.then(res => res.json())
			.then(res => {
				dispatch({ type: "categoriesLoaded", categories: res["hydra:member"] })
			})
	}, [])
	if (globalState.state.loadingCategories === false) {
		return (
			<React.Fragment>
				<Galaxy />
				<Stars />
				<PivotSphere />
				<CameraController />
			</React.Fragment>
		)
	} else {
		return null
	}
}

export default function (props) {

	return (
		<Canvas
			style={{ position: "absolute", top: 0, backgroundColor: 'black', backgroundImage: `url(${Background})` }}
			// camera={{ position: [-200, 400, 1000], rotation: [-0.5, -0.2, -0.6], fov: 50, near: 100, far: 5000}}
			camera={{ position: [-1000, 2000, 5000], rotation: [-0.5, -0.2, -0.6], fov: 50, near: 10, far: 10000 }}
			resize={{ scroll: false }}
		>
			<GalaxyProvider>
				<Content history={props.history} />
			</GalaxyProvider>
		</Canvas>
	)
}