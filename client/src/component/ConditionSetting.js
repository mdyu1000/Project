import { Card, CardBody, CardFooter } from 'reactstrap';
import React from 'react';
import InputText from './InputText'
import '../CSS/conditionGroup.css';

const CardBodyStyle = {
  padding: "1.5rem 1.25rem"
}

const inputNumberStyle = {
  textAlign: "center",
  width: "65px",
  border: 0,
  outline: 0,
  background: "transparent",
  borderBottom: "1px solid"
}

const handleAddCondition3 = (interval, onAdd) => {
  if(interval == ""){
    alert("value can't be empty")
  }else{
    onAdd(interval)
  }
}

const handleAddCondition2 = (distance, onAdd) => {
  if(distance == ""){
    alert("distance can't be empty")
  }else{
   onAdd(distance)
  }
}

const handleAddCondition1 = (SID, distance, onAdd) => {
  if(SID == null){
    alert("Please choose a station")
  }else if(distance == ""){
    alert("distance can't be empty")
  }else{
    onAdd(SID, distance)
  }
}

const StationOption = props => {
  return (  
    props.stations.go.length != 0 &&
    props.stations.go.map((station, index) =>
      <option key={station + index} value={station.name.ch} data-sid={station.SID}>{station.name.ch}</option>
    )
  )
}

export const Condition1 = props => {
  return (
    <div className="modal fade" id="condition1" tabIndex="-1" role="dialog" >
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
            <div className="mt-3">
              <div>Condition</div>
              <span className="card-text">抵達 
                <select id="C1_station" className="mx-1 browser-default d-inline">
                  <option disabled value='' selected className="d-none"></option>
                  <StationOption stations={props.stations} />
                </select>站前 
                <input id="C1_distance" type="number" style={inputNumberStyle} max="6000" min="0" size="35"/>公尺，進行廣播
              </span>
            </div>
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

export const Condition11 = (props) => {
  return(
    <Card id="condition1" className="collapse mx-1" data-parent="#ConditionGroup">
      <CardBody style={CardBodyStyle}>
        <span className="card-text">抵達 
          <select id="C1_station" className="mx-1 browser-default d-inline">
            <option disabled value='' selected className="d-none"></option>
            <StationOption stations={props.stations} />
          </select>站前 
          <input id="C1_distance" type="number" style={inputNumberStyle} max="6000" min="0" size="35"/>公尺，進行廣播
        </span>
      </CardBody>
      <CardFooter className="py-1 text-right">
        <button type="button" className="btn btn-light btn-sm py-1 waves-effect" 
          style={{ borderColor: "rgba(0,0,0,.03)"}}
          onClick={ () => handleAddCondition1(
            document.getElementById("C1_station").options[document.getElementById("C1_station").selectedIndex].dataset.sid, 
            document.getElementById("C1_distance").value, 
            props.onAddCondition1
          )}>
          <span style={{ color: "#1e1e1e" }}> New </span>
        </button>
      </CardFooter>
    </Card>
  )
}

export const Condition2 = (props) => {
  return (
    <Card id="condition2" className="collapse mx-1" data-parent="#ConditionGroup">
      <CardBody style={CardBodyStyle}>
        <span className="card-text">和下一站距離 
          <input id="C2_distance" type="number" style={inputNumberStyle} className="border-bottom" max="6000" min="0"/> 
          公尺，進行廣播
        </span>
      </CardBody>
      <CardFooter className="py-1 text-right">
        <button type="button" className="btn btn-light btn-sm py-1 waves-effect" 
          style={{ borderColor: "rgba(0,0,0,.03)"}}
          onClick={ () => handleAddCondition2(document.getElementById("C2_distance").value, props.onAddCondition2) }>
          <span style={{ color: "#1e1e1e" }}> New </span>
        </button>
      </CardFooter>
    </Card>
  )
}

export const Condition3 = (props) => {
  return (
    <Card id="condition3" className="collapse mx-1" data-parent="#ConditionGroup">
      <CardBody style={CardBodyStyle}>
        <span className="card-text">每隔 
          <input id="C3_interval" type="number" style={inputNumberStyle} max="600" min="0"/> 
          秒時，進行廣播
        </span>
      </CardBody>
      <CardFooter className="py-1 text-right">
        <button type="button" className="btn btn-light btn-sm py-1 waves-effect" 
          style={{ borderColor: "rgba(0,0,0,.03)"}} 
          onClick={ () => handleAddCondition3(document.getElementById("C3_interval").value, props.onAddCondition3) }>
          <span style={{ color: "#1e1e1e" }}> New </span>
        </button>
      </CardFooter>
    </Card> 
  )
}