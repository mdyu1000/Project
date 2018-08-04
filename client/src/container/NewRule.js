import { connect } from 'react-redux'
import Condition from '../component/Condition'
import {
  AddConditionOne,
  AddConditionTwo,
  AddConditionThree,
  AddConditionFour,
  DelCondition,
} from '../action/condition'

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCondition1: (SID, distance) => {
      dispatch(AddConditionOne(SID, distance))
    },
    onAddCondition2: (SID, type, value) => {
      dispatch(AddConditionTwo(SID, type, value))
    },
    onAddCondition3: (distance) => {
      dispatch(AddConditionThree(distance))
    },
    onAddCondition4: (interval) => {
      dispatch(AddConditionFour(interval))
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