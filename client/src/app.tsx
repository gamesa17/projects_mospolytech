import React from "react";
import { StatusCodes } from "http-status-codes";
import { ThemeProvider } from "styled-components";

import { THEME } from "@common/theme";
import { Router } from "@client/router";
import { Request } from "@common/request";
import { AppContainer, GlobalStyles } from "@common/global.styles";

import { Loader } from "@components/loader";

import { me } from "@client/store/user";
import { permissions } from "@client/store/permissions";
import { useSelector, useThunkDispatch } from "@client/store";
import { selectAuthorized, selectCheckingAuthorized } from "@client/store/authorization";

import { USERS } from "./mock/users";
import { PERMISSIONS } from "./mock/permissions";

export const App = () => {
  const dispatchThunk = useThunkDispatch();

  const authorized = useSelector(selectAuthorized);
  const checkingAuthorization = useSelector(selectCheckingAuthorized);

  React.useEffect(() => {
    Request.mock?.onGet("/users/me").reply(StatusCodes.OK, USERS.Alex);
    Request.mock?.onGet("/permissions").reply(StatusCodes.OK, PERMISSIONS.Alex);
  }, []);

  React.useEffect(() => {
    if (authorized) {
      dispatchThunk(me())
        .unwrap()
        .then(() => dispatchThunk(permissions()).unwrap());
    }
  }, [authorized, dispatchThunk]);

  return (
    <AppContainer>
      <ThemeProvider theme={THEME}>
        <GlobalStyles />
        {checkingAuthorization ? <Loader /> : <Router />}
      </ThemeProvider>
    </AppContainer>
  );
};
