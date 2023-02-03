import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { convertHexToRGB } from "utils";

import Brand from "../SharedCompoents/Brand";
import Sidenav from "../SharedCompoents/Sidenav";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  sidenav: ({ width, primaryRGB, bgImgURL }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: width,
    boxShadow: theme.shadows[8],
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
    backgroundSize: "cover",
    zIndex: 99,
    overflow: "hidden",
    color: palette.text.primary,
    transition: "all 250ms ease-in-out",
    backgroundImage: `linear-gradient(to bottom, rgba(${primaryRGB}, 1), rgba(${primaryRGB}, 1))`,
    "&:hover": {
      width: "var(--sidenav-width)",
      "& .sidenavHoverShow": {
        display: "block",
      },
      "& .compactNavItem": {
        width: "100%",
        maxWidth: "100%",
        "& .nav-bullet": {
          display: "block",
        },
        "& .nav-bullet-text": {
          display: "none",
        },
      },
    },
  }),
  hideOnCompact: {
    display: "none",
  },
  userInfo: {},
}));

const Layout1Sidenav = () => {
  const theme = useTheme();
  const { settings } = useSelector((state) => state.layout);
  const { role } = useSelector((state) => state.user);
  console.log("ROLE", role);
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;

  const getSidenavWidth = () => {
    switch (mode) {
      case "compact":
        return "var(--sidenav-compact-width)";
      default:
        return "var(--sidenav-width)";
    }
  };

  const primaryRGB = convertHexToRGB(theme.palette.primary.main);
  const classes = useStyles({
    ...leftSidebar,
    width: getSidenavWidth(),
    primaryRGB,
  });

  return (
    <div className={classes.sidenav}>
      <div className="flex-column relative h-full">
        <Brand />
        <Sidenav role={role} />
      </div>
    </div>
  );
};

export default Layout1Sidenav;
