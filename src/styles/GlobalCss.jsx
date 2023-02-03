import React from "react";

import { variableStyles } from "./_variables";
import { animationStyles } from "./utilities/_animations";
import { borderStyles } from "./utilities/_border";
import { colorStyles } from "./utilities/_color";
import { commonStyles } from "./utilities/_common";
import { positioningStyles } from "./utilities/_positionings";
import { shadowStyles } from "./utilities/_shadows";
import { spacingStyles } from "./utilities/_spacing";
import { typographyStyles } from "./utilities/_typography";

// import { landingStyles } from "./utilities/_landing";
const GlobalCss = ({ children }) => {
  variableStyles();
  positioningStyles();
  spacingStyles();
  borderStyles();
  colorStyles();
  shadowStyles();
  typographyStyles();
  commonStyles();
  animationStyles();
  // landingStyles();
  return children;
};

export default GlobalCss;
