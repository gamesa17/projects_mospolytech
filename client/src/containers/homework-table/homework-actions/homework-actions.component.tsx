import React from "react";
import { Button, Popconfirm, Select } from "antd";
import { useCommonTranslation } from "@localization";
import { HomeworkActionsWrapper } from "./homework-actions.styles";
import { HomeworkActionsProps } from "./homework-actions.types";

const HomeworkActionsRoot: React.FC<HomeworkActionsProps> = ({
  name,
  canEdit,
  canDelete,
  canUpdateDoneStatus,
  onEdit,
  onDelete,
}) => {
  const { t } = useCommonTranslation();

  return (
    <HomeworkActionsWrapper>
      {/* TODO: Добавить проверку на тип аккаунт(селект - для ученика, действия - для учителя) */}
      {canUpdateDoneStatus && (
        <Select defaultValue="NOT_DONE" getPopupContainer={(trigger) => trigger.parentNode}>
          <Select.Option key="DONE" value="DONE">
            {t("DONE")}
          </Select.Option>
          <Select.Option key="NOT_DONE" value="NOT_DONE">
            {t("NOT_DONE")}
          </Select.Option>
        </Select>
      )}
      {canEdit && (
        <Button type="text" onClick={onEdit}>
          {t("EDIT")}
        </Button>
      )}
      {canDelete && (
        <Popconfirm
          key="delete"
          placement="top"
          okText={t("DELETE")}
          cancelText={t("NO")}
          title={t("ARE_YOU_SURE_YOU_WANT_TO_DELETE_HOMEWORK", { name })}
          okButtonProps={{
            danger: true,
          }}
          onConfirm={onDelete}
        >
          <Button danger type="text">
            {t("DELETE")}
          </Button>
        </Popconfirm>
      )}
    </HomeworkActionsWrapper>
  );
};

export const HomeworkActions = React.memo(HomeworkActionsRoot);
