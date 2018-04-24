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

const ModalFooter = () => {
	return (
  	<div class="modal-footer">
      <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary btn-sm">Save</button>
    </div>
	)
}

const SortableItem = SortableElement(({value}) =>
  <li>{value}</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
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
		// this.handleSortEnd = this.handleSortEnd.bind(this);
    console.log(this.state.tempLists);
	}

  onSortEnd = ({oldIndex, newIndex}) => {
  	this.props.onSortStation(arrayMove(this.state.items, oldIndex, newIndex));
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };

	render() {
    console.log(this.state.items);
		return (
      <div class="modal fade" id="exampleModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
          	<ModalHeader />
            <div class="modal-body">
            	<Row>
            		<Col sm="5">
									<SortableList items={this.props.stations} onSortEnd={this.onSortEnd} />
            		</Col>
            		<Col sm="7">

            		</Col>
            	</Row>
            </div>
            <ModalFooter />
          </div>
        </div>
      </div>
		)
	}
}