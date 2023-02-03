import { API, setAuthToken } from "app/config/api";

export const GET_PELANGGAN = "GET_PELANGGAN";
export const GET_ALL_PELANGGAN = "GET_ALL_PELANGGAN";
export const DEL_PELANGGAN = "DEL_PELANGGAN";

export const getPelanggan = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/daftarpelanggan/list").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_PELANGGAN,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_PELANGGAN,
        payload: [],
      });
    }
  };
};

export const getAllPelanggan = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/daftarpelanggan/all").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_ALL_PELANGGAN,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_PELANGGAN,
        payload: [],
      });
    }
  };
};

export const delPelanggan = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/daftarpelanggan/delete`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: DEL_PELANGGAN,
        payload: params,
      });
    }
    return res.data;
  };
};

export const addPelanggan = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/daftarpelanggan/add", params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const editPelanggan = (params, id_pelanggan) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `/user/daftarpelanggan/${id_pelanggan}/edit`,
      params
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const importPelanggan = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post(`/user/daftarpelanggan/import`, params);
};
