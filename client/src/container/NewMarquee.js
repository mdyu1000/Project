import React from 'react'
import { connect } from 'react-redux'
import Marquee from '../component/Marquee'
import {
	addMarquee,
	delMarquee,
  setMarquee
} from '../action/marquee'

class NewMarquee extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <Marquee
        marquee={this.props.marquee}

        onAddMarquee={this.props.onAddMarquee}
        onDelMarquee={this.props.onDelMarquee}
        onSetMarquee={this.props.onSetMarquee}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddMarquee: () => {
      dispatch(addMarquee())
    },  
    onDelMarquee: ID => {
    	dispatch(delMarquee(ID))
    },
    onSetMarquee: (ID, content) => {
      dispatch(setMarquee(ID, content))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    marquee: state.marquee,

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMarquee)