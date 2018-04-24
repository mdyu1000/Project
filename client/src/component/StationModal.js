import React from 'react';
import { Col, Row, } from 'reactstrap';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import StationTimeLine from './StationTimeLine';

const ModalHeader = () => {
	return (
    <div class="modal-header">
      <h5 class="modal-title my-auto">Edit Stations</h5>
      <button type="button" class="close" data-dismiss="modal">
        <span>&times;</span>
      </button>
    </div>
	)
}

const ModalFooter = (props) => {
	return (
  	<div class="modal-footer">
      <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" onClick={props.onSave}>Save</button>
    </div>
	)
}

const stationStyle = {
  listStyleType: "none",
  height: "300px",
  border: "none",
  overflowY: "scroll",
  overflowX: "hidden",
}

const timeLineStyle = {
	borderRadius: "5px",
	border: "1px solid rgb(161, 102, 44)",
  display: "flex",
  justifyContent: "space-between",
  padding: "0.75rem 1.25rem",
}

const SortableItem = SortableElement(({value}) =>
  <li style={ timeLineStyle } className="mt-1">
  	{value}
  	<i style={{ cursor: "pointer"}} class="fa fa-remove my-auto"></i>
	</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul style={stationStyle} className="pl-0 pr-2">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

export default class StationModal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			items: this.props.stations,
		}
		this.handleSave = this.handleSave.bind(this);
	}

	handleSave(){
  	this.props.onSortStation(this.state.items);
	};

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };

	render() {
		return (
      <div class="modal fade" id="exampleModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
          	<ModalHeader />
            <div class="modal-body">
            	<Row>
            		<Col sm="5">
									<SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
            		</Col>
            		<Col sm="7">
            		</Col>
            	</Row>
            </div>
            <ModalFooter onSave={this.handleSave}/>
          </div>
        </div>
      </div>
		)
	}
}