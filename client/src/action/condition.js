export const DEL_CONDITION = "DEL_CONDITION"

export const ADD_CONDITION_TITLE = "ADD_CONDITION_TITLE"
export const DEL_CONDITION_TITLE = "DEL_CONDITION_TITLE"

export function DelCondition(RID){
  return {
    type: DEL_CONDITION,
    RID
  }
}

export function AddConditionTitle(language, title){
  return {
    type: ADD_CONDITION_TITLE,
    language,
    title
  }
}

export function DelConditionTitle(language) {
  return {
    type: DEL_CONDITION_TITLE,
    language
  }
}