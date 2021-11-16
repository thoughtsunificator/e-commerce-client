import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckoutProvider, {CheckoutContext} from "../store/CheckoutProvider"
import CustomerInformation from '../components/checkout-customer';
import Shipping from '../components/checkout-shipping'
import Total from '../components/checkout-total'

class CheckoutPage extends Component {

	static contextType = CheckoutContext

	render() {
		return (
			<CheckoutProvider>
				<CheckoutContext.Consumer>
					{value =>
						<div>
							{value.step === 0 && <CustomerInformation />}
							{value.step === 1 && <Shipping />}
							{value.step === 2 && <Total />}
							{value.step > 0 && <button onClick={() => value.previousStep()}>Previous</button>}
							
						</div>
					}
				</CheckoutContext.Consumer>
			</CheckoutProvider>
		)
	}
}

const mapStateToProps = state => ({
	user: state.auth.currentUser
});

export default connect(mapStateToProps)(CheckoutPage);

