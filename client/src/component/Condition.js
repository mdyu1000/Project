import React from 'react';
import { Row, Col, Button, ButtonGroup, Card, CardHeader, CardBody, CardText, CardFooter, FormGroup } from 'reactstrap';
import $ from 'jquery';
import '../CSS/conditionGroup.css';

const ruleGroupStyle = {
	height: "220px",
  overflowY: "scroll",
  overflowX: "hidden",
}

const ruleStyle = {
	borderRadius: "5px",
  border: "1px solid rgba(0, 0, 0, 0.125)",
  display: "flex",
  justifyContent: "space-between",
  padding: "0.75rem 1.25rem",
}

const CardBodyStyle = {
	padding: "1.5rem 1.25rem"
}

const inputNumberStyle = {
	textAlign: "center",
	width: "65px",
}

const buttonStyle = (color) => {
	return({
		paddingTop: "5px",
		paddingBottom: "5px",
		border: "2px solid " + color,
		color: color,
	})
}

const ConditionGroup = (props) => {
	const arr = ["Condition 1", "Condition 2", "Condition 3", "Condition 4"];
	const btnLists = arr.map((btnList, i) => 
		<div style={{ width: "100%"}}>
		  <Button type="button" key={i} outline className="ml-0" style={buttonStyle(props.color)}
		 		data-toggle="collapse" data-target={"#condition" + (i + 1)}>
		  	<span style={{ color: props.color}}>
		  		{"Rule " + (i + 1)}
	  		</span>
		  </Button>
		  { ( i==0 && <Condition1 /> ) || ( i==1 && <Condition2 /> ) || 
	  		( i==2 && <Condition3 /> ) || ( i==3 && <Condition4 /> ) }
	 	</div>
	)
	return(
		<ButtonGroup id="ConditionGroup" vertical className="mt-2 px-3" style={{width: "100%"}}>
			{btnLists}
		</ButtonGroup>
	)
}

const CardFooters = () => {
	return(
    <CardFooter className="py-1 text-right">
    	<button type="button" class="btn btn-outline-primary btn-sm py-1 waves-effect" style={{ borderColor: "rgba(0,0,0,.03)"}}>
    		<span style={{ color: "#1e1e1e" }}> New </span>
  		</button>
  	</CardFooter>
	)
}

const Condition1 = () => {
	return(
    <Card id="condition1" className="collapse mx-1" data-parent="#ConditionGroup">
	    <CardBody style={CardBodyStyle}>
	      <span className="card-text">抵達 
	      	<select id="condition1_station" className="mx-1 browser-default d-inline">
	      		<option disabled selected value className="d-none"></option>
	      		<option value="忠孝復興">忠孝復興</option>
	      		<option value="南京復興">南京復興</option>
	      		<option value="南京復興">騎你按讚</option>
	      	</select>
       		站前 
       		<input type="number" style={inputNumberStyle} max="6000" min="0" size="35"/> 公尺，進行廣播
       	</span>
	    </CardBody>
	    <CardFooters />
	  </Card>
	)
}

const Condition2 = () => {
	return (
    <Card id="condition2" className="collapse mx-1" data-parent="#ConditionGroup">
	    <CardBody style={CardBodyStyle}>
	      <span className="card-text">離開 
	      	<select id="condition2_station" className="mx-1 browser-default d-inline">
	      		<option disabled selected value className="d-none"></option>
	      		<option value="忠孝復興">忠孝復興</option>
	      		<option value="南京復興">南京復興</option>
	      		<option value="南京復興">騎你按讚</option>
	      	</select>
      		站後 
    			<input id="condition2_value"  className="mx-1" type="number" style={inputNumberStyle} max="600" min="0"/> 
	      	<select id="condition2_type" className="mx-1 browser-default d-inline">
	      		<option disabled selected value className="d-none"></option>
	      		<option value="公尺">公尺</option>
	      		<option value="秒">秒</option>
	      	</select>
    			進行廣播
      	</span>
	    </CardBody>
	    <CardFooters />
	  </Card>
	)
}

const Condition3 = () => {
	return (
    <Card id="condition3" className="collapse mx-1" data-parent="#ConditionGroup">
	    <CardBody style={CardBodyStyle}>
	      <span className="card-text">和下一站距離 
	      	<input id="condition3_distance" type="number" style={inputNumberStyle} max="6000" min="0"/> 
	      	公尺，進行廣播
	      </span>
	    </CardBody>
	    <CardFooters />
	  </Card>
	)
}

const Condition4 = () => {
	return (
    <Card id="condition4" className="collapse mx-1" data-parent="#ConditionGroup">
	    <CardBody style={CardBodyStyle}>
	      <span className="card-text">每隔 
	      	<input id="condition4_interval" type="number" style={inputNumberStyle} max="600" min="0"/> 
	      	秒時，進行廣播
      	</span>
	    </CardBody>
	    <CardFooters />
	  </Card>	
	)
}

export default class Condition extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			index: 0,
		}
	}

	render(){
		return(
			<Row style={{marginTop: "1rem"}}>
				<Col sm="5">
	        <FormGroup>
						<span>Condition</span><br/>
						<ConditionGroup color={this.props.color}/>
	        </FormGroup>
				</Col>
				<Col sm={{size: "5", offset: "1"}} >
					<span>Rules</span><br/>
					<ul class="mt-1 px-1" style={ruleGroupStyle} >
					  <li class="mt-2" style={ruleStyle}>
					  	<span>抵達 <b>大安</b> 站前 <b>100</b> 公尺，進行廣播 </span><i style={{ cursor: "pointer"}} class="fa fa-remove my-auto"></i>
				  	</li>
					  <li class="mt-2" style={ruleStyle}>
					  	<span>離開 <b>六張犁</b> 站後 <b>20</b> 秒，進行廣播</span><i style={{ cursor: "pointer"}} class="fa fa-remove my-auto"></i>
				 	 	</li>
					  <li class="mt-2" style={ruleStyle}>
					  	<span>抵達 <b>動物園</b> 站前 <b>80</b> 公尺，進行廣播</span><i style={{ cursor: "pointer"}} class="fa fa-remove my-auto"></i>
				  	</li>
					  <li class="mt-2" style={ruleStyle}>
					  	<span>和下一站距離 <b>120</b> 公尺，進行廣播</span><i style={{ cursor: "pointer"}} class="fa fa-remove my-auto"></i>
				  	</li>
					  <li class="mt-2" style={ruleStyle}>
					  	<span>每隔 <b>17</b> 秒，進行廣播</span><i style={{ cursor: "pointer"}} class="fa fa-remove my-auto"></i>
				  	</li>			
					  <li class="mt-2" style={ruleStyle}>
					  	<span>每隔 <b>69</b> 秒，進行廣播</span><i style={{ cursor: "pointer"}} class="fa fa-remove my-auto"></i>
				  	</li>	
					  <li class="mt-2" style={ruleStyle}>
					  	<span>每隔 <b>17</b> 秒，進行廣播</span><i style={{ cursor: "pointer"}} class="fa fa-remove my-auto"></i>
				  	</li>	
					  <li class="mt-2" style={ruleStyle}>
					  	<span>每隔 <b>69</b> 秒，進行廣播</span><i style={{ cursor: "pointer"}} class="fa fa-remove my-auto"></i>
				  	</li>					  					  					  		  	
					</ul>
				</Col>
     	</Row>
		)
	}
}
