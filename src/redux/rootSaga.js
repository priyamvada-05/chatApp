import { all, call} from 'redux-saga/effects';
import { startGettingDataForTable, startGettingSelectedUserFromDatabase, startGettingRefDataForTable, startUploadingDataForTable} from './data/sampleDataSaga';

export default function* rootSaga(){
	yield all([call(startGettingDataForTable), call(startGettingSelectedUserFromDatabase), call(startGettingRefDataForTable), call(startUploadingDataForTable)])
}