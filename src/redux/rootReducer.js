import { combineReducers } from'redux';
import { persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sampleDataReducer from './data/sampleDataReducer';
import { createTransform } from 'redux-persist';
import JSOG from 'jsog';

export const JSOGTransform = createTransform(
    (inboundState, key) => JSOG.encode(inboundState),
    (outboundState, key) => JSOG.decode(outboundState),
)

const persistConfig={
	key:'root',
	storage:storage,
	transforms: [JSOGTransform],
	whitelist:['sampleData1']
}

const RootReducer = combineReducers({
	sampleData: sampleDataReducer
});

export default persistReducer(persistConfig, RootReducer);
