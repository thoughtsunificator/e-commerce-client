import React, { createContext, Component } from "react";

export const SearchContext = createContext();

export default class SearchProvider extends Component {

	constructor(props) {
		super(props);
		this.state = {
            loading: null,
            timeout: null,
            results: [],
            fetchResults: this.fetchResults.bind(this),
			setResults: results => this.setState({ results }),
			clearResults: () => this.setState({ results: [] })
		}
    }
     
    
    fetchResults(query) {
        this.setState({loading: true})
        clearTimeout(this.state.timeout)
        this.setState({
            timeout: setTimeout(() => {
                fetch(`${process.env.REACT_APP_API_URL}/products?name=${query}`)
                    .then(res => res.json())
                    .then(res => {
                        this.setState({
                            loading: false,
                            results: res["hydra:member"]
                        })
                    })
            }, 500)
        })
    }


	render() {
        return (
            <SearchContext.Provider value={this.state}>
                {this.props.children}
            </SearchContext.Provider>
        );
	}
}