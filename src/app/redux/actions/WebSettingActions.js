import { API, setAuthToken } from "app/config/api";

export const GET_CATATAN_QUOTATION = "GET_CATATAN_QUOTATION";
export const GET_PASAL_PERJANJIAN = "GET_PASAL_PERJANJIAN";
export const GET_PASAL_PERJANJIAN_KONTRAK = "GET_PASAL_PERJANJIAN_KONTRAK";
export const GET_ALL_SIGNER = "GET_ALL_SIGNER";
export const DEL_SIGNER = "DEL_SIGNER";
export const GET_OFFICE = "GET_OFFICE";
export const GET_OFFICE_LIST = "GET_OFFICE_LIST";
export const GET_TUNJANGAN = "GET_TUNJANGAN";
export const GET_TUNJANGAN_LIST = "GET_TUNJANGAN_LIST";
export const GET_DIVISI = "GET_DIVISI";
export const GET_DIVISI_LIST = "GET_DIVISI_LIST";

export const getCatatanQuotation = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/catatan/quotation").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_CATATAN_QUOTATION,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_CATATAN_QUOTATION,
        payload: [],
      });
    }
  };
};

export const editQuotationCatatan = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`user/catatan/quotation/edit`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
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

export const getPasalPerjanjian = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/setting/perjanjian").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_PASAL_PERJANJIAN,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_PASAL_PERJANJIAN,
        payload: [],
      });
    }
  };
};

export const savePasalPerjanjian = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`user/setting/perjanjian/create`, params).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const deletePasalPerjanjian = (idx) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(`user/setting/perjanjian/${idx}/delete`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const getOffice = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/office").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_OFFICE,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_OFFICE,
        payload: [],
      });
    }
  };
};

export const getOfficeList = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/office/list").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_OFFICE_LIST,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_OFFICE_LIST,
        payload: [],
      });
    }
  };
};

export const addOffice = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/office/add", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const editOffice = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`user/office/edit`, params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const deleteOffice = (idx) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(`user/office/delete/${idx}`).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const getPasalPerjanjianKontrak = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/setting/perjanjian_kontrak").catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    if (res.data.code === 0) {
      dispatch({
        type: GET_PASAL_PERJANJIAN_KONTRAK,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_PASAL_PERJANJIAN_KONTRAK,
        payload: [],
      });
    }
  };
};

export const savePasalPerjanjianKontrak = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(
      `user/setting/perjanjian_kontrak/create`,
      params
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const deletePasalPerjanjianKontrak = (idx) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(
      `user/setting/perjanjian_kontrak/${idx}/delete`
    ).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const getTunjangan = (unique_code = "") => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    let params = "";
    if (unique_code != "") {
      params = "?unique_code=" + unique_code;
    }
    const res = await API.get(`/user/tunjangan${params}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_TUNJANGAN,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_TUNJANGAN,
        payload: [],
      });
    }
  };
};

export const getTunjanganList = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/tunjangan/list").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_TUNJANGAN_LIST,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_TUNJANGAN_LIST,
        payload: [],
      });
    }
  };
};

export const tambahTunjangan = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/tunjangan/add", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const updateTunjangan = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`user/tunjangan/edit`, params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const deleteTunjangan = (idx) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(`user/tunjangan/delete/${idx}`).catch(
      (err) => {
        return Promise.reject(err);
      }
    );
    return res.data;
  };
};

export const getDivisi = (unique_code = "") => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    let params = "";
    if (unique_code != "") {
      params = "?unique_code=" + unique_code;
    }
    const res = await API.get(`/user/divisi${params}`).catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DIVISI,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DIVISI,
        payload: [],
      });
    }
  };
};

export const getDivisiList = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.get("/user/divisi/list").catch((err) => {
      return Promise.reject(err);
    });
    if (res.data.code === 0) {
      dispatch({
        type: GET_DIVISI_LIST,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_DIVISI_LIST,
        payload: [],
      });
    }
  };
};

export const tambahDivisi = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post("/user/divisi/add", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const updateDivisi = (params) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.post(`user/divisi/edit`, params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};

export const deleteDivisi = (idx) => {
  return async (dispatch) => {
    const token = await localStorage.getItem("jwt_token");
    setAuthToken(token);
    const res = await API.delete(`user/divisi/delete/${idx}`).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
};
