import styled from "styled-components";
import { Button, Form, Typography } from "antd";

export const RegisterWrapper = styled.div({
  height: "100%",
  width: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

export const RegisterForm = styled(Form)({
  width: 400,
});

export const RegisterFormTitle = styled(Typography.Title)({
  textAlign: "center",
});

export const RegisterFormButton = styled(Button)({
  width: "100%",
});
