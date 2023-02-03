import {
  GET_KONTRAK,
  DEL_KONTRAK,
  GET_DETAIL_KONTRAK,
  GET_GARANSI,
  DEL_GARANSI,
  GET_DETAIL_GARANSI,
} from "../actions/KontrakActions";

const initialState = {
  data: [],
  detail: {},
  detail: null,
  dataGaransi: [],
  detailGaransi: {},
  detailGaransi: null,
};

const KontrakReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_KONTRAK: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case GET_DETAIL_KONTRAK: {
      return {
        ...state,
        detail: action.payload,
      };
    }
    case DEL_KONTRAK: {
      let kontrak = state.data.filter(
        (item) => item.unique_code !== action.payload.unique_code
      );
      return {
        ...state,
        data: kontrak,
      };
    }
    case GET_GARANSI: {
      return {
        ...state,
        dataGaransi: action.payload,
      };
    }
    case GET_DETAIL_GARANSI: {
      return {
        ...state,
        detailGaransi: action.payload,
      };
    }
    case DEL_GARANSI: {
      let garansi = state.data.filter(
        (item) => item.unique_code !== action.payload.unique_code
      );
      return {
        ...state,
        dataGaransi: garansi,
      };
    }
    default: {
      return state;
    }
  }
};

export default KontrakReducer;
