import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavgationBar from '../component/Navbar'
import SideNav from '../component/SideNav'
import NewRouteContainer from './NewRouteContainer'
import RouteListContainer from './RouteListContainer'
import { Route, HashRouter } from 'react-router-dom'
import { withRouter } from 'react-router'

import {
  fetchBusInfo,
} from '../action/NewRoute'

class App extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.fetchBusInfo()
  }

  render() {
    return (
      <div>
        <NavgationBar />
        <SideNav />
        <Route exact path="/NewRoute" component={NewRouteContainer} />
        <Route exact path="/UpdateRoute/:RID" component={NewRouteContainer} />        
        <Route exact path="/" component={RouteListContainer} />        
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusInfo: () => {
      dispatch(fetchBusInfo())
    },
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))