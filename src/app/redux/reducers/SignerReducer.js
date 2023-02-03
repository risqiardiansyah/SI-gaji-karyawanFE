import {
  GET_SIGNER,
  GET_ALL_SIGNER,
  DEL_SIGNER,
  GET_ALL_KOP,
  GET_DETAIL_KOP,
} from "../actions/SignerActions";

const initialState = {
  data: [],
  allData: [],
  detail: null,
  dataKop: [],
  detailKop: null,
};

const SignerReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_SIGNER: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case DEL_SIGNER: {
      let pelanggan = state.data.filter(
        (item) => item.id_pelanggan !== action.payload.id_pelanggan
      );
      return {
        ...state,
        data: pelanggan,
      };
    }
    case GET_ALL_SIGNER: {
      return {
        ...state,
        allData: action.payload,
      };
    }
    case GET_ALL_KOP: {
      return {
        ...state,
        dataKop: action.payload,
      };
    }
    case GET_DETAIL_KOP: {
      return {
        ...state,
        detailKop: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default SignerReducer;
