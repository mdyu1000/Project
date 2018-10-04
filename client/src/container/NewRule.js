import { connect } from 'react-redux'
import Condition from '../component/Condition'
import {
  DelCondition,
  AddConditionTitle,
  DelConditionTitle,
  UploadStationBroadcaseImg,
  addCondition1,
  addCondition2,
  addCondition3,
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
    },
    UploadStationBroadcaseImg: file => {
      dispatch(UploadStationBroadcaseImg(file))
    },
    addCondition1: (SID, distance, content) => {
      dispatch(addCondition1(SID, distance, content))
    },
    addCondition2: (distance, content) => {
      dispatch(addCondition2(distance, content))
    },
    addCondition3: (interval, content) => {
      dispatch(addCondition3(interval, content))
    },
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