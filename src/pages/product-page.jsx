import React from 'react';
import { connect } from 'react-redux'
import Loading from '../components/loading'

class ProductPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: null,
            productdetail: []
        }
    }

    
    componentDidUpdate(prevProps) {
        if(this.props.match.params.product_id !== prevProps.match.params.product_id ) {
            this.fetchCart()
        }
    }


    componentDidMount(){
        this.fetchCart()
    }

    fetchCart() {
        this.setState({
            loading: true,
        })     
        fetch(`${process.env.REACT_APP_API_URL}/products?id=${this.props.match.params.product_id}`)
        .then(res => res.json())
        .then(res => {
             this.setState({
                 loading: false,
                productdetail: res["hydra:member"]
             })             
        })
    }

    addCart(product) {
        this.props.dispatch({
            type: "ADD_PRODUCT",
            product: {...product, quantity: 1}
        })
        // let cart = JSON.parse(localStorage.getItem("cart"))
        // if (Array.isArray(cart) === false) {
        //     cart = []
        // }
        // cart.push(product)
        //  // sauvegarde les modifications
        // localStorage.setItem("cart", JSON.stringify(cart))
        // fetch(`${process.env.REACT_APP_API_URL}/cart_items`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
        //         cart:"${process.env.REACT_APP_API_URL}/carts/2",
        //         quantity:1,
        //         product:`${process.env.REACT_APP_API_URL}/products/${productId}`})
        // })
    }

    render() {
        if(this.state.loading === false) {
            const Products = this.state.productdetail.map(product => (
                <div key={product.id}>
                <h2>{product.name}</h2>
                <h4>{product.description}</h4>
                <h4>{product.price}</h4>
                <h4>{product.images}</h4>
                <h4>{console.log(product.images)}</h4>
                <button className="addToCart" onClick={() => this.addCart(product)}>Ajouter au panier</button>
                </div>
            ))
            return <>
            {Products}
            </>
            ;
        } else {
            return (<Loading />)
        }
        
    }
}

export default connect()(ProductPage);