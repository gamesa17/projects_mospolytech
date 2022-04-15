import styled from "styled-components";
import { Layout } from "antd";

export const ContentWrapper = styled(Layout.Content)<{ padding?: number }>(({ theme, padding }) => ({
  padding,

  height: 0,

  backgroundColor: theme.colorPalette.white,

  overflow: "auto",
}));
