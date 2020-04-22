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

export const setSocket= (socketObj)=>{
	return({
		type: 'SET_SOCKET',
		payload: socketObj
	})
}

export const logoutUser= ()=>{
	return({
		type: 'LOGOUT'
	})
}

export const startGettingRefUserDataFromDatabase= (object)=>{
	return({
		type: 'START_GETTING_REF_USER_DATA_FROM_DATABASE',
		payload: object
	})
}

export const successfullGettingRefUserDataFromDatabase= (object)=>{
	return({
		type: 'SUCCESSFULL_GETTING_REF_USER_DATA_FROM_DATABASE',
		payload: object
	})
}

export const errorGettingUserRefDataFromDatabase= (object)=>{
	return({
		type: 'ERROR_GETTING_REF_USER_DATA_FROM_DATABASE',
		payload: object
	})
}

export const startUploadingUserDataFromDatabase= (object)=>{
	return({
		type: 'START_UPLOADING_USER_DATA_FROM_DATABASE',
		payload: object
	})
}

export const successfullUploadingUserDataFromDatabase= (object)=>{
	return({
		type: 'SUCCESSFULL_UPLOADING_USER_DATA_FROM_DATABASE',
		payload: object
	})
}

export const errorUploadingUserDataFromDatabase= (object)=>{
	return({
		type: 'ERROR_UPLOADING_USER_DATA_FROM_DATABASE',
		payload: object
	})
}