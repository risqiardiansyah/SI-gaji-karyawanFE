import {
  GET_CATATAN_QUOTATION,
  GET_ALL_SIGNER,
  DEL_SIGNER,
  GET_PASAL_PERJANJIAN,
  GET_OFFICE,
  GET_OFFICE_LIST,
  GET_PASAL_PERJANJIAN_KONTRAK,
  GET_TUNJANGAN,
  GET_TUNJANGAN_LIST,
  GET_DIVISI,
  GET_DIVISI_LIST,
} from "../actions/WebSettingActions";

const initialState = {
  data: [],
  allData: [],
  detail: null,
  dataPasal: [],
  dataPasalKontrak: [],
  dataOffice: [],
  dataOfficeList: [],
  dataTunjangan: [],
  dataTunjanganList: [],
  dataDivisi: [],
  dataDivisiList: [],
};

const SignerReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_CATATAN_QUOTATION: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case GET_PASAL_PERJANJIAN: {
      return {
        ...state,
        dataPasal: action.payload,
      };
    }
    case GET_PASAL_PERJANJIAN_KONTRAK: {
      return {
        ...state,
        dataPasalKontrak: action.payload,
      };
    }
    case GET_OFFICE: {
      return {
        ...state,
        dataOffice: action.payload,
      };
    }
    case GET_OFFICE_LIST: {
      return {
        ...state,
        dataOfficeList: action.payload,
      };
    }
    case GET_TUNJANGAN: {
      return {
        ...state,
        dataTunjangan: action.payload,
      };
    }
    case GET_TUNJANGAN_LIST: {
      return {
        ...state,
        dataTunjanganList: action.payload,
      };
    }
    case GET_DIVISI: {
      return {
        ...state,
        dataDivisi: action.payload,
      };
    }
    case GET_DIVISI_LIST: {
      return {
        ...state,
        dataDivisiList: action.payload,
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
    default: {
      return state;
    }
  }
};

export default SignerReducer;
