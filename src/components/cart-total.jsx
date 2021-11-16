// import React from 'react';
import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

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
                    <img src="/SVG/credit-card-maestro.svg" alt="credit-card-maestro" style={{ width: '40px' }} className="credit-card"></img>
                    <img src="/SVG/credit-card-master.svg" alt="credit-card-master" style={{ width: '40px' }} className="credit-card"></img>
                    <img src="/SVG/credit-card-american-express.svg" alt="credit-card-american-express" style={{ width: '50px' }} className="credit-card"></img>
                    <img src="/SVG/credit-card-visa.svg" alt="credit-card-visa" style={{ width: '60px' }} className="credit-card"></img>
                    <img src="/SVG/credit-card-paypal.svg" alt="credit-card-paypal" style={{ width: '70px' }} className="credit-card"></img>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

export default connect(mapStateToProps)(CartTotal);