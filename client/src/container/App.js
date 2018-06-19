import React, { Component } from 'react';
import NavgationBar from '../component/Navbar';
import SideNav from '../component/SideNav';
import NewRoute from './NewRoute';
import { Route, HashRouter, BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <NavgationBar />
        <SideNav />
        <BrowserRouter>
          <Route exact path="/" component={NewRoute} />
        </BrowserRouter> 
      </div>
    );
  }
}

export default App;
