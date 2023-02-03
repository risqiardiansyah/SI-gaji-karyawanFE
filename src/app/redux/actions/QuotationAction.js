import { API, setAuthToken } from 'app/config/api';

export const GET_QUOTATION = 'GET_QUOTATION';
export const GET_DETAIL_QUOTATION = 'GET_DETAIL_QUOTATION';
export const DEL_QUOTATION = 'DEL_QUOTATION';

export const getQuotation = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.get('/user/quotation').catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_QUOTATION,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_QUOTATION,
        payload: [],
      });
    }
  };
};

export const getDetailQuotation = (code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.get(`/user/quotation/${code}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_QUOTATION,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_QUOTATION,
        payload: [],
      });
    }
  };
};

export const delQuotation = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post(`/user/quotation/delete/${params}`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: DEL_QUOTATION,
        payload: params,
      });
    }
    return res.data;
  };
};

export const addQuotation = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post('/user/quotation/create', params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const downloadQuotation = (quotation_code, send_email) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post(
      `/user/quotation/${quotation_code}/${send_email}/cetak`,
      {}
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const updateStatusQuotation = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post(`/user/quotation/status/edit`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const updateQuotation = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post(`/user/quotation/edit`, params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};
