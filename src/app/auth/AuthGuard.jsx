import { MatxLoading } from "matx";
import React, { useContext, useEffect, useState } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";

const getAuthStatus = () => {
  let auth_user = localStorage.getItem("auth_user");
  let token = localStorage.getItem("jwt_token");
  if (token === null && auth_user) {
    return true;
  } else if (auth_user && token) {
    const { role } = JSON.parse(auth_user);
    let result = role.includes("1") || role.includes("5") || role.includes("6");
    if (result) {
      return result;
    } else {
      return "NOT_ALLOWED";
    }
  } else {
    return false;
  }
};

const AuthGuard = ({ component: Component, isPrivate = true, ...rest }) => {
  const [previouseRoute, setPreviousRoute] = useState(null);
  const { pathname } = useLocation();
  const {
    login: { loading },
  } = useSelector((state) => state);

  let authenticated = getAuthStatus();

  useEffect(() => {
    setPreviousRoute(pathname);
  }, [pathname]);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading && isPrivate) return <MatxLoading />;
        else if (authenticated === true || !isPrivate)
          return (
            <Scrollbar
              className="h-full-screen"
              options={{ suppressScrollX: true }}
            >
              <Component {...props} />
            </Scrollbar>
          );
        else if (authenticated === "NOT_ALLOWED")
          return (
            <Redirect
              to={{
                pathname: "/not_allowed",
                state: { redirectUrl: previouseRoute },
              }}
            />
          );
        else if (authenticated === false)
          return (
            <Redirect
              to={{
                pathname: "/unauthenticated",
                state: { redirectUrl: previouseRoute },
              }}
            />
          );
        else return <MatxLoading />;
      }}
    />
  );
};

export default AuthGuard;
