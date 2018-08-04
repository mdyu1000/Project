import React from 'react';
import { CirclePicker, ChromePicker, SliderPicker } from 'react-color';

const ModalHeader = () => {
  return (
    <div className="modal-header">
      <h5 className="modal-title my-auto">Edit Colors</h5>
      <button type="button" className="close" data-dismiss="modal">
        <span>&times;</span>
      </button>
    </div>
  )
}

const ModalFooter = (props) => {
  return (
    <div className="modal-footer">
      <button type="button" className="btn btn-danger btn-sm mr-3" onClick={props.onDel}> Delete </button>
      <button type="button" className="btn btn-success btn-sm mr-3" onClick={props.onAdd}> Add </button>
    </div>
  )
}

// var color_hex = ""

export default class ColorModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      color_hex: "#000",
      selectedColor: ""
    }
  }

  handleDelColor = () => {
    this.props.onDelColor(this.state.selectedColor)
  }

  handleAddColor = () => {
    this.props.onAddColor(this.state.color_hex)
  }

  handleChangeComplete = (color, event) => {
    this.setState({
      color_hex: color.hex
    })
  };

  handleSelectedColor = (color) => {
    this.setState({
      selectedColor: color.hex
    })
  }

  render(){
    return (
      <div className="modal fade" id="colorModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <ModalHeader />
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <CirclePicker colors={this.props.colors} width="100%" onChange={this.handleSelectedColor} />
                </div>
                <div className="col-12 mt-3" style={{borderBottom: "1px solid rgb(238, 238, 238)"}}></div>
              </div>
              <div className="row mt-4">
                <div className="col-12">
                  <SliderPicker onChangeComplete={ this.handleChangeComplete } color={this.state.color_hex} />
                </div>
              </div>
            </div>
            <ModalFooter onAdd={ this.handleAddColor } 
              onDel={this.handleDelColor} />
          </div>
        </div>
      </div>
    )
  }
}
