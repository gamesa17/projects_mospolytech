import React from "react";
import { ThemeProvider } from "styled-components";
import { Router } from "@client/router";
import { THEME } from "@common/theme";
import { AppContainer, GlobalStyles } from "@common/global.styles";

export const App = () => (
  <AppContainer>
    <ThemeProvider theme={THEME}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  </AppContainer>
);
