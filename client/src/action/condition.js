export const ADD_CONDITION_ONE = "ADD_CONDITION_ONE"
export const ADD_CONDITION_TWO = "ADD_CONDITION_TWO"
export const ADD_CONDITION_THREE = "ADD_CONDITION_THREE"
export const DEL_CONDITION = "DEL_CONDITION"

export function AddConditionOne(SID, distance){
  return {
    type: ADD_CONDITION_ONE,
    SID,
    distance
  }
}

export function AddConditionTwo(distance){
  return {
    type: ADD_CONDITION_TWO,
    distance
  }
}

export function AddConditionThree(interval){
  return {
    type: ADD_CONDITION_THREE,
    interval
  }
}

export function DelCondition(RID){
  return {
    type: DEL_CONDITION,
    RID
  }
}