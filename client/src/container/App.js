import React, { Component } from 'react';
import NavgationBar from '../component/Navbar';
import SideNav from '../component/SideNav';
import NewRouteContainer from '../container/NewRouteContainer';



class App extends Component {
  render() {
    return (
      <div>
      	<NavgationBar />
      	<SideNav />
        <NewRouteContainer />
      </div>
    );
  }
}

export default App;
