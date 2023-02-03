import {
  GET_DATA_PENILAIAN,
  DEL_PENILAIAN,
  GET_KRITERIA_PENILAIAN,
  GET_DETAIL_PENILAIAN,
  GET_ALL_KRITERIA_PENILAIAN,
  GET_STATISTIK_PENILAIAN,
} from "../actions/PenilaianActions";

const initialState = {
  dataPenilaian: [],
  detail: null,
  kriteriaPenilaian: [],
  allKriteriaPenilaian: [],
  detailPenilaian: {},
  statistikPenilaian: [],
};

const PenilaianReducer = function (state = initialState, action) {
  switch (action.type) {
    case DEL_PENILAIAN: {
      let penilaian = state.data;
      return {
        ...state,
        dataPenilaian: penilaian,
      };
    }
    case GET_DATA_PENILAIAN: {
      return {
        ...state,
        dataPenilaian: action.payload,
      };
    }
    case GET_DETAIL_PENILAIAN: {
      return {
        ...state,
        detailPenilaian: action.payload,
      };
    }
    case GET_KRITERIA_PENILAIAN: {
      return {
        ...state,
        kriteriaPenilaian: action.payload,
      };
    }
    case GET_ALL_KRITERIA_PENILAIAN: {
      return {
        ...state,
        allKriteriaPenilaian: action.payload,
      };
    }
    case GET_STATISTIK_PENILAIAN: {
      return {
        ...state,
        statistikPenilaian: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default PenilaianReducer;
