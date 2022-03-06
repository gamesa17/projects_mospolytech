import styled from "styled-components";
import { Colors } from "@common/theme";

export const IconWrapper = styled.svg<{ color?: Colors; hoverColor?: Colors }>(({ color, hoverColor, theme }) => ({
  "& path": color && {
    fill: theme.colorPalette[color],
  },

  "&:hover path": hoverColor && {
    fill: theme.colorPalette[hoverColor],
  },
}));
