import React from "react";
import { Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { getCountryFlagSrc } from "@common/flags";
import { getShortCountryNameByLanguage } from "@common/languages";

import { CourseCardProps } from "./course-card.types";
import { CourseCardWrapper } from "./course-card.styles";

const { Meta } = Card;

const CourseCardRoot: React.FC<CourseCardProps> = ({
  name,
  language: { name: languageName },
  level: { name: levelName },
}) => {
  const flagSrc = React.useMemo(() => {
    const shortCountryName = getShortCountryNameByLanguage(languageName);

    return shortCountryName && getCountryFlagSrc(shortCountryName);
  }, [languageName]);

  return (
    <CourseCardWrapper
      cover={<img alt={languageName} src={flagSrc} />}
      actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}
      bordered
    >
      <Meta title={name} description={levelName} />
    </CourseCardWrapper>
  );
};

export const CourseCard = React.memo(CourseCardRoot);
