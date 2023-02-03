import {
  GET_KARYAWAN,
  GET_DETAIL_KARYAWAN,
  GET_ALL_KARYAWAN,
  DEL_KARYAWAN,
  GET_SLIP,
  GET_DETAIL_SLIP,
} from "../actions/KaryawanActions";

const initialState = {
  data: [],
  allData: [],
  detailKaryawan: [],
  detail: null,
  dataSlip: [],
  detailSlip: {},
};

const KaryawanReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_KARYAWAN: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case GET_DETAIL_KARYAWAN: {
      return {
        ...state,
        detailKaryawan: action.payload,
      };
    }
    case DEL_KARYAWAN: {
      let pelanggan = state.data.filter(
        (item) => item.karyawan_code !== action.payload.karyawan_code
      );
      return {
        ...state,
        data: pelanggan,
      };
    }
    case GET_ALL_KARYAWAN: {
      return {
        ...state,
        allData: action.payload,
      };
    }
    case GET_SLIP: {
      return {
        ...state,
        dataSlip: action.payload,
      };
    }
    case GET_DETAIL_SLIP: {
      return {
        ...state,
        detailSlip: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default KaryawanReducer;
