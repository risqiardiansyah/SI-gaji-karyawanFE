import {
  GET_DATA_MOM,
  DEL_MOM,
  GET_MOM_WITH,
  GET_DETAIL_MOM,
} from "../actions/MOMActions";

const initialState = {
  dataMOM: [],
  MOMWith: [],
  detailMOM: {},
};

const MOMReducer = function (state = initialState, action) {
  switch (action.type) {
    case DEL_MOM: {
      let penilaian = state.data;
      return {
        ...state,
        dataMOM: penilaian,
      };
    }
    case GET_DATA_MOM: {
      return {
        ...state,
        dataMOM: action.payload,
      };
    }
    case GET_DETAIL_MOM: {
      return {
        ...state,
        detailMOM: action.payload,
      };
    }
    case GET_MOM_WITH: {
      return {
        ...state,
        MOMWith: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default MOMReducer;
