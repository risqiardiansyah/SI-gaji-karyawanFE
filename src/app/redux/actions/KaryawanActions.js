import { API, setAuthToken } from "app/config/api";

export const GET_KARYAWAN = "GET_KARYAWAN";
export const GET_ALL_KARYAWAN = "GET_ALL_KARYAWAN";
export const GET_DETAIL_KARYAWAN = "GET_DETAIL_KARYAWAN";
export const DEL_KARYAWAN = "DEL_KARYAWAN";
export const GET_SLIP = "GET_SLIP";
export const GET_DETAIL_SLIP = "GET_DETAIL_SLIP";
export const DEL_SLIP = "DEL_SLIP";

export const getKaryawan = (type = 1, status = "") => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(
      `/user/karyawan/list?type=${type}&status=${status}`
    ).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_KARYAWAN,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_KARYAWAN,
        payload: [],
      });
    }
  };
};

export const getAllKaryawan = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/karyawan/all").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_ALL_KARYAWAN,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_KARYAWAN,
        payload: [],
      });
    }
  };
};

export const getDetailKaryawan = (karyawan_code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/karyawan/detail/${karyawan_code}`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_KARYAWAN,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_KARYAWAN,
        payload: [],
      });
    }
  };
};

export const delKaryawan = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/karyawan/delete`, params).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: DEL_KARYAWAN,
        payload: params,
      });
    }
    return res.data;
  };
};

export const addKaryawan = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    API.defaults.headers.common["Content-Type"] = "multipart/form-data";
    console.log("Params", params);
    const res = await API.post("/user/karyawan/add", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const editKaryawan = (params, karyawan_code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `/user/karyawan/${karyawan_code}/edit`,
      params
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

// SLIP GAJI
export const getAllSlipGaji = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/slip").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_SLIP,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_SLIP,
        payload: [],
      });
    }
  };
};

export const addSlip = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/slip/create", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const editSlip = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/slip/edit`, params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const delSlip = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(`/user/slip/delete/${params}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: DEL_SLIP,
        payload: params,
      });
    }
    return res.data;
  };
};

export const downloadSlip = (slip_code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/slip/${slip_code}/cetak`, {}).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const sendEmailSlip = (slip_code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/slip/${slip_code}/send_email`, {}).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const getDetailSlip = (code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/slip/detail/${code}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_SLIP,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_SLIP,
        payload: [],
      });
    }
  };
};
