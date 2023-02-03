import { API, setAuthToken } from "app/config/api";

export const GET_PERJANJIAN_KONTRAK = "GET_PERJANJIAN_KONTRAK";
export const DEL_PERJANJIAN_KONTRAK = "DEL_PERJANJIAN_KONTRAK";
export const GET_DETAIL_PERJANJIAN_KONTRAK = "GET_DETAIL_PERJANJIAN_KONTRAK";

export const getPerjanjianKontrak = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/perjanjian_kontrak").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_PERJANJIAN_KONTRAK,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_PERJANJIAN_KONTRAK,
        payload: [],
      });
    }
  };
};

export const getDetailPerjanjianKontrak = (id) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/perjanjian_kontrak/${id}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_PERJANJIAN_KONTRAK,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_PERJANJIAN_KONTRAK,
        payload: [],
      });
    }
  };
};

export const delPerjanjianKontrak = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/perjanjian_kontrak/delete`, {
      unique_code: params,
    }).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: DEL_PERJANJIAN_KONTRAK,
        payload: params,
      });
    }
    return res.data;
  };
};

export const addPerjanjianKontrak = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/perjanjian_kontrak/create", params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const editPerjanjianKontrak = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/perjanjian_kontrak/edit", params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const downloadPerjanjianKontrak = (perjanjian_code, email) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `/user/perjanjian_kontrak/${perjanjian_code}/${email}/cetak`,
      {}
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};
