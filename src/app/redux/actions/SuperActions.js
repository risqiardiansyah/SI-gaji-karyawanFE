import { API, setAuthToken } from 'app/config/api';

export const GET_ALL_SUPER_MAGANG = 'GET_ALL_SUPER_MAGANG';
export const DEL_SUPER_MAGANG = 'DEL_SUPER_MAGANG';

export const getAllSuperMagang = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.get('/user/pernyataan/magang').catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_ALL_SUPER_MAGANG,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_SUPER_MAGANG,
        payload: [],
      });
    }
  };
};

export const delSuperMagang = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post(`/user/pernyataan/magang/delete`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: DEL_SUPER_MAGANG,
        payload: params,
      });
    }
    return res.data;
  };
};

export const addSuperMagang = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post('/user/pernyataan/magang/create', params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const editSuperMagang = (params, id_pelanggan) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post(
      `/user/signer/${id_pelanggan}/edit`,
      params
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const downloadSuperMagang = (params, send_email) => {
  return async (dispatch) => {
    const token = await localStorage.getItem('jwt_token');
    setAuthToken(token);
    const res = await API.post(
      `/user/pernyataan/magang/${send_email}/cetak`,
      params
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};
