import React from 'react'
import { connect } from 'react-redux'

const ReiSentimentCounts = ({ positive, neutral, negative }) =>
  <div className="content">
    <div className="data">
      <ul>
          <li>
            <span className="num tweets" style={{color:"#99CC00"}}>{positive}</span>
            <span className="title title-tweets">Positive</span>
          </li>
          <li>
          <span className="num followers" style={{color:"#FFBB33"}}>{neutral}</span>
              <span className="title title-followers">Neutral</span>
          </li>
          <li>
              <span className="num following" style={{color:"#FF4444"}}>{negative}</span>
              <span className="title title-following">Negative</span>
          </li>
      </ul>
    </div>
  </div>


const mapState = ({ reiCounts }) => reiCounts
export default connect(mapState)(ReiSentimentCounts)