import "styled-components";

export type Colors = "primary" | "secondary" | "dark" | "grey" | "light-grey" | "dark-grey" | "white" | "text-primary";

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
