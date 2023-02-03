import {
  GET_KERJASAMA,
  DEL_KERJASAMA,
  GET_DETAIL_KERJASAMA,
} from '../actions/KerjasamaAction';

const initialState = {
  data: [],
  detail: {},
  detail: null,
};

const KerjasamaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_KERJASAMA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case GET_DETAIL_KERJASAMA: {
      return {
        ...state,
        detail: action.payload,
      };
    }
    case DEL_KERJASAMA: {
      let pelanggan = state.data.filter(
        (item) => item.id_pelanggan !== action.payload.id_pelanggan
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

export default KerjasamaReducer;
