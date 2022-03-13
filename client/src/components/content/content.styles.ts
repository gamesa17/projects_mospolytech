import styled from "styled-components";
import { Layout } from "antd";

export const ContentWrapper = styled(Layout.Content)<{ padding?: number }>(({ padding }) => ({
  padding,

  height: 0,

  overflow: "auto",
}));
