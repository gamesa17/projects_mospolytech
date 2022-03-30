import React from "react";
import { useNavigate } from "react-router-dom";
import { StatusCodes } from "http-status-codes";

import { logout } from "@client/store/auth";
import { mockRequest } from "@common/request";
import { ROUTES } from "@client/router/routes";
import { useThunkDispatch } from "@client/store";
import { Header as HeaderComponent } from "@components/header";

import { logoutResponse } from "./mock";

export const Header: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const dispatchThunk = useThunkDispatch();

  React.useEffect(() => {
    if (process.env.USE_MOCKS) {
      mockRequest.onPost("/auth/register").reply(StatusCodes.OK, logoutResponse);
    }
  }, []);

  const onLogout = React.useCallback(
    () =>
      dispatchThunk(logout({}))
        .unwrap()
        .then(() => {
          navigate(ROUTES.LOGIN, { replace: true });
        }),
    [navigate, dispatchThunk]
  );

  return <HeaderComponent onLogout={onLogout}>{children}</HeaderComponent>;
};
