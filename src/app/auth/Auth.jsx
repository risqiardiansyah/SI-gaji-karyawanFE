import { setAuthLoadingStatus } from 'app/redux/actions/LoginActions';
import apiAuthService from 'app/services/apiAuthService';
import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import history from '../../history.js';
import { getNavigationByUser } from '../redux/actions/NavigationAction';
import { setUserData } from '../redux/actions/UserActions';

// import firebaseAuthService from "../services/firebase/firebaseAuthService";
const checkJwtAuth = async (dispatch, setUserData) => {
  // You need to send token to your server to check token is valid
  // modify loginWithToken method in jwtService
  const token = await localStorage.getItem('jwt_token');
  if (token) {
    return apiAuthService
      .loginWithToken(token)
      .then((user) => {
        dispatch(setUserData(user));
      })
      .catch((err) => {
        apiAuthService.removeToken();
        apiAuthService.removeUser();
        history.push('/unauthenticated');
      });
  }
};

const Auth = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthLoadingStatus(true));
    checkJwtAuth(dispatch, setUserData)
      .then(() => {
        dispatch(getNavigationByUser());
      })
      .finally(() => dispatch(setAuthLoadingStatus(false)));
  }, [setUserData, getNavigationByUser]);

  return <Fragment>{children}</Fragment>;
};

export default Auth;
