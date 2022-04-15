import styled from "styled-components";
import { Layout } from "antd";

export const HeaderWrapper = styled(Layout.Header)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  backgroundColor: theme.colorPalette.white,

  borderBottom: `2px solid ${theme.colorPalette.lightGrey}`,
}));

export const HeaderChildren = styled.div({});
