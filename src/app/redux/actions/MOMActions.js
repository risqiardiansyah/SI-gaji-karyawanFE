import { API, setAuthToken } from "app/config/api";

export const GET_DATA_MOM = "GET_DATA_MOM";
export const GET_DETAIL_MOM = "GET_DETAIL_MOM";
export const GET_MOM_WITH = "GET_MOM_WITH";
export const DEL_MOM = "DEL_MOM";

export const getMOM = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/mom").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DATA_MOM,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DATA_MOM,
        payload: [],
      });
    }
  };
};

export const getDetailMOM = (code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/mom/${code}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_MOM,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_MOM,
        payload: [],
      });
    }
  };
};

export const createMOM = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/mom/create", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const editMOM = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/mom/edit`, params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const delMOM = (code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(`/user/mom/delete/${code}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: DEL_MOM,
        payload: code,
      });
    }
    return res.data;
  };
};

export const downloadMOM = (params = {}, send_email, code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `/user/mom/${code}/${send_email}/cetak`,
      params
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const getMOMWith = (type) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/mom/with`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_MOM_WITH,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_MOM_WITH,
        payload: [],
      });
    }
  };
};
