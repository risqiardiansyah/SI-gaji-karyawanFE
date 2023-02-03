import {
  Avatar,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  Switch,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { getDetailUser, logoutUser } from "app/redux/actions/UserActions";
import clsx from "clsx";
import { merge } from "lodash";
import { MatxMenu, MatxSearchBox } from "matx";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NotificationBar from "../SharedCompoents/NotificationBar";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  topbar: {
    top: 0,
    zIndex: 100,
    transition: "all 0.3s ease",
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))",

    "& .topbar-hold": {
      backgroundColor: palette.primary.main,
      height: 80,
      paddingLeft: 18,
      paddingRight: 20,
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      [theme.breakpoints.down("xs")]: {
        paddingLeft: 14,
        paddingRight: 16,
      },
    },
    "& .fixed": {
      boxShadow: theme.shadows[8],
      height: 64,
    },
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    minWidth: 185,
  },
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { settings } = useSelector(({ layout }) => layout);
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;
  const { name } = useSelector(({ user }) => user);

  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const fixed = settings?.layout1Settings?.topbar?.fixed;

  const updateSidebarMode = (sidebarSettings) => {
    dispatch(
      setLayoutSettings(
        merge({}, settings, {
          layout1Settings: {
            leftSidebar: {
              ...sidebarSettings,
            },
          },
        })
      )
    );
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;

    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }

    updateSidebarMode({ mode });
  };

  const handleSidenavToggle = () => {
    updateSidebarMode({ mode: mode === "compact" ? "full" : "compact" });
  };

  const handleSignOut = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getDetailUser());
  }, []);

  return (
    <div className={classes.topbar}>
      <div className={clsx({ "topbar-hold": true, fixed: fixed })}>
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <Hidden smDown>
              <Switch
                onChange={handleSidenavToggle}
                checked={leftSidebar.mode !== "full"}
                color="secondary"
                size="small"
              />
            </Hidden>
            <IconButton onClick={handleSidebarToggle} className="hide-on-pc">
              <Icon>menu</Icon>
            </IconButton>
            <img
              src="/assets/images/logos/logo-horizontal.png"
              alt="alan office"
              className="hide-on-pc logo-mobile"
            />
          </div>
          <div className="flex items-center">
            {/* <MatxSearchBox /> */}

            {/* <NotificationBar /> */}

            <MatxMenu
              menuButton={
                <Avatar
                  className="cursor-pointer mx-2"
                  src={`https://ui-avatars.com/api/?name=${name}&background=97CB72&color=ffffff`}
                />
              }
            >
              <MenuItem>
                <Link className={classes.menuItem} to="/">
                  <Icon> home </Icon>
                  <span className="pl-4"> Home </span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className={classes.menuItem} to="/akun">
                  <Icon> person </Icon>
                  <span className="pl-4"> Profile </span>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleSignOut} className={classes.menuItem}>
                <Icon> power_settings_new </Icon>
                <span className="pl-4 text-raleway"> Logout </span>
              </MenuItem>
            </MatxMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout1Topbar;
