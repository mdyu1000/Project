import React from 'react';

export default class FontAwesomeList extends React.Component {
	constructor(props){
		super(props)
		this.handleClickIcon = this.handleClickIcon.bind(this)
	}

	handleClickIcon(icon){
		this.props.SetStationSpotIcon(icon)
	}

	render(){
		return (
			<div className="bg-white p-2 border radius mt-1" style={{height: "200px", width: "300px"}}>
        <span className="mx-1" onClick={() => this.handleClickIcon("coffee")} style={{cursor: "pointer"}}>
        	<i className="fas fa-coffee"></i>
        </span>
        <span className="mx-1" onClick={() => this.handleClickIcon("building")} style={{cursor: "pointer"}}>
        	<i className="fas fa-building"></i>
        </span>
			</div>
		)
	}
}				
//<span id="angry" className="px-1"  style={{cursor: "pointer"}}>

	//			</span>				
//