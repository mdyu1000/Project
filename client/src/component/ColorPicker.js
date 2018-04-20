import React from 'react';
import { Col, FormGroup } from 'reactstrap';
import { TwitterPicker  } from 'react-color';

export default class ColorPicker extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			colors: ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'],
		}
    this.handleColorChange = this.handleColorChange.bind(this);
	}

  handleColorChange(color, event){
    this.props.onColorChange(color.hex);
  }

	render() {
		return(
      <Col sm={{ size: "5", offset: "1"}}>
        <FormGroup>
          <span>Color</span><br/>
          <TwitterPicker triangle="hide" className="mx-auto mt-2" 
          	onChange={this.handleColorChange} colors={this.state.colors}/>
        </FormGroup>
      </Col>
		)
	}
}