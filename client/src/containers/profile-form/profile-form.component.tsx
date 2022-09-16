import React from "react";
import InputMask from "react-input-mask";
import { Form, Button, Input } from "antd";

import { useCommonTranslation } from "@localization";

import { useSelector } from "@client/store";
import { selectCapabilities } from "@client/store/permissions";

import { ProfileFormProps } from "./profile-form.types";
import { ProfileFormWrapper } from "./profile-form.styles";

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialValues = {}, onSubmit }) => {
  const { t } = useCommonTranslation();

  const { canUpdateUserProfileSpecificUsers } = useSelector(selectCapabilities);

  const isReadOnly = !canUpdateUserProfileSpecificUsers;

  const [phoneInput, setPhoneInput] = React.useState("");

  const handlePhoneInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setPhoneInput(event.target.value),
    []
  );

  return (
    <ProfileFormWrapper>
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 6 }}
        disabled={isReadOnly}
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Form.Item name="firstName" label={t("FIRST_NAME")}>
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label={t("LAST_NAME")}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label={t("PHONE")}>
          <InputMask mask="+7 (999) 999 9999" value={phoneInput} onChange={handlePhoneInputChange}>
            {((inputProps: {}) => <Input {...inputProps} />) as unknown as React.ReactNode}
          </InputMask>
        </Form.Item>
        <Form.Item name="email" label={t("EMAIL")} rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>
        {canUpdateUserProfileSpecificUsers && (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("SAVE")}
            </Button>
          </Form.Item>
        )}
      </Form>
    </ProfileFormWrapper>
  );
};
