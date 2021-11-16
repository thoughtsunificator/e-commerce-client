import React, { Component } from 'react'
import {CheckoutContext} from '../store/CheckoutProvider'

export default class Shipping extends Component {

    static contextType = CheckoutContext

    constructor(props, context) {
      super(props, context)
      this.state = {
        courier: "relais"
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
          <label>Frais de port</label>
          <div>
            <label for="relais">
              Relais
              <input
              id="relais"
              checked={this.state.courier === 'relais'} 
              onChange={this.handleChange.bind(this)}
              name="courier" 
              type="radio" 
              value="relais" />
            </label>

            <label for="standard">
              Standard
              <input 
              id="standard"
              checked={this.state.courier === 'standard'} 
              onChange={this.handleChange.bind(this)}
              name="courier" 
              type="radio" 
              value="standard" />
            </label>

            <label for="express">
              Express
              <input
              id="express"
              checked={this.state.courier === 'express'} 
              onChange={this.handleChange.bind(this)}
              name="courier" 
              type="radio" 
              value="express" />
            </label>
          </div>
          <button>Suivant</button>
        </form>
        )
    }
}
