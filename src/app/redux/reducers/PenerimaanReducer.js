import {
  GET_ALL_PENERIMAAN_MAGANG,
  DEL_PENERIMAAN_MAGANG,
  GET_DETAIL_PENERIMAAN_MAGANG,
  GET_ALL_PENERIMAAN_KERJA,
  DEL_PENERIMAAN_KERJA,
  GET_DETAIL_PENERIMAAN_KERJA,
} from "../actions/PenerimaanActions";

const initialState = {
  dataMagang: [],
  detailMagang: {},
  dataKerja: [],
  detailKerja: {},
};

const PenerimaanReducer = function (state = initialState, action) {
  switch (action.type) {
    case DEL_PENERIMAAN_MAGANG: {
      let supermagang = state.data;
      return {
        ...state,
        dataMagang: supermagang,
      };
    }
    case GET_ALL_PENERIMAAN_MAGANG: {
      return {
        ...state,
        dataMagang: action.payload,
      };
    }
    case GET_DETAIL_PENERIMAAN_MAGANG: {
      return {
        ...state,
        detailMagang: action.payload,
      };
    }
    case DEL_PENERIMAAN_KERJA: {
      let supermagang = state.data;
      return {
        ...state,
        dataKerja: supermagang,
      };
    }
    case GET_ALL_PENERIMAAN_KERJA: {
      return {
        ...state,
        dataKerja: action.payload,
      };
    }
    case GET_DETAIL_PENERIMAAN_KERJA: {
      return {
        ...state,
        detailKerja: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default PenerimaanReducer;
