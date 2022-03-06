import styled from "styled-components";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

export const SidebarWrapper = styled(Layout.Sider)({});

export const SidebarLogoWrapper = styled(Link)({
  marginTop: 15,
  padding: "0 24px",

  display: "block",
});

export const SidebarMenu = styled(Menu)({
  marginTop: 25,
});
