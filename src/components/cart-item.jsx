import React from 'react';
import { connect } from 'react-redux';
import IconMinusSolid from "../images/SVG/minus-solid.svg"
import IconPlusSolid from "../images/SVG/plus-solid.svg"

class CartItem extends React.Component {

    render() {
        return (
            
             <div className="Product">
                <div style={{width: 100,textAlign: 'center'}}>
                    <img src='https://fakeimg.pl/100x100/282828/F2F4F3' alt={this.props.product.name} style={{borderRadius: 15}} />
                    <div className="itemsQuantity">
                        <img src={IconMinusSolid} onClick={() => {
                            this.props.dispatch({
                                type: "DELETE_PRODUCT",
                                product: this.props.product
                            })
                        }} className="icon minus" alt='#'/>
                        <p>{this.props.product.quantity}</p>
                        <img src={IconPlusSolid} onClick={() => {
                        this.props.dispatch({
                            type: "ADD_PRODUCT",
                            product: this.props.product
                        })}} className="icon add" alt='#'/>
                    </div>
                </div>

                <div className="Content">
                    <h1>{this.props.product.name}</h1> 
                    <p>{this.props.product.description}</p>
                    <p style={{fontSize: '0.9rem'}}><strong>Prix unité : </strong> {this.props.product.price} &euro;</p>
                    <p><strong>Sous total : </strong>{this.props.product.price*this.props.product.quantity} &euro;</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps
});

export default connect(mapStateToProps)(CartItem);