const INITIAL_STATE={
	loadingUserDeatil: false,
	userDetail: null,
	errorUserDetail: null,
	loadingSelectedUserDeatil: false,
	selectedUserDetail: null,
	errorSelectedUserDetail: null,
	startVideoCalling: false
}

const sampleDataReducer = (state=INITIAL_STATE, action)=>{

	switch(action.type){

		case 'START_GETTING_USER_DATA_FROM_DATABASE' : 
			return({
				...state,
				loadingUserDeatil: true
			})

		case 'SUCCESSFULL_GETTING_USER_DATA_FROM_DATABASE' : 
			return({
				...state,
				loadingUserDeatil: false,
				userDetail: action.payload
			})

		case 'ERROR_GETTING_USER_DATA_FROM_DATABASE' : 
			return({
				...state,
				loadingUserDeatil: false,
				errorUserDetail: action.payload
			})

		case 'START_GETTING_SELECTED_USER_DATA_FROM_DATABASE' : 
			return({
				...state,
				loadingSelectedUserDeatil: true,
				selectedUserDetail: null,
				errorSelectedUserDetail: null
			})

		case 'SUCCESSFULL_GETTING_SELECTED_USER_DATA_FROM_DATABASE' : 
			return({
				...state,
				loadingSelectedUserDeatil: false,
				selectedUserDetail: action.payload
			})

		case 'ERROR_GETTING_SELECTED_USER_DATA_FROM_DATABASE' : 
			return({
				...state,
				loadingSelectedUserDeatil: false,
				errorSelectedUserDetail: action.payload
			})

		case 'START_VIDEO_CALLING' : 
			return({
				...state,
				startVideoCalling: true
			})

		case 'STOP_VIDEO_CALLING' : 
			return({
				...state,
				startVideoCalling: false
			})
		

		default :
			return(state)
	}
}

export default sampleDataReducer