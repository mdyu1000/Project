import { connect } from 'react-redux'
import Condition from '../component/Condition'
import {
  AddConditionOne,
  AddConditionTwo,
  AddConditionThree,
  DelCondition,
} from '../action/condition'

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCondition1: (SID, distance) => {
      dispatch(AddConditionOne(SID, distance))
    },
    onAddCondition2: (distance) => {
      dispatch(AddConditionTwo(distance))
    },
    onAddCondition3: (interval) => {
      dispatch(AddConditionThree(interval))
    },
    onDelCondition: (RID) => {
      dispatch(DelCondition(RID))
    },  
  }
}

const mapStateToProps = (state) => {
  return {
    rules: state.rules,
    stations: state.stations,
    color: state.demoColor
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Condition)