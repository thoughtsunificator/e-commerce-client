import React, { Component } from 'react'
import SearchResult from './search-result'
import {SearchContext} from '../store/SearchProvider'

export default class SearchResults extends Component {

    static contextType = SearchContext

    render() {
        if(this.context.loading === false) {
            if (this.context.results.length >= 1) {
                return (
                    <div ref={this.mount} className="resultSearchBar">
                        {this.context.results.map(result =>
                            <SearchResult hideResults={this.props.hideResults} {...result} />
                        )}
                    </div>
                )
            } else {
                return null
            }
        }
        else {
            return null
        }
    }
}