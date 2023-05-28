// import React from 'react';
import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import IconCreditCardMaestro from "../images/SVG/credit-card-maestro.svg"
import IconCreditCardMaster from "../images/SVG/credit-card-master.svg"
import IconCreditCardAmerican from "../images/SVG/credit-card-american-express.svg"
import IconCreditCardVisa from "../images/SVG/credit-card-visa.svg"
import IconCreditCardPaypal from "../images/SVG/credit-card-paypal.svg"

class CartTotal extends React.Component {
    render() {
        let total = this.props.shopItems.map(item => item.price * item.quantity).reduce((accumulator, currentValue) => (accumulator + currentValue))
        return (
            <div>
                <h2>TOTAL</h2>
                <h3>Livraison :</h3>
                <h3>Total à payer : {total} &euro;</h3>
                <Link to= '/checkout'><button className="payment">Payment</button></Link>
                <div id="credit-cards">
                    <img src={IconCreditCardMaestro} alt="credit-card-maestro" style={{ width: '40px' }} className="credit-card"></img>
                    <img src={IconCreditCardMaster} alt="credit-card-master" style={{ width: '40px' }} className="credit-card"></img>
                    <img src={IconCreditCardAmerican} alt="credit-card-american-express" style={{ width: '50px' }} className="credit-card"></img>
                    <img src={IconCreditCardVisa} alt="credit-card-visa" style={{ width: '60px' }} className="credit-card"></img>
                    <img src={IconCreditCardPaypal} alt="credit-card-paypal" style={{ width: '70px' }} className="credit-card"></img>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

export default connect(mapStateToProps)(CartTotal);