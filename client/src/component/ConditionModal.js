import React from 'react'
import InputText from './InputText'
import '../CSS/conditionGroup.css'

const inputNumberStyle = {
  textAlign: "center",
  width: "65px",
  border: 0,
  outline: 0,
  background: "transparent",
  borderBottom: "1px solid"
}

const StationOption = props => {
  return (  
    props.stations.go.length != 0 &&
    props.stations.go.map((station, index) =>
      <option key={station + index} value={station.name.ch} data-sid={station.SID}>{station.name.ch}</option>
    )
  )
}

const Condition1 = props => {
	return (
    <div className="mt-4">
      <div className="mb-1">Condition</div>
      <span className="card-text">抵達 
        <select id="C1_station" className="mx-1 browser-default d-inline">
          <option disabled value='' selected className="d-none"></option>
          <StationOption stations={props.stations} />
        </select>站前 
        <input id="C1_distance" type="number" style={inputNumberStyle} max="6000" min="0" size="35"/>公尺，進行廣播
      </span>
    </div>
	)
}

const Condition2 = props => {
	return (
    <div className="mt-4">
      <div className="mb-1">Condition</div>
      <span className="card-text">和下一站距離 
        <input id="C2_distance" type="number" style={inputNumberStyle} className="border-bottom" max="6000" min="0"/> 
        公尺，進行廣播
      </span>
    </div>
	)
}

const Condition3 = props => {
	return (
    <div className="mt-4">
      <div className="mb-1">Condition</div>
      <span className="card-text">每隔 
        <input id="C3_interval" type="number" style={inputNumberStyle} max="600" min="0"/> 
        秒時，進行廣播
      </span>    
    </div>
	)
}

export default class ConditionModal extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		return (
	    <div className="modal fade" id="conditionModal" tabIndex="-1" role="dialog" >
	      <div className="modal-dialog" role="document">
	        <div className="modal-content">
	          <div className="modal-header">
	            <h5 className="modal-title">Condition1</h5>
	            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	              <span aria-hidden="true">&times;</span>
	            </button>
	          </div>
	          <div className="modal-body">
	            <div>
	              <InputText title="Title" name="title" />
	            </div>
	            <div>
	              <div>Content</div>
	              <div>
	                <textarea id="broadcast-content-ch" className="w-100 rounded mt-2" placeholder="請輸入中文介紹" />
	                <textarea id="broadcast-content-en" className="w-100 rounded mt-2" placeholder="Please enter the introduction in English" />
	              </div>
	            </div>
	            <div className="mt-2">
	              <div>Image</div>
	              <input id="broadcast-img" className="mt-1" type="file" />
	            </div>
	            {
	            	this.props.conditionIndex == 1 &&
	            	<Condition1 stations={this.props.stations} />
	            }
	            {
	            	this.props.conditionIndex == 2 &&
	            	<Condition2 />
	            }
	            {
	            	this.props.conditionIndex == 3 &&
	            	<Condition3 />
	            }
	          </div>
	          <div className="modal-footer">
	            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
	            <button type="button" className="btn btn-primary">New</button>
	          </div>
	        </div>
	      </div>
	    </div>
		)
	}
}