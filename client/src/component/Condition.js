import React from 'react';
import { Row, Col, Button, ButtonGroup, Card, CardHeader, CardBody, CardText, CardFooter, FormGroup } from 'reactstrap';
import $ from 'jquery';
import '../CSS/conditionGroup.css';

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
	  <Button key={i} outline id={"btn" + (i + 1)} className="ml-0" 
	 		onClick={props.onClick} style={ buttonStyle(props.color) }> 
	  	<span style={{ color: props.color}}>{"Rule " + (i + 1)}</span>
	  </Button>
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
    <Card id="condition1" className="d-none">
	    <CardHeader className="py-2">Rule 1 Setting</CardHeader>
	    <CardBody style={CardBodyStyle}>
	      <span className="card-text">抵達 
	      	<select id="condition1_station" className="mx-1">
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
    <Card id="condition2" className="d-none">
	    <CardHeader className="py-2">Rule 2 Setting</CardHeader>
	    <CardBody style={CardBodyStyle}>
	      <span className="card-text">離開 
	      	<select id="condition2_station" className="mx-1">
	      		<option disabled selected value className="d-none"></option>
	      		<option value="忠孝復興">忠孝復興</option>
	      		<option value="南京復興">南京復興</option>
	      		<option value="南京復興">騎你按讚</option>
	      	</select>
      		站後 
    			<input id="condition2_value"  className="mx-1" type="number" style={inputNumberStyle} max="600" min="0"/> 
	      	<select id="condition2_type" className="mx-1">
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
    <Card id="condition3" className="d-none">
	    <CardHeader className="py-2">Rule 3 Setting</CardHeader>
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
    <Card id="condition4" className="d-none">
	    <CardHeader className="py-2">Rule 4 Setting</CardHeader>
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
		this.handleConditionClick = this.handleConditionClick.bind(this);
	}

	handleConditionClick(e){
		this.setState({
			index: e.target.id.split("btn")[1],
		})
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.index == this.state.index){
			$("#condition" + this.state.index).toggleClass("d-block");
		}else{
			$("#condition" + prevState.index).removeClass("d-block");
			$("#condition" + this.state.index).addClass("d-block");
		}
	}

	render(){
		return(
			<Row style={{marginTop: "1rem"}}>
				<Col sm="5">
	        <FormGroup>
						<span>Condition <i class="fa fa-sticky-note-o ml-1" style={{ fontSize: "1.1rem" }}></i></span><br/>
						<ConditionGroup onClick={this.handleConditionClick} color={this.props.color}/>
	        </FormGroup>
				</Col>
				<Col sm={{size: "5", offset: "1"}} >
			    <div className="mt-4">
			    	<Condition1 />
			    	<Condition2 />
			    	<Condition3 />
			    	<Condition4 />
			    </div>
				</Col>
     	</Row>
		)
	}
}