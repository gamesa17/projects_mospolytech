import { TFunction } from "i18next";
import { Rule, RuleObject } from "antd/lib/form";
import { BaseFormItemRule, FormInstance } from "./form.types";

export const getFormItemRules = <RuleType extends BaseFormItemRule>(t: TFunction, rules: RuleType[]): Rule[] =>
  rules.map((rule) => {
    if (typeof rule === "function") {
      return (form: FormInstance) => (rule as (t: TFunction, form: FormInstance) => RuleObject)(t, form);
    }

    const { messageKey, ...baseRules } = rule as { messageKey: string };

    return {
      ...baseRules,
      message: messageKey && t(messageKey),
    };
  });
