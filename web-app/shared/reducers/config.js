import { LOAD_CONFIG } from '../constants/actionTypes.js';

export default (state = {}, action) => {
	switch(action.type) {
		case LOAD_CONFIG:
			return action.payload
		default:
			return state
	}
}
