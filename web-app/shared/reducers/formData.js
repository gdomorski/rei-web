import { UPDATE_PRODUCT_NAME, UPDATE_PRODUCT_TO_REMOVE, UPDATE_PRODUCT_SENTIMENT } from '../constants/actionTypes.js';

const initState = {
	productToRemove: "",
	productNameToAdd: "everything",
	productSentimentToChange: "positive"
}

export default (state = initState, action) => {
	switch(action.type) {
    case UPDATE_PRODUCT_NAME:
      return {
        ...state,
        productNameToAdd: action.payload
      }
    case UPDATE_PRODUCT_TO_REMOVE:
      return {
        ...state,
        productToRemove: action.payload
      }
    case UPDATE_PRODUCT_SENTIMENT:
      return {
        ...state,
        productSentimentToChange: action.payload
      }
    default:
      return state
	}
}
