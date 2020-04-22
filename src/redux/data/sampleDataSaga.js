import { takeEvery, call, put, takeLatest} from 'redux-saga/effects';
import { successfullGettingUserDataFromDatabase, errorGettingUserDataFromDatabase, successfullGettingSelectedUserDataFromDatabase, errorGettingSelectedUserDataFromDatabase, successfullGettingRefUserDataFromDatabase, errorGettingUserRefDataFromDatabase
			,successfullUploadingUserDataFromDatabase, errorUploadingUserDataFromDatabase} from './sampleDataAction';

export function* startGettingDataForTable(){
	yield takeLatest('START_GETTING_USER_DATA_FROM_DATABASE', startGettingDataFromDatabaseAsync)
}

function* startGettingDataFromDatabaseAsync({payload}){
	try{
		console.log(payload)
		const response= yield fetch('/api/v1/application/data/viewUser', {
			method: 'POST',
			headers :{
				'Content-Type': 'application/json'
				},
			body: JSON.stringify(payload)

		})

		const data= yield response.json();
		yield put(successfullGettingUserDataFromDatabase(data))
	}
	catch(error){
		yield put(errorGettingUserDataFromDatabase(error))
	}

}

export function* startGettingSelectedUserFromDatabase(){
	yield takeLatest('START_GETTING_SELECTED_USER_DATA_FROM_DATABASE', startGettingSelectedUserDetailFromDatabaseAsync)
}

function* startGettingSelectedUserDetailFromDatabaseAsync({payload}){
	try{
		console.log(payload)
		const response= yield fetch('/api/v1/application/data/viewSelectedUser', {
			method: 'POST',
			headers :{
				'Content-Type': 'application/json'
				},
			body: JSON.stringify(payload)

		})

		const data= yield response.json();
		yield put(successfullGettingSelectedUserDataFromDatabase(data))
	}
	catch(error){
		yield put(errorGettingSelectedUserDataFromDatabase(error))
	}

}

export function* startGettingRefDataForTable(){
	yield takeLatest('START_GETTING_REF_USER_DATA_FROM_DATABASE', startGettingRefDataFromDatabaseAsync)
}

function* startGettingRefDataFromDatabaseAsync({payload}){
	try{
		console.log(payload)
		const response= yield fetch('/api/v1/application/data/addUserByRef', {
			method: 'POST',
			headers :{
				'Content-Type': 'application/json'
				},
			body: JSON.stringify(payload)

		})

		const data= yield response.json();
		yield put(successfullGettingRefUserDataFromDatabase(data))
	}
	catch(error){
		yield put(errorGettingUserRefDataFromDatabase(error))
	}

}

export function* startUploadingDataForTable(){
	yield takeLatest('START_UPLOADING_USER_DATA_FROM_DATABASE', startUploadingDataFromDatabaseAsync)
}

function* startUploadingDataFromDatabaseAsync({payload}){
	try{
		console.log(payload)
		const response= yield fetch('/api/v1/application/data/addUserByDefault', {
			method: 'POST',
			headers :{
				'Content-Type': 'application/json'
				},
			body: JSON.stringify(payload)

		})

		const data= yield response.json();
		yield put(successfullUploadingUserDataFromDatabase(data))
	}
	catch(error){
		yield put(errorUploadingUserDataFromDatabase(error))
	}

}