import Admin from "./app/pages/Admin";
import {
	ADMIN_ROUTE,
	BASKET_ROUTE,
	DEVICE_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	SHOP_ROUTE
} from "./app/utils/consts";
import Basket from "./app/pages/Basket";
import Shop from "./app/pages/Shop";
import DevicePage from "./app/pages/DevicePage";
import Login from "./app/layouts/login";

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: Admin
	},
	{
		path: BASKET_ROUTE,
		Component: Basket
	}
];

export const publicRoutes = [
	{
		path: SHOP_ROUTE,
		Component: Shop
	},
	{
		path: LOGIN_ROUTE,
		Component: Login
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Login
	},
	{
		path: DEVICE_ROUTE + "/:id",
		Component: DevicePage
	}
];
