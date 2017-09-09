import { combineReducers } from 'redux';
import config from '../../shared/reducers/config.js'
import products from '../../shared/reducers/products.js'
import formData from '../../shared/reducers/formData.js'
import reiCounts from '../../shared/reducers/reiCounts.js'

export default combineReducers({
	config,
	products,
	formData,
	reiCounts
})
