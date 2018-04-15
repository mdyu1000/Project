import React, { Component } from 'react';
import Navbar from '../component/Navbar';
import SideNav from '../component/SideNav';

class App extends Component {
  render() {
    return (
      <div>
      	<Navbar />
      	<SideNav />
      </div>
    );
  }
}

export default App;
