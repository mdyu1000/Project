export const ADD_CONDITION_ONE = "ADD_CONDITION_ONE"
export const ADD_CONDITION_TWO = "ADD_CONDITION_TWO"
export const ADD_CONDITION_THREE = "ADD_CONDITION_THREE"
export const ADD_CONDITION_FOUR = "ADD_CONDITION_FOUR"
export const DEL_CONDITION = "DEL_CONDITION"

export function AddConditionOne(SID, distance){
  return {
    type: ADD_CONDITION_ONE,
    SID,
    distance
  }
}

export function AddConditionTwo(SID, typeID, value){
  return {
    type: ADD_CONDITION_TWO,
    SID,
    typeID,
    value
  }
}

export function AddConditionThree(distance){
  return {
    type: ADD_CONDITION_THREE,
    distance
  }
}

export function AddConditionFour(interval){
  return {
    type: ADD_CONDITION_FOUR,
    interval
  }
}

export function DelCondition(RID){
  return {
    type: DEL_CONDITION,
    RID
  }
}