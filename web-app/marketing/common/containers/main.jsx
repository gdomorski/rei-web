import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import FeaturedCategory from '../../../shared/components/misc/featuredCategory.jsx'
import CategoryGrid from '../../../shared/components/misc/categoryGrid.jsx'
import ReiSentimentCounts from './ReiSentimentCounts.jsx'
import Config from '../../../marketing/reinetwork/src/config.js'

class Main extends Component {
	render() {
		return (
			<div>
				<div>
				    <div className="fullcontainer-lg no-pad-l no-pad-r">
							<section 
								id="hero11" 
								style={{
									background: `url("${Config.cdnHost}/brand/hero.jpg")`,
									backgroundSize: "cover",
									height: "500px"
								}}
								className="hero animated fadeIn"
							>
				        <div className="inside-new no-mar-l">
				          <div className="copy main-btns">
				            <br className="hidden-sm-up" />
										<div style={{width: "500px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
					            <div style={{position: "absolute", top: "35%", left: "5%", fontWeight: "bold", fontSize: "44px"}}>REI Network Dashboard</div>
										</div>
				          </div>
				        </div>
				      </section>
				  </div>
			  </div>

				<div style={{marginTop: "100px"}}>

					<header style={{paddingBottom: "20px"}}>
						<div className="bio">
								<div className="desc" style={{textAlign: "center"}}>
										<h3>What People Are Saying About REI</h3>
								</div>
						</div>
					</header>
					
					<ReiSentimentCounts />

				</div>

				<div style={{position: "relative", textAlign: "center", fontWeight: "bold", fontSize: "26px", marginTop: "150px", marginBottom: "50px"}}>Choose The Products Your Customers Want to Promote</div>

				<CategoryGrid />
		  </div>
		)
	}
}




export default connect(
	state => ({
		config: state.config
	}),
	dispatch => ({

	}))(Main)


Main.contextTypes = {
  router: React.PropTypes.object.isRequired
};
