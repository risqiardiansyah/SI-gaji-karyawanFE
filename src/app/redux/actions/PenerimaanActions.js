import { API, setAuthToken } from "app/config/api";

export const GET_ALL_PENERIMAAN_MAGANG = "GET_ALL_PENERIMAAN_MAGANG";
export const GET_DETAIL_PENERIMAAN_MAGANG = "GET_DETAIL_PENERIMAAN_MAGANG";
export const DEL_PENERIMAAN_MAGANG = "DEL_PENERIMAAN_MAGANG";
export const GET_ALL_PENERIMAAN_KERJA = "GET_ALL_PENERIMAAN_KERJA";
export const GET_DETAIL_PENERIMAAN_KERJA = "GET_DETAIL_PENERIMAAN_KERJA";
export const DEL_PENERIMAAN_KERJA = "DEL_PENERIMAAN_KERJA";

export const getAllPenerimaanMagang = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/offering/magang").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_ALL_PENERIMAAN_MAGANG,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_PENERIMAAN_MAGANG,
        payload: [],
      });
    }
  };
};

export const getDetailPenerimaanMagang = (unique_code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/offering/magang/${unique_code}`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_PENERIMAAN_MAGANG,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_PENERIMAAN_MAGANG,
        payload: [],
      });
    }
  };
};

export const delPenerimaanMagang = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/offering/magang/delete`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: DEL_PENERIMAAN_MAGANG,
        payload: params,
      });
    }
    return res.data;
  };
};

export const addPenerimaanMagang = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/offering/magang/create", params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const editPenerimaanMagang = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/offering/magang/edit`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const getAllPenerimaanKerja = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/offering/kerja").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_ALL_PENERIMAAN_KERJA,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_PENERIMAAN_KERJA,
        payload: [],
      });
    }
  };
};

export const getDetailPenerimaanKerja = (unique_code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/offering/kerja/${unique_code}`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_PENERIMAAN_KERJA,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_PENERIMAAN_KERJA,
        payload: [],
      });
    }
  };
};

export const delPenerimaanKerja = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/offering/kerja/delete`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: DEL_PENERIMAAN_KERJA,
        payload: params,
      });
    }
    return res.data;
  };
};

export const addPenerimaanKerja = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/offering/kerja/create", params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const editPenerimaanKerja = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/offering/kerja/edit`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const downloadPenerimaanMagang = (unique_code, send_email, type) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `/user/offering/${unique_code}/${send_email}/${type}/cetak`,
      {}
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};
