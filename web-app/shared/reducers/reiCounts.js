import { REI_COUNTS } from '../constants/actionTypes.js';

const initialState = { positive: 10, neutral: 10, negative: 10 }

export default (state = initialState, action) => {
	switch(action.type) {
    case REI_COUNTS:
      return action.payload
    default:
      return state
	}
}
