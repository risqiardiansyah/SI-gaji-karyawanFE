import { API, setAuthToken } from "app/config/api";

export const GET_DATA_HO = "GET_DATA_HO";
export const GET_DETAIL_HO = "GET_DETAIL_HO";
export const DEL_HO = "DEL_HO";

export const getHO = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/handover").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DATA_HO,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DATA_HO,
        payload: [],
      });
    }
  };
};

export const getDetailHO = (code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/handover/${code}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_HO,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_HO,
        payload: [],
      });
    }
  };
};

export const createHO = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/handover/create", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const editHO = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/handover/edit`, params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const delHO = (code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(`/user/handover/delete/${code}`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: DEL_HO,
        payload: code,
      });
    }
    return res.data;
  };
};

export const downloadHO = (params = {}, send_email, code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `/user/handover/${code}/${send_email}/cetak`,
      params
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};
