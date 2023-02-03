import "../fake-db";
import "../index.css";
import "../styles/utilities/_cards.css";
import "../styles/utilities/_sweetalert.css";
import "../styles/utilities/_table.css";
import "../styles/components/_button.css";
import "../styles/components/_animation.css";

import history from "history.js";
import { MatxSuspense } from "matx";
import React from "react";
import { Provider } from "react-redux";
import { Router, Switch } from "react-router-dom";
import GlobalCss from "styles/GlobalCss";

import AppContext from "./appContext";
import Auth from "./auth/Auth";
import AuthGuard from "./auth/AuthGuard";
import MatxLayout from "./MatxLayout/MatxLayoutSFC";
import MatxTheme from "./MatxLayout/MatxTheme/MatxTheme";
import { Store } from "./redux/Store";
import routes from "./RootRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";

const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
        <MatxTheme>
          <GlobalCss>
            <Router history={history}>
              <Auth>
                <MatxSuspense>
                  <Switch>
                    {sessionRoutes.map((item, ind) => (
                      <AuthGuard
                        key={ind}
                        path={item.path}
                        component={item.component}
                        isPrivate={false}
                      />
                    ))}
                    <AuthGuard
                      path="/"
                      component={MatxLayout}
                      isPrivate={true}
                    />
                  </Switch>
                </MatxSuspense>
              </Auth>
            </Router>
          </GlobalCss>
        </MatxTheme>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;
