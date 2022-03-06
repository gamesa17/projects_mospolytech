import React from "react";
import { Outlet } from "react-router";
import { Sidebar } from "../sidebar";
import { Wrapper } from "./dashboard-wrapper.styles";

export const DashBoardContainer: React.FC = () => (
  <Wrapper>
    <Sidebar />
    <Outlet />
  </Wrapper>
);
