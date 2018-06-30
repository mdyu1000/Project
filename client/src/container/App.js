import React, { Component } from 'react'
import NavgationBar from '../component/Navbar'
import SideNav from '../component/SideNav'
import NewRoute from './NewRoute'
import RouteListContainer from './RouteListContainer'
import { Route, HashRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <NavgationBar />
        <SideNav />
        <Route exact path="/NewRoute" component={NewRoute} />
        <Route exact path="/" component={RouteListContainer} />        
      </div>
    );
  }
}

export default App
