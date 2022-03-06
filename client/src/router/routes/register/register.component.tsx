import React from "react";
import { Form, Input, Radio } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { getFormItemRules } from "@common/form";
import { GenericObject } from "@common/genericObject";
import { useCommonTranslation, useAuthTranslation } from "@localization";
import { UserType } from "@ts/user/user.enums";
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

  const accountTypes = React.useMemo(() => GenericObject.keys(UserType), []);

  const onFinish = React.useCallback((values: unknown) => {
    console.log(values);
  }, []);

  return (
    <RegisterWrapper>
      <RegisterForm initialValues={REGISTER_FORM_INITIAL_VALUES} onFinish={onFinish}>
        <Form.Item>
          <RegisterFormTitle level={3}>{t("REGISTRATION")}</RegisterFormTitle>
        </Form.Item>
        <Form.Item label="Кто вы" name="accountType">
          <Radio.Group buttonStyle="solid">
            {accountTypes.map((accountType) => (
              <Radio.Button key={accountType} value={accountType}>
                {commonT(`USER.TYPE.${accountType}`)}
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
