import React from 'react';
import { Row, Col, Button, ButtonGroup, Card, CardHeader, CardBody, CardText, FormGroup } from 'reactstrap';
import $ from 'jquery';

const CardHeaderStyle = {
	paddingTop: "6px",
	paddingBottom: "6px",
}

const inputNumberStyle = {
	width: "50px",
	paddingLeft: "10px",
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

const Condition1 = () => {
	return(
    <Card id="condition1" className="d-none">
	    <CardHeader style={CardHeaderStyle}>Rule 1 Setting</CardHeader>
	    <CardBody>
	      <span className="card-text">抵達 
	      	<select id="condition1_station" className="mx-1">
	      		<option disabled selected value className="d-none"></option>
	      		<option value="忠孝復興">忠孝復興</option>
	      		<option value="南京復興">南京復興</option>
	      		<option value="南京復興">騎你按讚</option>
	      	</select>
	       站前 <input type="number" style={inputNumberStyle} max="6000" min="0"/> 公尺，進行廣播</span>
	    </CardBody>
	  </Card>
	)
}

const Condition2 = () => {
	return (
    <Card id="condition2" className="d-none">
	    <CardHeader style={CardHeaderStyle}>Rule 2 Setting</CardHeader>
	    <CardBody>
	      <span className="card-text">離開 
	      	<select id="condition2_station" className="mx-1">
	      		<option disabled selected value className="d-none"></option>
	      		<option value="忠孝復興">忠孝復興</option>
	      		<option value="南京復興">南京復興</option>
	      		<option value="南京復興">騎你按讚</option>
	      	</select>
      	站後 <input type="number" style={inputNumberStyle} max="6000" min="0"/> 公尺 / 
	      	<input type="number" style={inputNumberStyle} max="6000" min="0"/> 秒，進行廣播</span>
	    </CardBody>
	  </Card>
	)
}

const Condition3 = () => {
	return (
    <Card id="condition3" className="d-none">
	    <CardHeader style={CardHeaderStyle}>Rule 3 Setting</CardHeader>
	    <CardBody>
	      <span className="card-text">和下一站距離 <input type="number" style={inputNumberStyle} max="6000" min="0"/> 公尺，進行廣播</span>
	    </CardBody>
	  </Card>
	)
}

const Condition4 = () => {
	return (
    <Card id="condition4" className="d-none">
	    <CardHeader style={CardHeaderStyle}>Rule 4 Setting</CardHeader>
	    <CardBody>
	      <span className="card-text">每隔 <input type="number" style={inputNumberStyle} max="600" min="0"/> 秒時，進行廣播</span>
	    </CardBody>
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
						<span>Condition</span><br/>
						<ConditionGroup onClick={this.handleConditionClick} color={this.props.color}/>
	        </FormGroup>
				</Col>
				<Col sm={{size: "5", offset: "1"}} >
			    <div className="animated fadeInX" style={{ marginTop: "40px"}}>
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