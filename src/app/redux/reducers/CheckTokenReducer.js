import { CHECK_TOKEN, CHECK_TOKEN_ERROR, CHECK_TOKEN_SUCCESS } from '../actions/UserActions';

const initialState = {
	loading: false,
	error: false,
	success: false,
};

const CheckTokenReducer = function (state = initialState, action) {
	switch (action.type) {
		case CHECK_TOKEN: {
			return {
				...state,
				loading: action.payload,
			};
		}
		case CHECK_TOKEN_SUCCESS: {
			return {
				...state,
				success: true,
			};
		}
		case CHECK_TOKEN_ERROR: {
			return {
				...state,
				error: true,
			};
		}
		default: {
			return state;
		}
	}
};

export default CheckTokenReducer;
