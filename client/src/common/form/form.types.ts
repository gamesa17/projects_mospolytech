import { TFunction } from "i18next";
import { RuleObject, RuleRender } from "antd/lib/form";

export type BaseFormItemRule =
  | {
      messageKey: string;
    }
  | {
      (t: TFunction, form: FormInstance): RuleObject;
    };

export type FormInstance = Parameters<RuleRender>[0];
