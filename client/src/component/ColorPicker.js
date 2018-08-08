import React from 'react';
import { Col, FormGroup } from 'reactstrap';
import { TwitterPicker  } from 'react-color';
import ColorModal from './ColorModal';

export default class ColorPicker extends React.Component {
	constructor(props){
		super(props);
	}

  handleColorChange = (color, event) =>{
    this.props.onColorChange(color.hex);
  }

	render() {
		return(
      <div>
        <FormGroup>
          <span>
            Color
            <i type="button" data-toggle="modal" data-target="#colorModal" className="icon-note ml-2" 
              style={{ cursor: "pointer", WebkitAppearance: "initial"}}></i>
          </span><br/>
          <TwitterPicker triangle="hide" className="mx-auto mt-2" 
          	onChange={this.handleColorChange} colors={this.props.colors}/>
        </FormGroup>
        <ColorModal colors={this.props.colors} 
          onAddColor={this.props.onAddColor} 
          onDelColor={this.props.onDelColor} />
      </div>
		)
	}
}