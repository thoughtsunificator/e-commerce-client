import {
		SET_AUTH_TOKEN,
		CLEAR_AUTH,
		AUTH_REQUEST,
		AUTH_SUCCESS,
		AUTH_ERROR
} from '../actions/auth';

const initialState = {
		token: null,
		currentUser: null,
		loading: false,
		error: null
};

export default function reducer(state = initialState, action) {
		if (action.type === SET_AUTH_TOKEN) {
				return Object.assign({}, state, {
						token: action.token,
						refreshToken: action.refreshToken
				});
		} else if (action.type === CLEAR_AUTH) {
				return Object.assign({}, state, {
						token: null,
						refreshToken: null,
						currentUser: null
				});
		} else if (action.type === AUTH_REQUEST) {
				return Object.assign({}, state, {
						loading: true,
						error: null
				});
		} else if (action.type === AUTH_SUCCESS) {
				return Object.assign({}, state, {
						loading: false,
						currentUser: action.currentUser
				});
		} else if (action.type === AUTH_ERROR) {
				return Object.assign({}, state, {
						loading: false,
						error: action.error
				});
		}
		return state;
}
