import React from 'react'

export default props => (
  <div className={`main-img-panel ${props.catClass}`} onClick={() => props.changeRoute(`/buy-gift-cards/${props.catClass}`)}>
    <div className="main-img-panel-header">{props.category}</div>
  </div>
)
