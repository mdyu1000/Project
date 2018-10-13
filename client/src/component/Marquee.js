import React from 'react';

export default class Marquee extends React.Component{
	constructor(props){
		super(props)
		this.setMarquee = this.setMarquee.bind(this)
	}

	setMarquee(ID){
		let content = document.getElementById(`marquee${ID}`).value
		this.props.onSetMarquee(ID, content)
	}

	render(){
		return (
			<div className="row">
				<div className="col-11">
					<span>
						Marquee
          	<i type="button" className="icon-plus ml-2" style={{ cursor: "pointer", WebkitAppearance: "initial"}} 
          		onClick={this.props.onAddMarquee}>
        		</i>
					</span>
					{
						this.props.marquee.map((marquee, index) => 
							<div key={`marquee${index}`} style={{position: "relative"}}>
								<textarea id={`marquee${marquee.ID}`} className="w-100 mt-2 rounded marquee" rows="2" 
									onChange={ () => this.setMarquee(marquee.ID)} value={marquee.content}
								>
								</textarea>
								<i className="icon-trash" style={{position: "absolute", left: "-17px", top: "24px", cursor: "pointer"}}
									onClick={ () => this.props.onDelMarquee(marquee.ID)}>
								</i>
							</div>
						)
					}
				</div>
			</div>
		)
	}
}