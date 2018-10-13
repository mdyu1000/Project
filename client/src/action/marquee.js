export const ADD_MARQUEE = "ADD_MARQUEE"
export const DEL_MARQUEE = "DEL_MARQUEE"
export const SET_MARQUEE = "SET_MARQUEE"

export function addMarquee(){
	return {
		type: ADD_MARQUEE,
	}
}

export function delMarquee(ID){
	return {
		type: DEL_MARQUEE,
		ID
	}
}

export function setMarquee(ID, content){
	return {
		type: SET_MARQUEE,
		ID,
		content
	}
}