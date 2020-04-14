import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import {store, persistor} from "./store"
import {Provider} from "react-redux"
// import {BrowserRouter as Router} from "react-router-dom"
import {PersistGate} from "redux-persist/integration/react"
import setAuthToken from "./utils/setAuthToken"
import jwt_decode from "jwt-decode";
import {setCurrentUser} from "./store/action/actions"

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);

	store.dispatch(setCurrentUser(decoded));   
}
ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('root'));


