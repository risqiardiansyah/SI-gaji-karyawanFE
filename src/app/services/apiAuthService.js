import { API, setAuthToken } from 'app/config/api';
import axios from 'axios';

import localStorageService from './localStorageService';

class apiAuthService {
	loginWithToken = (token) => {
		setAuthToken(token);
		return API.post("user/auth/token").then((response) => {
			this.setSession(token);
			this.setUser(response.data.data);
			return response.data.data;
		});
	};

	getUserDetail = (token) => {
		setAuthToken(token);
		return API.get("user/profile").then((response) => {
			this.setSession(token);
			this.setUser(response.data.data);
			return response.data.data;
		});
	};

	logout = (token) => {
		setAuthToken(token);
		return API.post("user/logout")
			.then((response) => {
				this.setSession(null);
				this.removeUser();
				return response.data.data;
			})
			.catch((err) => {
				return Promise.reject(err);
			});
	};

	// Set token to all http request header, so you don't need to attach everytime
	setSession = (token) => {
		if (token) {
			localStorage.setItem("jwt_token", token);
			axios.defaults.headers.common["Authorization"] = "Bearer " + token;
		} else {
			localStorage.removeItem("jwt_token");
			delete axios.defaults.headers.common["Authorization"];
		}
	};

	// Save user to localstorage
	setUser = (user) => {
		localStorageService.setItem("auth_user", user);
	};
	// Remove user from localstorage
	removeUser = () => {
		localStorage.removeItem("auth_user");
	};
	// Remove token from localstorage
	removeToken = () => {
		localStorage.removeItem("jwt_token");
	};
}

export default new apiAuthService();
