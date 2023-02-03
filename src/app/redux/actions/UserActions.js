import { API } from "app/config/api";
import apiAuthService from "app/services/apiAuthService";
import history from "history.js";

export const SET_USER_DATA = "USER_SET_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const CHECK_TOKEN = "CHECK_TOKEN";
export const CHECK_TOKEN_ERROR = "CHECK_TOKEN_ERROR";
export const CHECK_TOKEN_SUCCESS = "CHECK_TOKEN_SUCCESS";

export function setUserData(user) {
  return (dispatch) => {
    dispatch({
      type: SET_USER_DATA,
      data: user,
    });
  };
}

export function logoutUser() {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    apiAuthService
      .logout(token)
      .then(() => {
        history.push({
          pathname: "/unauthenticated",
        });

        dispatch({
          type: USER_LOGGED_OUT,
        });
      })
      .catch((err) => {
        Promise.reject(err);
      });
  };
}

export function checkToken(token) {
  return (dispatch) => {
    apiAuthService
      .loginWithToken(token)
      .then((user) => {
        dispatch({
          type: CHECK_TOKEN,
          payload: false,
        });
        if (user) {
          apiAuthService.setSession(token);
          history.push("/mom");
          return dispatch({
            type: CHECK_TOKEN_SUCCESS,
          });
        } else {
          return dispatch({
            type: CHECK_TOKEN_ERROR,
            payload: "token tidak valid",
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: CHECK_TOKEN,
          payload: false,
        });
        return dispatch({
          type: CHECK_TOKEN_ERROR,
          payload: error,
        });
      });
  };
}

export function getDetailUser() {
  return async (dispatch) => {
    let token = await localStorage.getItem("jwt_token");
    let res = await apiAuthService.getUserDetail(token);
    dispatch(setUserData(res));
    return res;
  };
}

export function editProfile(params) {
  return async (dispatch) => {
    const res = await API.post("user/profile/edit", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
}

export function editPassword(params) {
  return async (dispatch) => {
    const res = await API.post("user/change/password", params).catch((err) => {
      return Promise.reject(err);
    });
    return res.data;
  };
}
