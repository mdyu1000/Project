import React from 'react'
import { connect } from 'react-redux'
import RouteList from '../component/RouteList'
import {
  FetchRoute
} from '../action/newRoute'

class RouteListContainer extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.FetchRoute()    
  }

  render(){    
    return(
      <RouteList allRoute={this.props.allRoute} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    FetchRoute: () => {
      dispatch(FetchRoute())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    allRoute: state.allRoute,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteListContainer)