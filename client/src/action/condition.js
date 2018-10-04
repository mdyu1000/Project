export const DEL_CONDITION = "DEL_CONDITION"

export const ADD_CONDITION_TITLE = "ADD_CONDITION_TITLE"
export const DEL_CONDITION_TITLE = "DEL_CONDITION_TITLE"

export const UPLOAD_STAION_BROADCAST_IMG = "UPLOAD_STAION_BROADCAST_IMG"
export const RECEIVE_BROADCAST_IMG = "RECEIVE_BROADCAST_IMG"

export const ADD_CONDITION_1 = "ADD_CONDITION_1"
export const ADD_CONDITION_2 = "ADD_CONDITION_2"
export const ADD_CONDITION_3 = "ADD_CONDITION_3"

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

export const UploadStationBroadcaseImg = file => dispatch =>{
  const formData = new FormData();

  formData.append('image', file);
  // formData.append('album', '0cNHne8');  

  return fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: new Headers({
      Authorization: "Client-ID 70796d8b8a87835"
    }),
    body: formData
  })
  .then(response => response.json())
  .then(responseJson => {
    dispatch(receiveBroadcastImg(responseJson))
  })
}

function receiveBroadcastImg(response){
  if(response.success){
    return {
      type: RECEIVE_BROADCAST_IMG,
      data: {
        url: response.data.link,
        isChecked: true
      }
    }
  }else{
    return {
      type: RECEIVE_BROADCAST_IMG,
      data: {
        url: "",
        isChecked: false
      }
    }
  }
}

export const addCondition1 = (SID, distance, content) => {
  return {
    type: ADD_CONDITION_1,
    SID,
    distance,
    content
  }
}

export const addCondition2 = (distance, content) => {
  return {
    type: ADD_CONDITION_2,
    distance,
    content
  }
}

export const addCondition3 = (interval, content) => {
  return {
    type: ADD_CONDITION_3,
    interval,
    content
  }
}