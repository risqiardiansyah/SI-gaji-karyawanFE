import {
  GET_INVOICE,
  DEL_INVOICE,
  GET_DETAIL_INVOICE,
  GET_LOG_PRINT,
} from "../actions/InvoiceActions";

const initialState = {
  data: [],
  detail: {},
  detail: null,
  logPrint: [],
};

const InvoiceReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_INVOICE: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case GET_DETAIL_INVOICE: {
      return {
        ...state,
        detail: action.payload,
      };
    }
    case GET_LOG_PRINT: {
      return {
        ...state,
        logPrint: action.payload,
      };
    }
    case DEL_INVOICE: {
      let pelanggan = state.data.filter(
        (item) => item.id_pelanggan !== action.payload.id_pelanggan
      );
      return {
        ...state,
        data: pelanggan,
      };
    }
    default: {
      return state;
    }
  }
};

export default InvoiceReducer;
