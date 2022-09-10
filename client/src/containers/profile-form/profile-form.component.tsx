import React from "react";
import InputMask from "react-input-mask";
import { Form, Button, Input } from "antd";

import { ProfileFormProps } from "./profile-form.types";
import { useCommonTranslation } from "@localization";
import { ProfileFormWrapper } from "./profile-form.styles";

export const ProfileForm: React.FC<ProfileFormProps> = ({
  initialValues: { firstName = "", lastName = "", city = "", phone = "" } = {},
  onSubmit,
}) => {
  const { t } = useCommonTranslation();

  const [phoneInput, setPhoneInput] = React.useState("");

  const handlePhoneInputCHange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setPhoneInput(event.target.value),
    []
  );

  return (
    <ProfileFormWrapper>
      <Form labelCol={{ span: 2 }} wrapperCol={{ span: 6 }} onFinish={onSubmit}>
        <Form.Item name="firstName" label={t("FIRST_NAME")} initialValue={firstName}>
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label={t("LAST_NAME")} initialValue={lastName}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label={t("PHONE")} initialValue={phone}>
          <InputMask mask="+7 (999) 999 9999" value={phoneInput} onChange={handlePhoneInputCHange}>
            {((inputProps: {}) => <Input {...inputProps} />) as unknown as React.ReactNode}
          </InputMask>
        </Form.Item>
        <Form.Item name="city" label={t("CITY")} initialValue={city}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t("SAVE")}
          </Button>
        </Form.Item>
      </Form>
    </ProfileFormWrapper>
  );
};
