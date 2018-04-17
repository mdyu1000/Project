import React, { Component } from 'react';
import NavgationBar from '../component/Navbar';
import SideNav from '../component/SideNav';
import NewRoute from '../component/NewRoute';

class App extends Component {
  render() {
    return (
      <div>
      	<NavgationBar />
      	<SideNav />
        <NewRoute />
      </div>
    );
  }
}

export default App;
