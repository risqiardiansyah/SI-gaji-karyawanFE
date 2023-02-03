import { API, setAuthToken } from "app/config/api";

export const GET_ALL_SP = "GET_ALL_SP";
export const GET_DETAIL_SP = "GET_DETAIL_SP";
export const DEL_SP = "DEL_SP";

export const GET_SERTIFIKAT = "GET_SERTIFIKAT";
export const GET_DETAIL_SERTIFIKAT = "GET_DETAIL_SERTIFIKAT";

export const getAllSP = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/surat_pelanggaran").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_ALL_SP,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_SP,
        payload: [],
      });
    }
  };
};

export const checkSP = (karyawan_code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(
      `/user/surat_pelanggaran/check/${karyawan_code}`
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const addSP = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/surat_pelanggaran/create", params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const getDetailSP = (code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/surat_pelanggaran/${code}`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_SP,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_SP,
        payload: [],
      });
    }
  };
};

export const delSP = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/surat_pelanggaran/delete`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: DEL_SP,
        payload: params,
      });
    }
    return res.data;
  };
};

export const editSP = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/surat_pelanggaran/edit`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const downloadSP = (sp_code, send_email) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `/user/surat_pelanggaran/${sp_code}/${send_email}/cetak`,
      {}
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};
