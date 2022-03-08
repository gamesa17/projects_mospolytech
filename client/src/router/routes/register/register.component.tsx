import React from "react";
import { Form, Input, Radio } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { register } from "@client/store/auth";
import { ROLES } from "@common/roles";
import { getFormItemRules } from "@common/form";
import { useThunkDispatch } from "@client/store";
import { useCommonTranslation, useAuthTranslation } from "@localization";
import { RegisterInput } from "@ts/requests/auth/register";
import { RegisterForm, RegisterFormButton, RegisterFormTitle, RegisterWrapper } from "./register.styles";
import {
  REGISTER_FORM_CONFIRM_PASSWORD_RULES,
  REGISTER_FORM_INITIAL_VALUES,
  REGISTER_FORM_PASSWORD_RULES,
  REGISTER_FORM_USERNAME_RULES,
} from "./register.constants";

export const Register: React.FC = () => {
  const { t } = useAuthTranslation();
  const { t: commonT } = useCommonTranslation();

  const dispatchThunk = useThunkDispatch();

  const onFinish = React.useCallback(
    (values: unknown) => {
      dispatchThunk(register(values as RegisterInput));
    },
    [dispatchThunk]
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
