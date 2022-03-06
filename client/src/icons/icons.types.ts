import React from "react";
import { Colors } from "@common/theme";

export type IconProps = {
  color?: Colors;
  hoverColor?: Colors;
  size?: number;
};

export type IconType = React.FC<IconProps>;
