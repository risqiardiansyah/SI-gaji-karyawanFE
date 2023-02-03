import { API, setAuthToken } from 'app/config/api';

export const GET_DATA_DASHBOARD = "GET_DATA_DASHBOARD";

export const getDataDashboard = (id) => {
	return async (dispatch) => {
		const token = await localStorage.getItem("jwt_token");
		setAuthToken(token);
		const res = await API.get(`/user/dashboard/${id}`).catch((err) => {
			return Promise.reject(err);
		});
		if (res.data.code === 0) {
			dispatch({
				type: GET_DATA_DASHBOARD,
				payload: res.data.data,
			});
		} else {
			dispatch({
				type: GET_DATA_DASHBOARD,
				payload: [],
			});
		}
	};
};
