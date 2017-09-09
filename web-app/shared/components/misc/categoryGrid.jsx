import React from 'react'
import EachProduct from './eachCategory.jsx'
import Config from '../../../marketing/reinetwork/src/config.js'

const url = filepath => `url("${Config.cdnHost}/${filepath}.jpg")`

export default () => (
  <div className="container">
    <div className="row">
      <EachProduct
        index={1}
        size="col-md-6"
        path='/product/backpacks'
        bgImg={url('backpacks')}
        name="BACKPACKS"
      />
      <EachProduct
        index={2}
        size="col-md-6"
        path='/product/tents'
        bgImg={url('tents')}
        name="TENTS"
      />
    </div>
    <div className="row cat-spacing">
      <EachProduct
        index={3}
        size="col-md-6"
        path='/product/snowboards'
        bgImg={url('snowboards')}
        name="SNOWBOARDS"
      />
      <EachProduct
        index={4}
        size="col-md-6"
        path='/product/running-shoes'
        bgImg={url('running-shoes')}
        name="RUNNING SHOES"
      />
    </div>
    <div className="row cat-spacing">
      <EachProduct
        index={5}
        size="col-md-6"
        path='/product/paddleboards'
        bgImg={url('paddleboards')}
        name="PADDLEBOARDS"
      />
      <EachProduct
        index={6}
        size="col-md-6"
        path='/product/bikes'
        bgImg={url('bikes')}
        name="BIKES"
      />
    </div>
  </div>
)
