import { API, setAuthToken } from 'app/config/api';

export const GET_KERJASAMA = 'GET_KERJASAMA';
export const DEL_KERJASAMA = 'DEL_KERJASAMA';
export const GET_DETAIL_KERJASAMA = 'GET_DETAIL_KERJASAMA';

export const getKerjasama = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.get('/user/perjanjian').catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_KERJASAMA,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_KERJASAMA,
        payload: [],
      });
    }
  };
};

export const getDetailKerjasama = (id) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.get(`/user/perjanjian/${id}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_KERJASAMA,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_KERJASAMA,
        payload: [],
      });
    }
  };
};

export const delKerjasama = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post(`/user/perjanjian/delete`, {
      perjanjian_code: params,
    }).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: DEL_KERJASAMA,
        payload: params,
      });
    }
    return res.data;
  };
};

export const addKerjasama = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post('/user/perjanjian/create', params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const editKerjasama = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post('/user/perjanjian/edit', params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const downloadKerjasama = (perjanjian_code, email) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post(
      `/user/perjanjian/${perjanjian_code}/${email}/cetak`,
      {}
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};
