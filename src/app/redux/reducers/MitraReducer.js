import { GET_MITRA, GET_ALL_MITRA, DEL_MITRA } from '../actions/MitraActions';

const initialState = {
  data: [],
  allData: [],
  detail: null,
};

const MitraReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MITRA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case DEL_MITRA: {
      let pelanggan = state.data.filter(
        (item) => item.id_pelanggan !== action.payload.id_pelanggan
      );
      return {
        ...state,
        data: pelanggan,
      };
    }
    case GET_ALL_MITRA: {
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

export default MitraReducer;
