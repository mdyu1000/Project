import React from 'react'
import { connect } from 'react-redux'
import RouteList from '../component/RouteList'
import {
  FetchAllRoute,
  GetRouteRID,
  FetchOneRoute,
} from '../action/newRoute'

class RouteListContainer extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.FetchAllRoute()    
  }

  render(){    
    return(
      <RouteList allRoute={this.props.allRoute} 
        edit_RID={this.props.edit_RID}
        GetRouteRID={this.props.GetRouteRID} 
        FetchOneRoute={this.props.FetchOneRoute} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    FetchAllRoute: () => {
      dispatch(FetchAllRoute())
    },
    GetRouteRID: (SID) => {
      dispatch(GetRouteRID(SID))
    },
    FetchOneRoute: (RID) => {
      dispatch(FetchOneRoute(RID))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    allRoute: state.allRoute,
    edit_RID: state.edit_RID,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteListContainer)