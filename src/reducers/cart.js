export default function reducer(state = [], action) {
		if (action.type === "ADD_PRODUCT") {
						return [
								...state,
								action.product
						]
		} else if (action.type === "DELETE_PRODUCT") {
				let index = state.findIndex(product => product.id === action.product.id)
				state.splice(index, 1)
				return [
						...state
				]
		}
		return state;
}
