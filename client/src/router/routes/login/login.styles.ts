import styled from "styled-components";
import { Button, Form, Typography } from "antd";

export const LoginWrapper = styled.div({
  height: "100%",
  width: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

export const LoginForm = styled(Form)({
  width: 400,
});

export const LoginFormTitle = styled(Typography.Title)({
  textAlign: "center",
});

export const LoginFormButton = styled(Button)({
  width: "100%",
});
