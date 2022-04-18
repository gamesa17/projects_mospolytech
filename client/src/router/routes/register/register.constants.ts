import { TFunction } from "i18next";

import { FormInstance } from "@common/form";
import { isValidUsername } from "@common/form/validators";

import { UserRole } from "@ts/enums";

export const REGISTER_FORM_INITIAL_VALUES = {
  role: UserRole.STUDENT,
};

export const REGISTER_FORM_USERNAME_RULES = [
  {
    required: true,
    messageKey: "EMPTY_USERNAME_ERROR",
  },
  {
    min: 6,
    messageKey: "SHORT_USERNAME",
  },
  (t: TFunction) => ({
    validator(_: unknown, value: string) {
      if (isValidUsername(value)) {
        return Promise.resolve();
      }

      return Promise.reject(new Error(t("INVALID_USERNAME")));
    },
  }),
];

export const REGISTER_FORM_PASSWORD_RULES = [
  {
    required: true,
    messageKey: "EMPTY_PASSWORD_ERROR",
  },
  {
    min: 6,
    messageKey: "SHORT_PASSWORD",
  },
];

export const REGISTER_FORM_CONFIRM_PASSWORD_RULES = [
  {
    required: true,
    messageKey: "EMPTY_CONFIRM_PASSWORD_ERROR",
  },
  (t: TFunction, { getFieldValue }: FormInstance) => ({
    validator(_: unknown, value: string) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }

      return Promise.reject(new Error(t("PASSWORDS_ARE_NOT_EQUAL")));
    },
  }),
];
