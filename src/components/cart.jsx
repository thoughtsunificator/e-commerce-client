import React from 'react';
import CartItem from './cart-item';

import { connect } from 'react-redux';
import CartTotal from './cart-total';
import {Link} from 'react-router-dom';

class Cart extends React.Component {

    render() {
        // let error;
        // if (this.state.error) {
        //     error = (
        //         <div className="cart-error" aria-live="polite">
        //             {this.state.error}
        //         </div>
        //     );
        // }
        if (this.props.cart.length > 0) {
            
            let shopItems = this.props.cart.map((shopItem, index, array) => ({
                ...shopItem,
                quantity: array.filter(shopItemB => shopItem.id === shopItemB.id).length
            }))
            shopItems = shopItems.filter((shopItem, index, self) => index === self.findIndex(shopItemB => shopItem.id === shopItemB.id))
            return (
                <React.Fragment>

                    <div className="Cart-Left">
                        <h2>MON PANIER</h2>
                        <div className="items">
                            {shopItems.map(item => (
                                <CartItem product={{ ...item }} key={item.id} />
                            ))}
                        </div>
                    </div>
                    <div className="Cart-Right">
                        <CartTotal shopItems={shopItems}  />
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <div className="cart-error" aria-live="polite">
                    <h3>Ton panier est vide :/</h3>
                    <p>Gooo voyager sur nos principales planete afin de trouver ton bonheur :)</p>
                    <Link to="/"><button>C'est partit !</button></Link>
                </div>
            )

        }
    }
}

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(mapStateToProps)(Cart);
