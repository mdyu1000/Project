import React from 'react';
import { CirclePicker, SliderPicker  } from 'react-color';

const ModalHeader = () => {
  return (
    <div class="modal-header">
      <h5 class="modal-title my-auto">Edit Colors</h5>
      <button type="button" class="close" data-dismiss="modal">
        <span>&times;</span>
      </button>
    </div>
  )
}

const ModalFooter = (props) => {
  return (
    <div class="modal-footer">
      <button type="button" class="btn btn-danger btn-sm mr-3">
        Delete
      </button>
      <button type="button" class="btn btn-success btn-sm mr-3">
        Add
      </button>
      <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">
        Save
      </button>
    </div>
  )
}


export default class ColorModal extends React.Component {
  constructor(props){
    super(props);
    this.testClick = this.testClick.bind(this);
  }

  testClick(color, event){
    console.log(color.rgb);
  }

  render(){
    return (
      <div className="modal fade" id="colorModal" tabindex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <ModalHeader />
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <CirclePicker colors={this.props.colors} width="100%"/>
                </div>
                <div className="col-12 mt-3" style={{borderBottom: "1px solid rgb(238, 238, 238)"}}></div>
              </div>
              <div className="row mt-4">
                <div className="col-12">
                  <SliderPicker onChangeComplete = { this.testClick }/>
                </div>
              </div>
            </div>
            <ModalFooter />
          </div>
        </div>
      </div>
    )
  }
}
