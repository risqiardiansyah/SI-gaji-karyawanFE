import {
  GET_ALL_SUKET,
  GET_DETAIL_SUKET,
  DEL_SUKET,
  GET_SERTIFIKAT,
  GET_DETAIL_SERTIFIKAT,
} from "../actions/SuketAction";

const initialState = {
  sertifikat: [],
  detailSertifikat: {},
  dataSuket: [],
  detail: null,
};

const SuketReducer = function (state = initialState, action) {
  switch (action.type) {
    case DEL_SUKET: {
      let suket = state.data;
      return {
        ...state,
        dataSuket: suket,
      };
    }
    case GET_ALL_SUKET: {
      return {
        ...state,
        dataSuket: action.payload,
      };
    }
    case GET_DETAIL_SUKET: {
      return {
        ...state,
        detail: action.payload,
      };
    }
    case GET_SERTIFIKAT: {
      return {
        ...state,
        sertifikat: action.payload,
      };
    }
    case GET_DETAIL_SERTIFIKAT: {
      return {
        ...state,
        detailSertifikat: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default SuketReducer;
