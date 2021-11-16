import React from 'react';
import { CheckoutContext } from '../store/CheckoutProvider'
import requiresLogin from '../components/requires-login';
import { connect } from 'react-redux';


class OrdersPage extends React.Component {

    static contextType = CheckoutContext

    render() {

        let orders = JSON.parse(localStorage.getItem("orders"))
        if (orders === null) {
            orders = []
        }
        return (
            <div>
                <h2>Detail de commande :</h2>
                {orders.map(order => (
                    <div>
                        {order.cartItems.map(cartItem => (
                            <div>
                                <h4>Nom produit : {cartItem.name}</h4>
                                <h4>Description : {cartItem.description}</h4>
                                <h4>Prix : {cartItem.price}  &euro;</h4>
                                <h4>{cartItem.images}</h4>
                                <h4>Quantite : {cartItem.quantity}</h4>
                            </div>
                        ))}
                        <h2>Shipping :</h2>
                        <h4>Service postal : {order.shipping.shippingType}</h4>
                        <h2>Customer :</h2>
                        <h4>Nom : {order.customer.firstname}</h4>
                        <h4>Prenom : {order.customer.lastname}</h4>
                        <h4>Addres : {order.customer.address}</h4>
                    </div>
                ))};
            </div>
        )
    }
}


const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default requiresLogin()(connect(mapStateToProps)(OrdersPage));