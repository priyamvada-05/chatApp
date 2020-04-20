import { combineReducers } from'redux';
import { persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sampleDataReducer from './data/sampleDataReducer';

const persistConfig={
	key:'root',
	storage:storage,
	whitelist:['sampleData1']
}

const RootReducer = combineReducers({
	sampleData: sampleDataReducer
});

export default persistReducer(persistConfig, RootReducer);
