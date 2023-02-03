import {
  GET_PELANGGAN,
  GET_ALL_PELANGGAN,
  DEL_PELANGGAN,
} from "../actions/PelangganActions";

const initialState = {
  data: [],
  allData: [],
  detail: null,
};

const PelangganReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_PELANGGAN: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case DEL_PELANGGAN: {
      let pelanggan = state.data.filter(
        (item) => item.id_pelanggan !== action.payload.id_pelanggan
      );
      return {
        ...state,
        data: pelanggan,
      };
    }
    case GET_ALL_PELANGGAN: {
      return {
        ...state,
        allData: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default PelangganReducer;
