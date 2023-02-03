import { API, setAuthToken } from 'app/config/api';

export const GET_MITRA = 'GET_MITRA';
export const GET_ALL_MITRA = 'GET_ALL_MITRA';
export const DEL_MITRA = 'DEL_MITRA';

export const getMitra = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.get('/user/mitra/list').catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_MITRA,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_MITRA,
        payload: [],
      });
    }
  };
};

export const getAllMitra = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.get('/user/mitra/all').catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_ALL_MITRA,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_MITRA,
        payload: [],
      });
    }
  };
};

export const delMitra = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post(`/user/mitra/delete`, params).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: DEL_MITRA,
        payload: params,
      });
    }
    return res.data;
  };
};

export const addMitra = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post('/user/mitra/add', params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const editMitra = (params, mitra_code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post(`/user/mitra/${mitra_code}/edit`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};
