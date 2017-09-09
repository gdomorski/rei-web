import React, { Component } from 'react'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import {Link} from 'react-router'
import {defaultAction} from '../../../shared/actions/defaultAction.js'
import * as ActionTypes from '../../../shared/constants/actionTypes'
import Config from '../../../marketing/reinetwork/src/config.js'

class Nav extends Component {
  render() {
    return (
      <div className="hidden-print">
        <nav className="navbar navbar-inverse navbar-fixed-top abc-nav-active">
          <div className="fullcontainer-lg full-width nav-height" style={{padding:"0px"}}>
            <div className="row nav-height">
              <div className="col-md-2">
              <div className="navbar-header">
                <div className="navbar-brand logo-wrapper animated fadeIn">
                  <Link to="/">
                  <img 
                    className= "main-logo animated fadeIn"
                    src={`${Config.cdnHost}/brand/logo.png`}
                    style={{paddingTop: "10px", marginTop: "0px"}} 
                  />
                  </Link>
                </div>
              </div>
            </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}


export default connect (
  state => ({

  }),
  dispatch => ({
  })
)(Nav)
