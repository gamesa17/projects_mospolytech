import React from "react";
import { Form, Input, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { StatusCodes } from "http-status-codes";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { ROLES } from "@common/roles";
import { mockRequest } from "@common/request";
import { getFormItemRules } from "@common/form";
import { ROUTES } from "@client/router/routes/routes.constants";
import { useCommonTranslation, useAuthTranslation } from "@localization";
import { RegisterInput } from "@ts/requests/auth/register";

import { register } from "./register.resources";
import {
  REGISTER_FORM_CONFIRM_PASSWORD_RULES,
  REGISTER_FORM_INITIAL_VALUES,
  REGISTER_FORM_PASSWORD_RULES,
  REGISTER_FORM_USERNAME_RULES,
} from "./register.constants";
import { RegisterForm, RegisterFormButton, RegisterFormTitle, RegisterWrapper } from "./register.styles";

import { registerResponse } from "./mock";

export const Register: React.FC = () => {
  const { t } = useAuthTranslation();
  const { t: commonT } = useCommonTranslation();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (process.env.USE_MOCKS) {
      mockRequest.onPost("/auth/register").reply(StatusCodes.OK, registerResponse);
    }
  }, []);

  const onFinish = React.useCallback(
    (values: unknown) => {
      register(values as RegisterInput).then(({ status }) => {
        if (status === StatusCodes.CREATED) {
          navigate(ROUTES.LOGIN);
        }
      });
    },
    [navigate]
  );

  return (
    <RegisterWrapper>
      <RegisterForm initialValues={REGISTER_FORM_INITIAL_VALUES} onFinish={onFinish}>
        <Form.Item>
          <RegisterFormTitle level={3}>{t("REGISTRATION")}</RegisterFormTitle>
        </Form.Item>
        <Form.Item label="Ваша роль" name="role">
          <Radio.Group buttonStyle="solid">
            {ROLES.map((role) => (
              <Radio.Button key={role} value={role}>
                {commonT(`USER.ROLE.${role}`)}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item name="username" rules={getFormItemRules(t, REGISTER_FORM_USERNAME_RULES)}>
          <Input prefix={<UserOutlined />} placeholder={t("USERNAME")} />
        </Form.Item>
        <Form.Item name="password" rules={getFormItemRules(t, REGISTER_FORM_PASSWORD_RULES)}>
          <Input.Password prefix={<LockOutlined />} placeholder={t("PASSWORD")} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={getFormItemRules(t, REGISTER_FORM_CONFIRM_PASSWORD_RULES)}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={t("CONFIRM_PASSWORD")} />
        </Form.Item>
        <Form.Item>
          <RegisterFormButton type="primary" htmlType="submit">
            {t("REGISTER")}
          </RegisterFormButton>
        </Form.Item>
      </RegisterForm>
    </RegisterWrapper>
  );
};
