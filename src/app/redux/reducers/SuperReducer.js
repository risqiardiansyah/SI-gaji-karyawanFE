import {
  GET_ALL_SUPER_MAGANG,
  DEL_SUPER_MAGANG,
} from "../actions/SuperActions";

const initialState = {
  dataMagang: [],
  detail: null,
};

const SuperReducer = function (state = initialState, action) {
  switch (action.type) {
    case DEL_SUPER_MAGANG: {
      let supermagang = state.data;
      return {
        ...state,
        dataMagang: supermagang,
      };
    }
    case GET_ALL_SUPER_MAGANG: {
      return {
        ...state,
        dataMagang: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default SuperReducer;
