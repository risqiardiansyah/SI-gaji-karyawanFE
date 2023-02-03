import { GET_ALL_SP, GET_DETAIL_SP, DEL_SP } from "../actions/PeringatanAction";

const initialState = {
  sertifikat: [],
  detailSertifikat: {},
  dataSP: [],
  detail: null,
};

const PeringatanReducer = function (state = initialState, action) {
  switch (action.type) {
    case DEL_SP: {
      let sp = state.data;
      return {
        ...state,
        dataSP: sp,
      };
    }
    case GET_ALL_SP: {
      return {
        ...state,
        dataSP: action.payload,
      };
    }
    case GET_DETAIL_SP: {
      return {
        ...state,
        detail: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default PeringatanReducer;
