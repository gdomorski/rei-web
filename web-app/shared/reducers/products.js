import { LOAD_PRODUCTS } from '../constants/actionTypes.js';

export default (state = {}, action) => {
	switch(action.type) {
		case LOAD_PRODUCTS:
			return action.payload
		default:
			return state
	}
}
