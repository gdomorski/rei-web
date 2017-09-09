import React, { Component, cloneElement } from 'react';
import NavBar from './nav.jsx'
import { connect } from 'react-redux'
import * as ActionTypes from '../../../shared/constants/actionTypes'
// import LoadingSpinner from '../../../shared/components/popups/loading.jsx'

class App extends Component {

    render(){
      return (
        <div style={{width: "100%", height: "100%"}}>
          {/* <LoadingSpinner showLoading={false} /> */}
          <NavBar
            location={this.props.location}
            config={this.props.config}
          />
          <div style={{minHeight: "700px"}}>
            {cloneElement(this.props.children, { location })}
          </div>
        </div>
    )
  }
}


export default connect(
  state => ({
    config: state.config,
  }),
  dispatch => ({

  })
)(App)
