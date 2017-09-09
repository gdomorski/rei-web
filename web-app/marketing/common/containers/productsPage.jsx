import React, { Component } from 'react'
import {connect} from 'react-redux'
import {defaultAction} from '../../../shared/actions/defaultAction.js'
import * as ActionTypes from '../../../shared/constants/actionTypes'
import {capitalizeFirstLetter} from '../../../shared/utils/display.js'
import Config from '../../reinetwork/src/config.js';
import {Link} from 'react-router'

class ProductsPage extends Component {
  async componentDidMount(){
    window.Sharer.init();
    const productSlug = this.props.params.product
    const response = await fetch(`${Config.apiHost}/products/${productSlug}`)
    const data = await response.json()
    console.log('DATA', data)
    this.props.loadProducts(data)
  }

  sendInfoToServer = async e => {
    const { productToRemove, productNameToAdd, productSentimentToChange } = this.props.formData
    const { feedTxt } = this.props.products

    let newProducts = feedTxt.concat(productNameToAdd)

    let sentimentArr = []

    if (productSentimentToChange === 'everything') {
      sentimentArr = ['positive', 'negative', 'neutral']
    } else if (productSentimentToChange === 'neutral or higher') {
      sentimentArr = ['positive', 'neutral']
    } else {
      sentimentArr.push(productSentimentToChange)
    }
    if (productToRemove.length){
      newProducts = newProducts.filter(prod => (productToRemove === prod) ? false : true)
    }

    const productSlug = this.props.params.product

    const response = await fetch(`${Config.apiHost}/products/${productSlug}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({ sentiment: sentimentArr, feedTxt: newProducts })
    }).catch(err => {
      console.log(err)
    })

    const data = await response.json();
    console.log(data, 'DATA')
    this.props.loadProducts(data)

  }

  updateMe = (e) => {
    this.props.updateSentiment(e.target.value)
  }

  render(){
    const { feedTxt, sentiment } = this.props.products

    let productsBeingPromoted = []
    let currentSentiment = []
    let productsToRemove = []
    console.log('THE PROIDUCTS!', this.props.products, Object.keys(this.props.products), Object.keys(this.props.products).length)
    if(Object.keys(this.props.products).length) {
      productsBeingPromoted = feedTxt.map(p => <li key={p}>{capitalizeFirstLetter(p)}</li>)
      productsToRemove = feedTxt.map(p => <option key={p} value={p}>{capitalizeFirstLetter(p)}</option>)
      currentSentiment = sentiment.map(s => <span key={s}>{capitalizeFirstLetter(s)} </span>)
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 style={{textAlign: "center", paddingTop: "200px"}}>What {this.props.params.product} would you like to promote?</h1>
          </div>

          <div className="row">

          <div className="col-md-6" style={{marginTop: "40px"}}>
            <div>
              <b>Current Products Being Promoted</b>
            </div>

            <ul style={{listStyleType: "none", paddingLeft: "0px"}}>
              {productsBeingPromoted}
            </ul>

            <div>
              <b>Current Sentiment:</b> {currentSentiment}
            </div>

            <div>
              <b>Our Main Product To Promote:</b><Link target="_blank" to={this.props.products.productLink}> {this.props.products.highlightedProduct}</Link>
            </div>
            <div>
              <b>Our Main Product To Promote Sell Price:</b> ${this.props.products.highlightedProductSellPrice}
            </div>

            <form style={{margin: "0", paddingLeft: "0"}} onSubmit={e => { e.preventDefault(); this.sendInfoToServer()}}>
              <input
                style={{margin: "0"}}
                type="text"
                placeholder="Product Name To Add"
                value={this.props.productNameToAdd}
                onChange={e => this.props.updateProductName(e.target.value)}
                style={{paddingTop: "5px", paddingBottom: "5px", marginLeft: "0px"}}
                required
              />

              <div style={{marginTop: "10px"}}>Please Pick a Sentiment</div>

              <select value={this.props.formData.productSentimentToChange} onChange={this.updateMe} required>
                <option value="everything">Allow Everything</option>
                <option value="negative">Negative</option>
                <option value="neutral">Neutral</option>
                <option value="neutral or higher">Neutral or Higher</option>
                <option value="positive">Positive</option>
              </select>

              <div style={{marginTop: "10px"}}>Optional: Please pick a product to remove</div>

              <select value={this.props.formData.productToRemove} onChange={e => this.props.updateRemoveProduct(e.target.value)}>
                <option value="">None</option>
                {productsToRemove}
              </select>

              <input type="submit" value="Submit" style={{backgroundColor: "black", marginLeft: "0px", marginTop: "20px"}} />
            </form>

          </div>
            <div className="col-md-6" style={{marginTop: "40px"}}>
              <b>Potential Customer Complaints About Current Products</b>
              <br/>
              <button className="sharer button" data-sharer="twitter" data-title="Let us help!" data-hashtags="REI">Respond to Customer</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}


export default connect(
  state => ({
    config: state.config,
    products: state.products,
    formData: state.formData
  }),
  dispatch => ({
    loadProducts: products => {dispatch(defaultAction(ActionTypes.LOAD_PRODUCTS, products))},
    updateProductName: products => {dispatch(defaultAction(ActionTypes.UPDATE_PRODUCT_NAME, products))},
    updateRemoveProduct:products => {dispatch(defaultAction(ActionTypes.UPDATE_PRODUCT_TO_REMOVE, products))},
    updateSentiment:products => {dispatch(defaultAction(ActionTypes.UPDATE_PRODUCT_SENTIMENT, products))}
  })
)(ProductsPage)
