import React from "react";
import { Header as HeaderComponent } from "@components/header";
import { useThunkDispatch } from "@client/store";
import { logout } from "@client/store/auth";

export const Header: React.FC = ({ children }) => {
  const dispatchThunk = useThunkDispatch();

  const onLogout = React.useCallback(() => dispatchThunk(logout({})), [dispatchThunk]);

  return <HeaderComponent onLogout={onLogout}>{children}</HeaderComponent>;
};
