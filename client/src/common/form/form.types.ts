import { RuleObject, RuleRender } from "antd/lib/form";
import { TFunction } from "i18next";

export type BaseFormItemRule =
  | {
      messageKey: string;
    }
  | {
      (t: TFunction, form: FormInstance): RuleObject;
    };

export type FormInstance = Parameters<RuleRender>[0];
