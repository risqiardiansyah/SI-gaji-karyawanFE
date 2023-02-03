import CheckToken from './checkToken';
import NotFound from './NotFound';
import Unauthenticated from './unauthenticated';

const sessionRoutes = [
	{
		path: "/check_token/:token",
		component: CheckToken,
	},
	{
		path: "/unauthenticated",
		component: Unauthenticated,
	},
	// {
	// 	path: "/session/signup",
	// 	component: SignUp,
	// },
	// {
	// 	path: "/session/signin",
	// 	component: SignIn,
	// },
	// {
	// 	path: "/session/forgot-password",
	// 	component: ForgotPassword,
	// },
	{
		path: "/session/404",
		component: NotFound,
	},
];

export default sessionRoutes;
