import React, { createContext, Component } from "react";

export const CheckoutContext = createContext();

export default class CheckoutProvider extends Component {

	constructor(props) {
        super(props);
		this.state = {
            cartItems: JSON.parse(localStorage.getItem("cart")),
            step: 0,
            customer: {},
            shipping: {},
            nextStep: data => {
                if(this.state.step === 0) {
                    this.state.customer = data
                } if(this.state.step === 1) {
                    this.state.shipping = data
                }
                this.setState(prevState => ({
                    step: prevState.step + 1
                }))
            },
            previousStep: () => this.setState(prevState => ({
                step: prevState.step - 1
            })),
            setShippingData: data => this.setState(() => ({
                shipping: data
            })),
            setCustomerData: data => this.setState(() => ({
                customer: data
            })),
		}
    }

	render() {
        return (
            <CheckoutContext.Provider value={this.state}>
                {this.props.children}
            </CheckoutContext.Provider>
        );
	}
}