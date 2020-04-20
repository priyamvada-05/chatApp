export const startGettingUserDataFromDatabase= (object)=>{
	return({
		type: 'START_GETTING_USER_DATA_FROM_DATABASE',
		payload: object
	})
}

export const successfullGettingUserDataFromDatabase= (object)=>{
	return({
		type: 'SUCCESSFULL_GETTING_USER_DATA_FROM_DATABASE',
		payload: object
	})
}

export const errorGettingUserDataFromDatabase= (object)=>{
	return({
		type: 'ERROR_GETTING_USER_DATA_FROM_DATABASE',
		payload: object
	})
}

export const startGettingSelectedUserDataFromDatabase= (object)=>{
	return({
		type: 'START_GETTING_SELECTED_USER_DATA_FROM_DATABASE',
		payload: object
	})
}

export const successfullGettingSelectedUserDataFromDatabase= (object)=>{
	return({
		type: 'SUCCESSFULL_GETTING_SELECTED_USER_DATA_FROM_DATABASE',
		payload: object
	})
}

export const errorGettingSelectedUserDataFromDatabase= (object)=>{
	return({
		type: 'ERROR_GETTING_SELECTED_USER_DATA_FROM_DATABASE',
		payload: object
	})
}

export const startGettingSelectedUserMessageFromDatabase= (object)=>{
	return({
		type: 'START_GETTING_SELECTED_USER_MESSAGE_FROM_DATABASE',
		payload: object
	})
}

export const successfullGettingSelectedUserMessageFromDatabase= (object)=>{
	return({
		type: 'SUCCESSFULL_GETTING_SELECTED_USER_MESSAGE_FROM_DATABASE',
		payload: object
	})
}

export const errorGettingSelectedUserMessageFromDatabase= (object)=>{
	return({
		type: 'ERROR_GETTING_SELECTED_USER_MESSAGE_FROM_DATABASE',
		payload: object
	})
}

export const startVideoCalling= ()=>{
	return({
		type: 'START_VIDEO_CALLING'
	})
}

export const stopVideoCall= ()=>{
	return({
		type: 'STOP_VIDEO_CALLING'
	})
}

