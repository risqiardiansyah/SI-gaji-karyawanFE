import { GET_DATA_HO, DEL_HO, GET_DETAIL_HO } from "../actions/HandoverActions";

const initialState = {
  dataHO: [],
  detailHO: {},
};

const HandoverReducer = function (state = initialState, action) {
  switch (action.type) {
    case DEL_HO: {
      let penilaian = state.data;
      return {
        ...state,
        dataHO: penilaian,
      };
    }
    case GET_DATA_HO: {
      return {
        ...state,
        dataHO: action.payload,
      };
    }
    case GET_DETAIL_HO: {
      return {
        ...state,
        detailHO: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default HandoverReducer;
