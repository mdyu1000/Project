import React from 'react'
import { FormGroup, Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class StationUploadImg extends React.Component {
	constructor(props){
		super(props)
		this.fileInput = React.createRef();
		this.handleUploadImg = this.handleUploadImg.bind(this)
	}

	handleUploadImg(){
		try {
			let file = this.fileInput.current.files[0]
			let reader = new FileReader();
			reader.readAsDataURL(file)
			reader.onload = () =>{
				let imgBase64 = reader.result
				this.props.UploadStationBroadcaseImg(imgBase64)
			}
		} catch(error){
			alert("upload a image")
		}
	}

	render(){
		return (
			<FormGroup>
				<div>Broadcast</div>
				<div className="d-flex justify-content-around mt-2">
					<input type="file" id="imgurUpload" ref={this.fileInput} accept="image/*" />
					<div className="my-auto" style={{cursor: "pointer"}} onClick={this.handleUploadImg}>
						<FontAwesomeIcon icon="upload" />
					</div>
				</div>
			</FormGroup>
		)
	}

}