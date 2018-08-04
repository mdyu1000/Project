import { Card, CardBody, CardFooter } from 'reactstrap';
import React from 'react';
import '../CSS/conditionGroup.css';

const CardBodyStyle = {
  padding: "1.5rem 1.25rem"
}

const inputNumberStyle = {
  textAlign: "center",
  width: "65px",
}

const handleAddCondition4 = (interval, onAdd) => {
  onAdd(interval)
}

const handleAddCondition3 = (distance, onAdd) => {
  onAdd(distance)
}

const handleAddCondition2 = (SID, type, value, onAdd) => {
  onAdd(SID, type, value)
}

const handleAddCondition1 = (SID, distance, onAdd) => {
  onAdd(SID, distance)
}

const StationOption = props => {
  return (  
    props.stations.map((station, index) =>
      <option key={station + index} value={station.name.ch}>{station.name.ch}</option>
    )
  )
}

export const Condition1 = (props) => {
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
        <button type="button" className="btn btn-outline-primary btn-sm py-1 waves-effect" 
          style={{ borderColor: "rgba(0,0,0,.03)"}}
          onClick={ () => handleAddCondition1(
            document.getElementById("C1_station").options[document.getElementById("C1_station").selectedIndex].getAttribute("SID"), 
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
        <span className="card-text">離開 
          <select id="C2_station" className="mx-1 browser-default d-inline">
            <option disabled selected value className="d-none"></option>
            <StationOption stations={props.stations} />
          </select>
          站後 
          <input id="C2_value" className="mx-1" type="number" style={inputNumberStyle} max="600" min="0"/> 
          <select id="C2_type" className="mx-1 browser-default d-inline">
            <option disabled selected value className="d-none"></option>
            <option value="公尺" type="0">公尺</option>
            <option value="秒" type="1">秒</option>
          </select>
          進行廣播
        </span>
      </CardBody>
      <CardFooter className="py-1 text-right">
        <button type="button" className="btn btn-outline-primary btn-sm py-1 waves-effect" 
          style={{ borderColor: "rgba(0,0,0,.03)"}}
          onClick={ () => handleAddCondition2(
            document.getElementById("C2_station").options[document.getElementById("C2_station").selectedIndex].getAttribute("SID"),
            document.getElementById("C2_type").options[document.getElementById("C2_type").selectedIndex].getAttribute("type"),
            document.getElementById("C2_value").value, 
            props.onAddCondition2
          )}>
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
        <span className="card-text">和下一站距離 
          <input id="C3_distance" type="number" style={inputNumberStyle} max="6000" min="0"/> 
          公尺，進行廣播
        </span>
      </CardBody>
      <CardFooter className="py-1 text-right">
        <button type="button" className="btn btn-outline-primary btn-sm py-1 waves-effect" 
          style={{ borderColor: "rgba(0,0,0,.03)"}}
          onClick={ () => handleAddCondition3(document.getElementById("C3_distance").value, props.onAddCondition3) }>
          <span style={{ color: "#1e1e1e" }}> New </span>
        </button>
      </CardFooter>
    </Card>
  )
}

export const Condition4 = (props) => {
  return (
    <Card id="condition4" className="collapse mx-1" data-parent="#ConditionGroup">
      <CardBody style={CardBodyStyle}>
        <span className="card-text">每隔 
          <input id="C4_interval" type="number" style={inputNumberStyle} max="600" min="0"/> 
          秒時，進行廣播
        </span>
      </CardBody>
      <CardFooter className="py-1 text-right">
        <button type="button" className="btn btn-outline-primary btn-sm py-1 waves-effect" 
          style={{ borderColor: "rgba(0,0,0,.03)"}} 
          onClick={ () => handleAddCondition4(document.getElementById("C4_interval").value, props.onAddCondition4) }>
          <span style={{ color: "#1e1e1e" }}> New </span>
        </button>
      </CardFooter>
    </Card> 
  )
}