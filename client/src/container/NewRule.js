import { connect } from 'react-redux'
import Condition from '../component/Condition'
import {
  DelCondition,
  AddConditionTitle,
  DelConditionTitle
} from '../action/condition'

const mapDispatchToProps = (dispatch) => {
  return {
    onDelCondition: (RID) => {
      dispatch(DelCondition(RID))
    },  
    onAddConditionTitle: (language, title) => {
      dispatch(AddConditionTitle(language, title))
    },
    onDelConditionTitle: language => {
      dispatch(DelConditionTitle(language))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    rule: state.rule,
    rules: state.rules,
    stations: state.stations,
    color: state.demoColor
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Condition)