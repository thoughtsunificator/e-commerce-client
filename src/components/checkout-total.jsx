import React from 'react';
import { connect } from 'react-redux';
import {CheckoutContext} from '../store/CheckoutProvider'


class Total extends React.Component {

    static contextType = CheckoutContext

    confirm(event) {   
        event.preventDefault()
        let orders = JSON.parse(localStorage.getItem("orders"))
        if(orders === null) {
            orders = []
        }
        orders.push(this.context)
        localStorage.setItem("orders", JSON.stringify(orders))
    }

    render() {
        let total = this.context.cartItems.map(item => item.price * item.quantity).reduce((accumulator, currentValue) => (accumulator + currentValue)) 
        return (
            <div>
                <form onSubmit={this.confirm.bind(this)}>
                     <h4>Detaille de Votre Command</h4>
                     <div>
                         Prenom: {this.context.customer.firstname}
                    </div>
                    <div>
                         Nom: {this.context.customer.lastname}
                    </div>
                    <div>
                        Address: {this.context.customer.address}
                    </div>
                    <div>
                        Type de livraison: {this.context.shipping.courier}
                    </div>
                    <div>
                    {/* <h1>{this.props.product.name}</h1> 
                    <span><strong>Prix unité: </strong> {this.props.product.price} &euro;</span><br></br>
                    <span><strong>Description : </strong>{this.props.product.description} </span>
                    <div><strong>x : </strong>{this.props.product.quantity} </div>
                    <div><strong>Prix total : </strong>{this.props.product.price*this.props.product.quantity} &euro;</div>   */}

                        <h4>Resume du Panier</h4>
                        {this.context.cartItems.map(cartItem => (
                            <div>
                                <span><strong>Nom de Produit : </strong> {cartItem.name}</span><br></br>
                                <span><strong>Prix unité: </strong> {cartItem.price} &euro;</span><br></br>
                                <div><strong>x : </strong>{cartItem.quantity}</div>
                            </div>
                        ))}
                        <div><strong>Prix total : </strong>{total} &euro;</div>
                    </div>
                    
                    <div className="button">
                        {/** MODIF */}
                        <button>Confirm and Pay</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps
});


export default connect(mapStateToProps)(Total);