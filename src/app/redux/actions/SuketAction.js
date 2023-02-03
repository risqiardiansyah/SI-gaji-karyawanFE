import { API, setAuthToken } from "app/config/api";

export const GET_ALL_SUKET = "GET_ALL_SUKET";
export const GET_DETAIL_SUKET = "GET_DETAIL_SUKET";
export const DEL_SUKET = "DEL_SUKET";

export const GET_SERTIFIKAT = "GET_SERTIFIKAT";
export const GET_DETAIL_SERTIFIKAT = "GET_DETAIL_SERTIFIKAT";

export const getAllSuket = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/suket").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_ALL_SUKET,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_SUKET,
        payload: [],
      });
    }
  };
};

export const getDetailSuket = (code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/suket/${code}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_SUKET,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_SUKET,
        payload: [],
      });
    }
  };
};

export const delSuket = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/suket/delete`, params).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: DEL_SUKET,
        payload: params,
      });
    }
    return res.data;
  };
};

export const addSuket = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/suket/create", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const editSuket = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/suket/edit`, params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const downloadSuket = (sk_code, send_email) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `/user/suket/${sk_code}/${send_email}/cetak`,
      {}
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const getAllSertifikat = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/sertifikat").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_SERTIFIKAT,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_SERTIFIKAT,
        payload: [],
      });
    }
  };
};

export const addSertifikat = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/sertifikat/create", params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const editSertifikat = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/sertifikat/edit`, params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const delSertifikat = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(`/user/sertifikat/delete/${params}`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: DEL_SUKET,
        payload: params,
      });
    }
    return res.data;
  };
};

export const downloadSertifikat = (sertifikat_code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `/user/sertifikat/${sertifikat_code}/cetak`,
      {}
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const getDetailSertifikat = (code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/sertifikat/detail/${code}`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_SERTIFIKAT,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_SERTIFIKAT,
        payload: [],
      });
    }
  };
};
