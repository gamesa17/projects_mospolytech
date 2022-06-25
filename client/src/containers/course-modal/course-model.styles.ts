import styled from "styled-components";
import { Button } from "antd";

export const ListHeader = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const LoadMoreButton = styled(Button)({
  margin: "0 auto",
  display: "block",
});
