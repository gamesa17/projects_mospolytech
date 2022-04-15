import React from "react";
import { Button, Select } from "antd";
import { useCommonTranslation } from "@localization";
import { HomeworkActionsWrapper } from "./homework-actions.styles";
import { HomeworkActionsProps } from "./homework-actions.types";

const HomeworkActionsRoot: React.FC<HomeworkActionsProps> = ({ onEdit, onDelete }) => {
  const { t } = useCommonTranslation();

  return (
    <HomeworkActionsWrapper>
      {/* TODO: Добавить проверку на тип аккаунт(селект - для ученика, действия - для учителя) */}
      <Select defaultValue="NOT_DONE" getPopupContainer={(trigger) => trigger.parentNode}>
        <Select.Option key="DONE" value="DONE">
          {t("DONE")}
        </Select.Option>
        <Select.Option key="NOT_DONE" value="NOT_DONE">
          {t("NOT_DONE")}
        </Select.Option>
      </Select>
      <Button type="text" onClick={onEdit}>
        {t("EDIT")}
      </Button>
      <Button danger type="text" onClick={onDelete}>
        {t("DELETE")}
      </Button>
    </HomeworkActionsWrapper>
  );
};

export const HomeworkActions = React.memo(HomeworkActionsRoot);
