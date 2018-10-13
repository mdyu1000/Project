export const ADD_MARQUEE = "ADD_MARQUEE"
export const DEL_MARQUEE = "DEL_MARQUEE"

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