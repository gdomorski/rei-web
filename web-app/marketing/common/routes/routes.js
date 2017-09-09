import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import axios from 'axios'
import _ from 'underscore'
import { Provider } from 'react-redux'
import reducer from '../combineReducers.js'

import { createStore, applyMiddleware, compose} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { defaultAction } from '../../../shared/actions/defaultAction'
import * as ActionTypes from '../../../shared/constants/actionTypes'

//Components
import App from '../containers/app.jsx'
import Main from '../containers/main.jsx'
import ProductPage from '../containers/productsPage.jsx'

let initialState = {}
let middleware = (process.env.NODE_ENV !== 'development') ? [ thunk ] : [ thunk, logger() ]
let devToolFunc = (process.env.NODE_ENV !== 'development') ? f => f :
                  ('function' === typeof window.devToolsExtension) ? window.devToolsExtension() : f => f


export const STORE = createStore (
    reducer, initialState,
    compose (
      applyMiddleware(...middleware),
      devToolFunc
    )
  )


export default configObj => (
  () => (
    <Provider store={STORE}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Main} />
          <Route path="/product/:product" component={ProductPage} />
        </Route>
      </Router>
    </Provider>
  )
)
