import React from "react";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { StatusCodes } from "http-status-codes";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { login } from "@client/store/auth";
import { mockRequest } from "@common/request";
import { getFormItemRules } from "@common/form";
import { useThunkDispatch } from "@client/store";
import { useAuthTranslation } from "@localization";
import { ROUTES } from "@client/router/routes/routes.constants";
import { LoginInput } from "@ts/requests";

import { loginResponse } from "./mock";
import { LOGIN_FORM_PASSWORD_RULES, LOGIN_FORM_USERNAME_RULES } from "./login.constants";
import { LoginForm, LoginFormButton, LoginFormTitle, LoginWrapper } from "./login.styles";

export const Login: React.FC = () => {
  const { t } = useAuthTranslation();

  const navigate = useNavigate();
  const dispatchThunk = useThunkDispatch();

  React.useEffect(() => {
    if (process.env.USE_MOCKS) {
      mockRequest.onPost("/auth/login").reply(StatusCodes.OK, loginResponse);
    }
  }, []);

  const onFinish = React.useCallback(
    (values: unknown) => {
      dispatchThunk(login(values as LoginInput))
        .unwrap()
        .then((data) => {
          if (data) {
            navigate(ROUTES.DASHBOARD, { replace: true });
          }
        });
    },
    [navigate, dispatchThunk]
  );

  return (
    <LoginWrapper>
      <LoginForm onFinish={onFinish}>
        <Form.Item>
          <LoginFormTitle level={3}>{t("AUTHORIZATION")}</LoginFormTitle>
        </Form.Item>
        <Form.Item name="username" rules={getFormItemRules(t, LOGIN_FORM_USERNAME_RULES)}>
          <Input prefix={<UserOutlined />} placeholder={t("USERNAME")} />
        </Form.Item>
        <Form.Item name="password" rules={getFormItemRules(t, LOGIN_FORM_PASSWORD_RULES)}>
          <Input prefix={<LockOutlined />} type="password" placeholder={t("PASSWORD")} />
        </Form.Item>
        <Form.Item>
          <LoginFormButton type="primary" htmlType="submit">
            {t("LOGIN")}
          </LoginFormButton>
        </Form.Item>
      </LoginForm>
    </LoginWrapper>
  );
};
