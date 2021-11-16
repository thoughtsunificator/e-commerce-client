import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import '../index.css';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';

const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, email, password } = values;
        const user = {username, email, password };
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(email, password)));
    }

    render() {
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <h2>Register for Univershop</h2>
                <Field
                    component={Input}
                    type="text"
                    placeholder="Username"
                    name="username"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <Field
                    component={Input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <Field
                    component={Input}
                    type="password"
                    placeholder="Password"
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <Field
                    component={Input}
                    type="password"
                    placeholder="Confirm password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
