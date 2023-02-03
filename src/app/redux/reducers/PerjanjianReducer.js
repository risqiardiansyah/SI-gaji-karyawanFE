import {
  GET_PERJANJIAN_KONTRAK,
  DEL_PERJANJIAN_KONTRAK,
  GET_DETAIL_PERJANJIAN_KONTRAK,
} from "../actions/PerjanjianAction";

const initialState = {
  data: [],
  detail: {},
  detail: null,
};

const PerjanjianReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERJANJIAN_KONTRAK: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case GET_DETAIL_PERJANJIAN_KONTRAK: {
      return {
        ...state,
        detail: action.payload,
      };
    }
    case DEL_PERJANJIAN_KONTRAK: {
      let pelanggan = state.data.filter(
        (item) => item.unique_code !== action.payload.unique_code
      );
      return {
        ...state,
        data: pelanggan,
      };
    }
    default: {
      return state;
    }
  }
};

export default PerjanjianReducer;
