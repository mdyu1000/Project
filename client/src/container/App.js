import React, { Component } from 'react';
import NavgationBar from '../component/Navbar';
import SideNav from '../component/SideNav';

const testStyle={
	height:"100px",
	backgroundColor: "gray",
}

class App extends Component {
  render() {
    return (
      <div>
      	<NavgationBar />
      	<SideNav />
      	<div class="container-fluid" style={{ paddingLeft: "18rem"}}>
	      	<div class="row">
		      	<div class="col-4" style={testStyle}></div>
		      	<div class="col-4" style={testStyle}></div>
		      	<div class="col-4" style={testStyle}></div>
		    	</div>
      	</div>
      </div>
    );
  }
}

export default App;
