import React, { Component } from 'react'
import {SearchContext} from '../store/SearchProvider'

export default class SearchBar extends Component {

    static contextType = SearchContext

    handleChange(event) {
        let target = event.target
        if(target.value.trim().length >= 1) {
            this.context.fetchResults(target.value)
        } else {
            this.context.clearResults()
        }
    }

    render() {
       return (
            <input id="searchBar" type="text" placeholder={"Search..."}  onChange={this.handleChange.bind(this)} />
       )
    }
}