import React, { createElement } from 'react';
import { render } from 'react-dom';
import Config from './config';
import {LOAD_CONFIG } from '../../../shared/constants/actionTypes'
import { defaultAction } from '../../../shared/actions/defaultAction.js';
import ROUTES, {STORE} from  '../../common/routes/routes.js';
import SASS from './styles/all.scss'

render(createElement(ROUTES(Config)), document.getElementById('app'))
STORE.dispatch(defaultAction(LOAD_CONFIG, Config))

const fetchReiCounts = async store => {
  const res = await fetch(`${Config.apiHost}/counter`)
  const payload = await res.json()
  store.dispatch({ type: 'REI_COUNTS', payload })
}

fetchReiCounts(STORE)
