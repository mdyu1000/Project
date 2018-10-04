import React from 'react'
import InputText from './InputText'
import '../CSS/conditionGroup.css'

const inputNumberStyle = {
  textAlign: "center",
  width: "65px",
  border: 0,
  outline: 0,
  background: "transparent",
  borderBottom: "1px solid"
}

const StationOption = props => {
  return (  
    props.stations.go.length != 0 &&
    props.stations.go.map((station, index) =>
      <option key={station + index} value={station.name.ch} data-sid={station.SID}>{station.name.ch}</option>
    )
  )
}

const Condition1 = props => {
	return (
    <div className="mt-4">
      <div className="mb-1">Condition</div>
      <span className="card-text">抵達 
        <select id="C1_station" className="mx-1 browser-default d-inline">
          <option disabled value='' selected className="d-none"></option>
          <StationOption stations={props.stations} />
        </select>站前 
        <input id="C1_distance" type="number" style={inputNumberStyle} max="6000" min="0" size="35"/>公尺，進行廣播
      </span>
    </div>
	)
}

const Condition2 = props => {
	return (
    <div className="mt-4">
      <div className="mb-1">Condition</div>
      <span className="card-text">和下一站距離 
        <input id="C2_distance" type="number" style={inputNumberStyle} className="border-bottom" max="6000" min="0"/> 
        公尺，進行廣播
      </span>
    </div>
	)
}

const Condition3 = props => {
	return (
    <div className="mt-4">
      <div className="mb-1">Condition</div>
      <span className="card-text">每隔 
        <input id="C3_interval" type="number" style={inputNumberStyle} max="600" min="0"/> 
        秒時，進行廣播
      </span>    
    </div>
	)
}

export default class ConditionModal extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			content: {},
		}
		this.fileInput = React.createRef();
		this.handleNewCondition = this.handleNewCondition.bind(this)
		this.handleUploadImg = this.handleUploadImg.bind(this)
		this.checkTitleAndContent = this.checkTitleAndContent.bind(this)
		this.setContent = this.setContent.bind(this)
		this.clearModal = this.clearModal.bind(this)
	}

	handleUploadImg(){
		let file = this.fileInput.current.files[0]
		this.props.UploadStationBroadcaseImg(file)
	}

	checkTitleAndContent(title, contentCh, contentEn){
		if(Object.keys(title).length == 0 && contentCh.value == '' && contentEn.value == ''){
			return true
		}else{
			if(!title.hasOwnProperty("ch") || !title.hasOwnProperty("en")) return false
			else if(contentCh.value == '' || contentEn.value == '') return false
			else return true
		}
	}

	setContent(title, contentCh, contentEn){
		return ({
			title: title == '' ? {} : {
				ch: title.ch,
				en: title.en,
			},
			content: (contentCh == '' && contentEn == '') ? {} : {
				ch: contentCh.value,
				en: contentEn.value,
			},
			image: this.props.rule.image
		})
	}

	handleNewCondition(){
		let title = this.props.rule.title
		let contentCh = document.getElementById("broadcast-content-ch")
		let contentEn = document.getElementById("broadcast-content-en")

		/* Check Title and Content */
		if(!this.checkTitleAndContent(title, contentCh, contentEn)) {
			alert("Title and content must have both Chinese and English fields")
		}

		else if(this.props.conditionIndex == 1){
			let e = document.getElementById("C1_station")
			let station = e.options[e.selectedIndex].value
			let distance = Number(document.getElementById("C1_distance").value)
			if(station == '' || distance == '') {
				alert("Condition format error")
			}else {
				let SID = this.props.stations.go.filter(item => item.name.ch == station)[0].SID
				this.props.addCondition1(SID, distance, this.setContent(title, contentCh, contentEn))
				this.clearModal()
			}
		}

		else if(this.props.conditionIndex == 2){
			let distance = Number(document.getElementById("C2_distance").value)
			if(distance == '') {
				alert("Condition format error")
			}else{
				this.props.addCondition2(distance, this.setContent(title, contentCh, contentEn))
				this.clearModal()
			}
		}

		else if(this.props.conditionIndex == 3){
			let interval = Number(document.getElementById("C3_interval").value)
			if(interval == '') {
				alert("Condition format error")
			}else{
				this.props.addCondition3(interval, this.setContent(title, contentCh, contentEn))
				this.clearModal()
			}
		}
	}

	clearModal(){
		document.getElementById("broadcast-content-ch").value = ''
		document.getElementById("broadcast-content-en").value = ''
		document.getElementById("broadcast-img").value = ''
	}

	render(){
		return (
	    <div className="modal fade" id="conditionModal" tabIndex="-1" role="dialog" >
	      <div className="modal-dialog" role="document">
	        <div className="modal-content">
	          <div className="modal-header">
	            <h5 className="modal-title">Condition {this.props.conditionIndex}</h5>
	            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	              <span aria-hidden="true">&times;</span>
	            </button>
	          </div>
	          <div className="modal-body">
	            <div>
	              <InputText title="Title" name="condition" 
	              	onAdd={this.props.onAddConditionTitle}
	              	onDel={this.props.onDelConditionTitle}
	              	lists={this.props.rule.title}
	              />
	            </div>
	            <div>
	              <div>Content</div>
	              <div>
	                <textarea id="broadcast-content-ch" className="w-100 rounded mt-2" placeholder="請輸入中文介紹" />
	                <textarea id="broadcast-content-en" className="w-100 rounded mt-2" placeholder="Please enter the introduction in English" />
	              </div>
	            </div>
	            <div className="mt-2">
	              <div>Image</div>
	              <input id="broadcast-img" className="mt-1" type="file" 
	              	ref={this.fileInput} accept="image/*"  
	              	onChange={this.handleUploadImg}
              	/>
	            </div>
	            {
	            	this.props.conditionIndex == 1 &&
	            	<Condition1 stations={this.props.stations} />
	            }
	            {
	            	this.props.conditionIndex == 2 &&
	            	<Condition2 />
	            }
	            {
	            	this.props.conditionIndex == 3 &&
	            	<Condition3 />
	            }
	          </div>
	          <div className="modal-footer">
	            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
	            <button type="button" className="btn btn-primary" onClick={this.handleNewCondition}>
	            	New
            	</button>
	          </div>
	        </div>
	      </div>
	    </div>
		)
	}
}