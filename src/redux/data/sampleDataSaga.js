import { takeEvery, call, put, takeLatest} from 'redux-saga/effects';
import { successfullGettingUserDataFromDatabase, errorGettingUserDataFromDatabase, successfullGettingSelectedUserDataFromDatabase, errorGettingSelectedUserDataFromDatabase} from './sampleDataAction';

export function* startGettingDataForTable(){
	yield takeEvery('START_GETTING_USER_DATA_FROM_DATABASE', startGettingDataFromDatabaseAsync)
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
	yield takeEvery('START_GETTING_SELECTED_USER_DATA_FROM_DATABASE', startGettingSelectedUserDetailFromDatabaseAsync)
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