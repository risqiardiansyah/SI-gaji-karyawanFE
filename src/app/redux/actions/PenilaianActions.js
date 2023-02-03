import { API, setAuthToken } from "app/config/api";

export const GET_DATA_PENILAIAN = "GET_DATA_PENILAIAN";
export const GET_DETAIL_PENILAIAN = "GET_DETAIL_PENILAIAN";
export const GET_KRITERIA_PENILAIAN = "GET_KRITERIA_PENILAIAN";
export const GET_ALL_KRITERIA_PENILAIAN = "GET_ALL_KRITERIA_PENILAIAN";
export const GET_STATISTIK_PENILAIAN = "GET_STATISTIK_PENILAIAN";
export const DEL_PENILAIAN = "DEL_PENILAIAN";

export const getPenilaian = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/surat_penilaian").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DATA_PENILAIAN,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DATA_PENILAIAN,
        payload: [],
      });
    }
  };
};

export const getDetailPenilaian = (code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(`/user/surat_penilaian/${code}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DETAIL_PENILAIAN,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DETAIL_PENILAIAN,
        payload: [],
      });
    }
  };
};

export const createPenilaian = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/surat_penilaian/create", params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const editPenilaian = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`/user/surat_penilaian/edit`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const delPenilaian = (code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(`/user/surat_penilaian/delete/${code}`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: DEL_PENILAIAN,
        payload: code,
      });
    }
    return res.data;
  };
};

export const downloadPenilaian = (params = {}, send_email, code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `/user/surat_penilaian/${code}/${send_email}/cetak`,
      params
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const getKriteriaPenilaian = (type, karyawan_code = "") => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(
      `/user/surat_penilaian/kriteria/${type}?karyawan_code=${karyawan_code}`
    ).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_KRITERIA_PENILAIAN,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_KRITERIA_PENILAIAN,
        payload: [],
      });
    }
  };
};

export const getAllKriteriaPenilaian = (type, divisi_code = "") => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(
      `/user/surat_penilaian/kriteria?divisi_code=${divisi_code}`
    ).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_ALL_KRITERIA_PENILAIAN,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_ALL_KRITERIA_PENILAIAN,
        payload: [],
      });
    }
  };
};

export const createKriteriaPenilaian = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      "/user/surat_penilaian/kriteria/add",
      params
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const editKriteriaPenilaian = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `/user/surat_penilaian/kriteria/edit`,
      params
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const delKriteriaPenilaian = (code) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(
      `/user/surat_penilaian/kriteria/delete/${code}`
    ).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: DEL_PENILAIAN,
        payload: code,
      });
    }
    return res.data;
  };
};

export const getStatistikPenilaian = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get(
      `/user/surat_penilaian/statistik?type=${params.type}&karyawan_code=${params.karyawan_code}`
    ).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_STATISTIK_PENILAIAN,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_STATISTIK_PENILAIAN,
        payload: [],
      });
    }
  };
};
