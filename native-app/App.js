import React, {Component} from 'react'
import {Router, Stack, Scene} from 'react-native-router-flux'
import Home from './components/home.js'
import NewsFeed from './components/newsFeed.js'

//need to make a class based component here because it is what Expo expects
export default class App extends Component {
  render(){
    return (
    <Router>
      <Stack key="root">
        <Scene key="newsFeed" component={NewsFeed} hideNavBar />
        <Scene key="home" title="home" component={Home} hideNavBar initial />
      </Stack>
    </Router>
    )
  }
}
