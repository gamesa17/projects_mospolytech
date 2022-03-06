import React from "react";
import { Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { getFormItemRules } from "@common/form";
import { useAuthTranslation } from "@localization";
import { LoginForm, LoginFormButton, LoginFormTitle, LoginWrapper } from "./login.styles";
import { LOGIN_FORM_PASSWORD_RULES, LOGIN_FORM_USERNAME_RULES } from "./login.constants";

export const Login: React.FC = () => {
  const { t } = useAuthTranslation();

  const onFinish = React.useCallback((values: unknown) => {
    console.log(values);
  }, []);

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
