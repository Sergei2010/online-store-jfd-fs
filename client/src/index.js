import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import UserStore from "./app/store/UserStore";
import DeviceStore from "./app/store/DeviceStore";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createStore } from "./app/store/createStore";
import history from "./app/utils/history";

export const Context = createContext(null);
const store = createStore();

ReactDOM.render(
	< React.StrictMode >
		<Provider store={ store }>
			<Router history={ history }>
				<Context.Provider
					value={ {
						user: new UserStore(),
						device: new DeviceStore()
					} }>
					<App />
				</Context.Provider>
			</Router>
		</Provider>
	</ React.StrictMode >,
	document.getElementById("root")
);
