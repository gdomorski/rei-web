import React from 'react'
import {Link} from 'react-router'

export default props => (
  <div className={props.size}>
    <Link to={props.path}><div className="cat-img"	style={{backgroundImage: props.bgImg, height: "420px"}}><div className="main-img-panel-header">{props.name.toUpperCase()}</div></div></Link>
  </div>
)
