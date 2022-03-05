import "styled-components";

export type Colors = "white" | "primary" | "secondary" | "dark" | "light-grey";

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
