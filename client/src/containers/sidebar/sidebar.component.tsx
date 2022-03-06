import React from "react";
import { useLocation } from "react-router-dom";
import { Sidebar as SidebarComponent } from "@components/sidebar";
import { MENU_ITEMS } from "./sidebar.constants";

const SidebarRoot: React.FC = () => {
  const { pathname } = useLocation();

  return <SidebarComponent activeMenuItemKey={pathname} menuItems={MENU_ITEMS} />;
};

export const Sidebar = React.memo(SidebarRoot);
