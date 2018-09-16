import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { iconList } from './Global'

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
				{
					iconList.map(icon => {
						if(!icon.hasOwnProperty("custom")){
							return (
				        <span key={icon.icon} className="mx-1" onClick={() => this.handleClickIcon(icon.icon)} style={{cursor: "pointer"}}>
					        <FontAwesomeIcon icon={icon.icon} />
				        </span>
							)
						}else{
							if(icon.icon == "mrt"){
								return (
					        <span key={icon.icon} className="mx-1" onClick={() => this.handleClickIcon(icon.icon)} style={{cursor: "pointer"}}>
						        <img src={icon.url} style={{height: "25px", width: "25px"}} />
					        </span>
								)
							}

						}
					})
				}
			
      </div>
		)
	}
}				
        	// <i className="fas fa-building"></i>
        	// <i className="fas fa-coffee"></i>
