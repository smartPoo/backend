import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";

import allReducers from "./redux/reducer";

const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(allReducers, composeEnhancers());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
