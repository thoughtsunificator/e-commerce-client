import React, { Component } from 'react'
import SearchBar from './search-bar'
import SearchProvider from '../store/SearchProvider'
import SearchResults from './search-results'

export default class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showResults: false
        }
    }

    handleClickOutside(event) {
        if (this.mount && this.mount.contains(event.target) === true) {
            this.setState({
                showResults: true
            })
        } else {
            this.setState({
                showResults: false
            })
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside.bind(this));
        document.addEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    render() {
        return (
            <div ref={ref => this.mount = ref} id="containerSearch">
                <SearchProvider>
                    <SearchBar />
                    {this.state.showResults === true && <SearchResults hideResults={() => {
                        this.setState({
                            showResults: false
                        })
                    }} /> }
                </SearchProvider>
            </div>
        )
    }
}