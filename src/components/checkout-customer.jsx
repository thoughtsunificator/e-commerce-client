import React from 'react';
import {CheckoutContext} from '../store/CheckoutProvider'

export default class CustomerInformation extends React.Component {

    static contextType = CheckoutContext

    constructor(props, context) {
        super(props, context)
        this.state = {
            firstname: "",
            lastname: "",
            address: "",
            cardNumber: null,
            cvv: null,
            expiryMonth: null,
            expiryYear: null,
        }
    }


    postData(event) {   
        event.preventDefault()
        this.context.nextStep(this.state)
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.postData.bind(this)}>
                <div className="container">
                <div className="info">
                    {/** MODIF */}
                    <label for="firstname">Prenom</label>
                    <input value={this.state.firstname} onChange={this.handleChange.bind(this)} name="firstname" id="firstname" type="text"/>
                    <label for="lastname">Nom</label>
                    <input value={this.state.lastname} onChange={this.handleChange.bind(this)} name="lastname" id="lastname" type="text"/>
                    <label for="address">Adresse</label>
                    <input value={this.state.address} onChange={this.handleChange.bind(this)} name="address" id="address" type="text"/>
                    </div>
                    <div className="card__container">
                        <div className="card">
                            <div className="row credit">
                                <div className="left">


                                    <label for="cd">Debit/ Credit Card</label>



                                </div>
                                <div className="right">
                                    {/* <img src="http://i66.tinypic.com/5knfq8.png" alt="visa" />
                                    <img src="http://i67.tinypic.com/14y4p1.png" alt="mastercard" />
                                    <img src="http://i63.tinypic.com/1572ot1.png" alt="amex" />
                                    <img src="http://i64.tinypic.com/2i92k4p.png" alt="maestro" /> */}
                                </div>
                            </div>
                            <div className="row cardholder">
                                <div className="info">


                                    {/** MODIF */}
                                    <label for="cardholdername">Name</label>
                                    <input value={this.state.cardholdername} onChange={this.handleChange.bind(this)} placeholder="e.g. Richard Bovell" id="cardholdername" type="text" />

                                </div>
                            </div>
                            <div className="row number">
                                <div className="info">


                                    {/** MODIF */}
                                    <label for="cardnumber">Card number</label>
                                    <input value={this.state.cardNumber} onChange={this.handleChange.bind(this)} name="cardNumber" id="cardNumber" type="text" pattern="[0-9]{16,19}" maxlength="19" placeholder="8888-8888-8888-8888"
                                        />



                                </div>
                            </div>
                            <div className="row details">
                                <div className="left">
                                    <label for="expiry-date">Expiry</label>


                                    {/** MODIF */}
                                    <select value={this.state.expiryMonth} onChange={this.handleChange.bind(this)} name="expiryMonth" id="expiry-date">
                                        <option>MM</option>
                                        <option value="1">01</option>
                                        <option value="2">02</option>
                                        <option value="3">03</option>
                                        <option value="4">04</option>
                                        <option value="5">05</option>
                                        <option value="6">06</option>
                                        <option value="7">07</option>
                                        <option value="8">08</option>
                                        <option value="9">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                    <span>/</span>


                                    {/** MODIF */}
                                    <select value={this.state.expiryYear} onChange={this.handleChange.bind(this)} name="expiryYear" id="expiry-date">
                                        <option>YYYY</option>
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                        <option value="2029">2029</option>
                                        <option value="2030">2030</option>
                                    </select>





                                </div>
                                <div className="right">


                                    {/** MODIF */}
                                    <label for="cvv">CVC/CVV</label>
                                    <input value={this.state.cvv} onChange={this.handleChange.bind(this)} name="cvv" type="text" maxlength="4" placeholder="123" />




                                    <span data-balloon-length="medium" data-balloon="The 3 or 4-digit number on the back of your card." data-balloon-pos="up">i</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button">


                        {/** MODIF */}
                        <button>Suivant</button>

                        </div>
                    </div>
                </form>
        )

    }
}

