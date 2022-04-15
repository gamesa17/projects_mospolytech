import "styled-components";

export type Colors = "primary" | "secondary" | "dark" | "grey" | "lightGrey" | "darkGrey" | "white" | "textPrimary";

export type ColorPalette = {
  [T in Colors]: string;
};

export type ThemeType = {
  colorPalette: ColorPalette;
};

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {
    _?: unknown;
  }
}
