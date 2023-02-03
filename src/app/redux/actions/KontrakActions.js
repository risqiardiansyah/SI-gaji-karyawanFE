import { API, setAuthToken } from "app/config/api";

export const GET_KONTRAK = "GET_KONTRAK";
export const DEL_KONTRAK = "DEL_KONTRAK";
export const GET_DETAIL_KONTRAK = "GET_DETAIL_KONTRAK";
export const GET_GARANSI = "GET_GARANSI";
export const DEL_GARANSI = "DEL_GARANSI";
export const GET_DETAIL_GARANSI = "GET_DETAIL_GARANSI";

export const getKontrak = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/kontrak").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_KONTRAK,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_KONTRAK,
        payload: [],
      });
    }
  };
};

export const getDetailKontrak = (id) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/kontrak/detail/${id}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_KONTRAK,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_KONTRAK,
        payload: [],
      });
    }
  };
};

export const delKontrak = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(`/user/kontrak/delete/${params}`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: DEL_KONTRAK,
        payload: params,
      });
    }
    return res.data;
  };
};

export const addKontrak = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/kontrak/create", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const editKontrak = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/kontrak/edit", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const downloadKontrak = (params, send_email) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `/user/kontrak/${send_email}/cetak`,
      params
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const updateStatusTermin = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/kontrak/termin/update`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const getGaransi = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/garansi").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_GARANSI,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_GARANSI,
        payload: [],
      });
    }
  };
};

export const getDetailGaransi = (id) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/garansi/${id}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_GARANSI,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_GARANSI,
        payload: [],
      });
    }
  };
};

export const delGaransi = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(`/user/garansi/delete/${params}`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: DEL_GARANSI,
        payload: params,
      });
    }
    return res.data;
  };
};

export const addGaransi = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/garansi/create", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const editGaransi = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/garansi/edit", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const downloadGaransi = (unique_code, send_email) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `/user/garansi/${unique_code}/${send_email}/cetak`,
      {}
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};
