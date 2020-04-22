const INITIAL_STATE={
	loadingUserDeatil: false,
	userDetail: null,
	errorUserDetail: null,
	loadingSelectedUserDeatil: false,
	selectedUserDetail: null,
	errorSelectedUserDetail: null,
	startVideoCalling: false,
	socket: null,
	loadingRefUserDeatil: false,
	refUserDetail: null,
	errorRefUserDetail: null,
	loadingSignUp: false,
	userSignUpDetail: null,
	errorUserSignupDetail: null,

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

		case 'SET_SOCKET' : 
			return({
				...state,
				socket: action.payload
			})

		case 'LOGOUT' : 
			return({
				loadingUserDeatil: false,
				userDetail: null,
				errorUserDetail: null,
				loadingSelectedUserDeatil: false,
				selectedUserDetail: null,
				errorSelectedUserDetail: null,
				startVideoCalling: false,
				socket: null
			})

		case 'START_GETTING_REF_USER_DATA_FROM_DATABASE' : 
			return({
				...state,
				loadingRefUserDeatil: true
			})

		case 'SUCCESSFULL_GETTING_REF_USER_DATA_FROM_DATABASE' : 
			return({
				...state,
				loadingRefUserDeatil: false,
				refUserDetail: action.payload
			})

		case 'ERROR_GETTING_REF_USER_DATA_FROM_DATABASE' : 
			return({
				...state,
				loadingRefUserDeatil: false,
				errorRefUserDetail: action.payload
			})

		case 'START_UPLOADING_USER_DATA_FROM_DATABASE' : 
			return({
				...state,
				loadingSignUp: true
			})

		case 'SUCCESSFULL_UPLOADING_USER_DATA_FROM_DATABASE' : 
			return({
				...state,
				loadingSignUp: false,
				userSignUpDetail: action.payload
			})

		case 'ERROR_UPLOADING_USER_DATA_FROM_DATABASE' : 
			return({
				...state,
				loadingSignUp: false,
				errorUserSignupDetail: action.payload
			})

		default :
			return(state)
	}
}

export default sampleDataReducer