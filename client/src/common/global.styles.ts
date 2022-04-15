import styled, { createGlobalStyle } from "styled-components";

export const AppContainer = styled.div({
  width: "100%",
  height: "100%",
});

export const GlobalStyles = createGlobalStyle(({ theme }) => ({
  "*": {
    margin: 0,
    padding: 0,

    boxSizing: "border-box",
  },

  html: {
    width: "100%",
    minHeight: "100%",
  },

  body: {
    width: "100%",
    minHeight: "100%",

    color: theme.colorPalette.textPrimary,
    fontSize: 14,
    fontFamily: `"Rubik", Arial, sans-serif`,
  },

  button: {
    backgroundColor: "transparent",
    border: 0,

    cursor: "pointer",
  },

  "main#root": {
    width: "100%",
    height: "100%",
  },
}));
