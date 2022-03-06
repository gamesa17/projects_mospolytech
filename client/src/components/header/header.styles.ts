import styled from "styled-components";
import { Layout } from "antd";

export const HeaderWrapper = styled(Layout.Header)(({ theme }) => ({
  backgroundColor: theme.colorPalette.white,
}));
