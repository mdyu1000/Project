import React, { Component } from 'react'
import NavgationBar from '../component/Navbar'
import SideNav from '../component/SideNav'
import NewRouteContainer from './NewRouteContainer'
import RouteListContainer from './RouteListContainer'
import { Route, HashRouter } from 'react-router-dom'

class App extends Component {
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

export default App
