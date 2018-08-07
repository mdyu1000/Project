import React from 'react';

const Info = props => {
	return (
		<tbody>
			{
				props.busInfo.map((info, index) => 
					<tr key={info._id} style={{ cursor: "pointer"}} onClick={props.onLoadInfo} data-dismiss="modal">
			      <td routeid={info.openDataRID}>{index + 1}</td>
			      <td routeid={info.openDataRID}>{info.name.ch}</td>
			      <td routeid={info.openDataRID}>{info.departure.ch}</td>
			      <td routeid={info.openDataRID}>{info.destination.ch}</td>
					</tr>
				)
			}
		</tbody>
	)
}

export default class BusInfo extends React.Component {
	constructor(props){
		super(props)
		this.handleLoadInfo = this.handleLoadInfo.bind(this)
	}

	handleLoadInfo(e){
		let RID = e.target.getAttribute("routeid")
		this.props.loadRouteInfo(RID)
	}

	render(){
		return (
	    <div className="modal fade" id="exampleModal" tabIndex="-1">
	      <div className="modal-dialog modal-lg">
	        <div className="modal-content">
	          <div className="modal-header">
	            <h5 className="modal-title" id="exampleModalLabel">Bus Infomation</h5>
	            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	              <span aria-hidden="true">&times;</span>
	            </button>
	          </div>
	          <div className="modal-body" style={{ height: "400px", overflowY: "scroll"}}>
						<table className="table table-hover">
						  <thead>
						    <tr>
						      <th scope="col">#</th>
						      <th scope="col">Name</th>
						      <th scope="col">Departure</th>
						      <th scope="col">Destination</th>
						    </tr>
						  </thead>
						  <Info busInfo={this.props.busInfo} onLoadInfo={this.handleLoadInfo} />
						</table>
	          </div>
	        </div>
	      </div>
	    </div>
		)
	}
}
