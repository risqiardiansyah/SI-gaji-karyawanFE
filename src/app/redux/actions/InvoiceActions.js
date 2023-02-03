import { API, setAuthToken } from "app/config/api";

export const GET_INVOICE = "GET_INVOICE";
export const DEL_INVOICE = "DEL_INVOICE";
export const GET_DETAIL_INVOICE = "GET_DETAIL_INVOICE";
export const GET_LOG_PRINT = "GET_LOG_PRINT";

export const getInvoice = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/invoice").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_INVOICE,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_INVOICE,
        payload: [],
      });
    }
  };
};

export const getDetailInvoice = (id) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/invoice/detail/${id}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_INVOICE,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_INVOICE,
        payload: [],
      });
    }
  };
};

export const delInvoice = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/invoice/delete/${params}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: DEL_INVOICE,
        payload: params,
      });
    }
    return res.data;
  };
};

export const addInvoice = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/invoice/create", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const editInvoice = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/invoice/edit", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const downloadInvoice = (idx_invoice, index, email, params) => {
  console.log(params);
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `/user/invoice/${idx_invoice}/${index}/cetak/${email}`,
      params
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const updateStatusTermin = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/invoice/termin/update`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const getLogPrint = (type, code, termin) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/print/${type}/${code}/${termin}`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: GET_LOG_PRINT,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_LOG_PRINT,
        payload: [],
      });
    }
  };
};

export const delLogPrint = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(`/user/print/${params}/delete`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: DEL_INVOICE,
        payload: params,
      });
    }
    return res.data;
  };
};
