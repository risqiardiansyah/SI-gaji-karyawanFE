import { GET_DATA_DASHBOARD } from '../actions/DashboardActions';

const initialState = {
	data: null,
};

const DashboardReducer = function (state = initialState, action) {
	switch (action.type) {
		case GET_DATA_DASHBOARD: {
			return {
				...state,
				data: action.payload,
			};
		}
		default: {
			return state;
		}
	}
};

export default DashboardReducer;
