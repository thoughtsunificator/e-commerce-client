import { createStore, applyMiddleware, combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk'
import authReducer from './reducers/auth'
import cartReducer from './reducers/cart'
import protectedDataReducer from './reducers/protected-data'
import { setAuthToken, refreshAuthToken } from './actions/auth'

const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

const store = createStore(
		combineReducers({
				cart: cartReducer,
				form: formReducer,
				auth: authReducer,
				protectedData: protectedDataReducer
		}),
		{cart},
		applyMiddleware(thunk)
)

store.subscribe(state => {
	localStorage.setItem('cart', JSON.stringify(store.getState().cart))
})

// Hydrate the token from localStorage if it exist
const token = localStorage.getItem("token")
const refreshToken = localStorage.getItem("refresh_token")
if (token) {
	store.dispatch(setAuthToken(token, refreshToken))
	store.dispatch(refreshAuthToken())
}

export default store
