import React from 'react';
import { Row, Col, ButtonGroup, FormGroup } from 'reactstrap';
import { Condition1, Condition2, Condition3, Condition4} from './ConditionSetting';
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

const buttonStyle = (color) => {
	return({
		paddingTop: "5px",
		paddingBottom: "5px",
		border: "2px solid " + color,
		color: color,
    backgroundColor: "transparent",
	})
}

const ConditionGroup = (props) => {
	const arr = ["Condition 1", "Condition 2", "Condition 3", "Condition 4"];
	const btnLists = arr.map((btnList, i) => 
		<div className="w-100 mt-2" key={"Rule" + i}>
		  <button type="button" className="btn ml-0" style={buttonStyle(props.color)}
		 		data-toggle="collapse" data-target={"#condition" + (i + 1)}>
		  	<span style={{ color: props.color}}>
		  		{"Rule " + (i + 1)}
	  		</span>
		  </button>
		  { 
        ( i==0 && <Condition1 onAddCondition1={props.onAddCondition1} stations={props.stations} /> ) || 
        ( i==1 && <Condition2 onAddCondition2={props.onAddCondition2} stations={props.stations} /> ) || 
	  		( i==2 && <Condition3 onAddCondition3={props.onAddCondition3} /> ) || 
        ( i==3 && <Condition4 onAddCondition4={props.onAddCondition4} /> ) 
      }
	 	</div>
	)
	return(
		<ButtonGroup id="ConditionGroup" vertical className="mt-2 px-3" style={{width: "100%"}}>
			{btnLists}
		</ButtonGroup>
	)
}

const RuleItem = (props) => {
  if(props.rule.condition == 1){
    const stationName = props.stations.filter(station => station.SID == props.rule.SID)[0].name.ch
    return(
      <li className="mt-2" style={ruleStyle}>
        <span>抵達 <b>{ stationName }</b> 站前 <b>{ props.rule.distance }</b> 公尺，進行廣播 </span>
        <i style={{ cursor: "pointer"}} className="icon-trash my-auto" onClick={()=>props.onDelCondition(props.rule.RID)}></i>
      </li> 
    )
  }else if(props.rule.condition == 2){
    const stationName = props.stations.filter(station => station.SID == props.rule.SID)[0].name.ch
    return(
      <li className="mt-2" style={ruleStyle}>
        <span>抵達 <b>{ stationName }</b> 站前 <b>{ props.rule.value }</b> { props.rule.type==0 ? "公尺" : "秒" }，進行廣播 </span>
        <i style={{ cursor: "pointer"}} className="icon-trash my-auto" onClick={()=>props.onDelCondition(props.rule.RID)}></i>
      </li>
    )
  }else if(props.rule.condition == 3){
    return(
      <li className="mt-2" style={ruleStyle}>
        <span>和下一站距離 <b>{ props.rule.distance }</b> 公尺，進行廣播</span>
        <i style={{ cursor: "pointer"}} className="icon-trash my-auto" onClick={()=>props.onDelCondition(props.rule.RID)}></i>
      </li>        
    )
  }else {
    return(
      <li className="mt-2" style={ruleStyle}>
        <span>每隔 <b>{ props.rule.interval }</b> 秒，進行廣播</span>
        <i style={{ cursor: "pointer"}} className="icon-trash my-auto" onClick={()=>props.onDelCondition(props.rule.RID)}></i>
      </li>  
    )
  }
}

const RuleList = (props) => {
  return (
    <ul className="mt-1 px-1" style={ruleGroupStyle}>
      {
        props.rules.map((rule, index) => 
          <RuleItem key={"rule" + index} rule={rule} stations={props.stations} 
            onDelCondition={props.onDelCondition}/>
        )
      }
    </ul>
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
						<ConditionGroup color = {this.props.color} 
              onAddCondition1 = {this.props.onAddCondition1}
              onAddCondition2 = {this.props.onAddCondition2}
              onAddCondition3 = {this.props.onAddCondition3}
              onAddCondition4 = {this.props.onAddCondition4}
              stations = {this.props.stations}
            />
	        </FormGroup>
				</Col>
				<Col sm={{size: "5", offset: "1"}} >
					<span>Rules</span><br/>
          <RuleList rules = {this.props.rules} 
            stations = {this.props.stations}
            onDelCondition = {this.props.onDelCondition}
          />
				</Col>
     	</Row>
		)
	}
}

Condition.defaultProps = {
  color: "#c48c31"
};