import {createStore, applyMiddleware } from 'redux';
import RootReducer from './rootReducer';
import { persistStore} from 'redux-persist'
import logger from 'redux-logger';
//import Thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

//const middleware=[logger, Thunk];
const sagaMiddleware= createSagaMiddleware();
const middleware=[logger, sagaMiddleware];

export const store= createStore(RootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export const persistor= persistStore(store)

export default {store, persistor};