import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app/components/AppRouter";
import NavBar from "./app/components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./app/http/userAPI";
import { Spinner } from "react-bootstrap";
// import AppLoader from "./app/components/ui/hoc/appLoader";
// import { Route, Switch, Redirect } from "react-router-dom";
// import ProtectedRoute from "./app/components/common/protectedRoute";
// import Users from "./app/layouts/users.jsx";
// import Login from "./app/layouts/login";
// import LogOut from "./app/layouts/logOut";
// import { ToastContainer } from "react-toastify";
// import Main from "./app/layouts/main";

const App = observer(() => {
	const { user } = useContext(Context);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		check()
			.then((data) => {
				user.setUser(true); // заменил 'data' вместо 'true'???
				// user.setIsAuth(true)
			})
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <Spinner animation={ "grow" } />;
	}
	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
		</BrowserRouter>
	);
});

export default App;
