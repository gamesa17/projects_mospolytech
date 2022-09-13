import React from "react";
import { Card, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { getCountryFlagSrc } from "@common/flags";
import { getShortCountryNameByLanguage } from "@common/languages";

import { CourseCardProps } from "./course-card.types";
import { CourseCardWrapper } from "./course-card.styles";
import { useCommonTranslation } from "@localization";

const CourseCardRoot: React.FC<CourseCardProps> = ({
  name,
  language: { name: languageName },
  level: { name: levelName },
  canEdit,
  canDelete,
  canAddMembers,
  onEdit,
  onDelete,
  onPhotoLoad,
}) => {
  const { t } = useCommonTranslation();

  const showEditButton = canEdit || canAddMembers;

  const flagSrc = React.useMemo(() => {
    const shortCountryName = getShortCountryNameByLanguage(languageName);

    return shortCountryName && getCountryFlagSrc(shortCountryName);
  }, [languageName]);

  return (
    <CourseCardWrapper
      cover={<img alt={languageName} src={flagSrc} onLoad={onPhotoLoad} />}
      actions={[
        ...(showEditButton ? [<EditOutlined key="edit" onClick={onEdit} />] : []),
        ...(canDelete
          ? [
              <Popconfirm
                key="delete"
                placement="top"
                okText={t("DELETE")}
                cancelText={t("NO")}
                title={t("ARE_YOU_SURE_YOU_WANT_TO_DELETE_COURSE", { name })}
                okButtonProps={{
                  danger: true,
                }}
              >
                <DeleteOutlined onClick={onDelete} />
              </Popconfirm>,
            ]
          : []),
      ]}
      bordered
    >
      <Card.Meta title={name} description={levelName} />
    </CourseCardWrapper>
  );
};

export const CourseCard = React.memo(CourseCardRoot);
