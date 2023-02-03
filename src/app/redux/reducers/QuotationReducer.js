import {
  GET_QUOTATION,
  DEL_QUOTATION,
  GET_DETAIL_QUOTATION,
} from '../actions/QuotationAction';

const initialState = {
  data: [],
  detail: {},
  detail: null,
};

const QuotationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUOTATION: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case GET_DETAIL_QUOTATION: {
      return {
        ...state,
        detail: action.payload,
      };
    }
    case DEL_QUOTATION: {
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

export default QuotationReducer;
