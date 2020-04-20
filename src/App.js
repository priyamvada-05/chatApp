import React from 'react';
import './App.css';
import HomePage from './pages/homepage';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate} from 'redux-persist/integration/react';
import { Provider} from 'react-redux';
import {store, persistor} from './redux/store';

function App() {

  return (
        <Provider  store={store}>
	      	<BrowserRouter >
		      	<PersistGate persistor={persistor}>
		        	<HomePage />
		        </PersistGate>
	        </BrowserRouter>
        </Provider>
  );
}

export default App;
