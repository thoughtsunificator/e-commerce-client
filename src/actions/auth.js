import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';

import {normalizeResponseErrors} from './utils';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = (token, refreshToken) => ({
	type: SET_AUTH_TOKEN,
	token,
	refreshToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
	type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
	type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
	type: AUTH_SUCCESS,
	currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
	type: AUTH_ERROR,
	error
});

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (token, refreshToken, dispatch) => {
	const decodedToken = jwtDecode(token);
	dispatch(setAuthToken(token, refreshToken));
	dispatch(authSuccess(decodedToken));
	localStorage.setItem("token", token)
	localStorage.setItem("refresh_token", refreshToken)
};

export const login = (email, password) => dispatch => {
	dispatch(authRequest());
	return (
		fetch(`/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		})
			// Reject any requests which don't return a 200 status, creating
			// errors which follow a consistent format
			.then(res => normalizeResponseErrors(res))
			.then(res => res.json())
			.then(({token, refresh_token}) => storeAuthInfo(token, refresh_token, dispatch))
			.catch(err => {
				const {code} = err;
				const message =
					code === 401
						? 'Incorrect email or password'
						: 'Unable to login, please try again';
				dispatch(authError(err));
				// Could not authenticate, so return a SubmissionError for Redux
				// Form
				return Promise.reject(
					new SubmissionError({
						_error: message
					})
				);
			})
	);
};

export const refreshAuthToken = () => (dispatch, getState) => {
	dispatch(authRequest());
	const token = getState().auth.refreshToken;
	return fetch(`/auth/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refresh_token: token
		})
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(({token, refresh_token}) => storeAuthInfo(token, refresh_token, dispatch))
		.catch(err => {
			// TODO
			console.error(err)
			// We couldn't get a refresh token because our current credentials
			// are invalid or expired, or something else went wrong, so clear
			// them and sign us out
			dispatch(authError(err));
			dispatch(clearAuth());
			localStorage.removeItem("token")
		});
};
