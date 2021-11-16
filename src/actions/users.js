import {SubmissionError} from 'redux-form';

import {normalizeResponseErrors} from './utils';

export const registerUser = user => dispatch => {
	return fetch(`/api/users`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.catch(err => {
			const {reason, message, location} = err;
			if (reason === 'ValidationError') {
				// Convert ValidationErrors into SubmissionErrors for Redux Form
				return Promise.reject(
					new SubmissionError({
						[location]: message
					})
				);
			}
		});
};

export const registerCustomer = customer => (dispatch, getState) => {
	const authToken = getState().auth.token;
	return fetch(`/api/customers`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify(customer)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.catch(err => {
			const {reason, message, location} = err;
			if (reason === 'ValidationError') {
				// Convert ValidationErrors into SubmissionErrors for Redux Form
				return Promise.reject(
					new SubmissionError({
						[location]: message
					})
				);
			}
		});
};

export const registerCard = card => (dispatch, getState) => {
	const authToken = getState().auth.token;
	return fetch(`/api/customers`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify(card)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.catch(err => {
			const {reason, message, location} = err;
			if (reason === 'ValidationError') {
				// Convert ValidationErrors into SubmissionErrors for Redux Form
				return Promise.reject(
					new SubmissionError({
						[location]: message
					})
				);
			}
		});
};
