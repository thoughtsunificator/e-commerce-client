import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import {Link} from 'react-router-dom';


export class LoginForm extends React.Component {
	onSubmit(values) {
		return this.props.dispatch(login(values.email, values.password));
	}

	render() {
		let error;
		if (this.props.error) {
			error = (
				<div className="form-error" aria-live="polite">
					{this.props.error}
				</div>
			);
		}
		return (
			<form
				className="login-form"
				onSubmit={this.props.handleSubmit(values =>
					this.onSubmit(values)
				)}>
				<h2>Login for Univershop</h2>
				{error}
				<Field
					component={Input}
					type="text"
					name="email"
					placeholder="Email"
					id="email"
					validate={[required, nonEmpty]}
				/>
				<Field
					component={Input}
					type="password"
					name="password"
					placeholder="Password"
					id="password"
					validate={[required, nonEmpty]}
				/>
				<div className="form-bottom">
					<button disabled={this.props.pristine || this.props.submitting}>
						Log in
					</button>
					<Link to="/register">Pas encore inscrit ?</Link>
				</div>
			</form>
			
		);
	}
}

export default reduxForm({
	form: 'login',
	onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'email'))
})(LoginForm);
