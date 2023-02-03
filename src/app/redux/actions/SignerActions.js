import { API, setAuthToken } from "app/config/api";

export const GET_SIGNER = "GET_SIGNER";
export const GET_ALL_SIGNER = "GET_ALL_SIGNER";
export const DEL_SIGNER = "DEL_SIGNER";
export const GET_ALL_KOP = "GET_ALL_KOP";
export const GET_DETAIL_KOP = "GET_DETAIL_KOP";

export const getSigner = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/signer/list").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_SIGNER,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_SIGNER,
        payload: [],
      });
    }
  };
};

export const getAllSigner = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/signer/all").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_ALL_SIGNER,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_SIGNER,
        payload: [],
      });
    }
  };
};

export const delSigner = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/signer/delete`, params).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: DEL_SIGNER,
        payload: params,
      });
    }
    return res.data;
  };
};

export const addSigner = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/signer/add", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const editSigner = (params, id_pelanggan) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
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

export const getAllHeader = (type = "standar") => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/kop?type=${type}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_ALL_KOP,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_KOP,
        payload: [],
      });
    }
  };
};

export const getDetailHeader = (code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/kop/${code}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_KOP,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_KOP,
        payload: [],
      });
    }
  };
};

export const addHeader = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`user/kop/add`, params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const editHeader = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`user/kop/edit`, params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const delHeader = (code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(`/user/kop/delete/${code}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: DEL_SIGNER,
        payload: [],
      });
    }
    return res.data;
  };
};
