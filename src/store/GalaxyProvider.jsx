import React, { createContext, useReducer } from 'react';
import * as THREE from "three";

const initialState = { hover: false, position: new THREE.Vector3(), zoom: false, loadingCategories: null, loadingShops: null, categories: [], shops: []};
const store = createContext(initialState);
const { Provider } = store;

const GalaxyProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    if(action.type === "hover") {
      state.hover = action.hover
      return state
    } else if (action.type === "position") {
      state.position = action.position
      return state
    } else if (action.type === "zoom") {
      state.zoom = action.zoom
      return state
    } else if (action.type === "history") {
      state.history = action.history
      return state
    } else if (action.type === "categoriesLoaded") {
      return {
        ...state,
        loadingCategories: false,
        categories: action.categories
      }
    } else if (action.type === "shopsLoaded") {
      return {
        ...state,
        loadingShops: false,
        shops: action.shops,
        category: action.category
      }
    } else if (action.type === "loadingCategories") {
      return {
        ...state,
        history: action.history,
        loadingCategories: true
      }
    } else if (action.type === "loadingShops") {
      return {
        ...state,
        history: action.history,
        category_id: action.category_id,
        loadingShops: true
      }
    } else {
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, GalaxyProvider }