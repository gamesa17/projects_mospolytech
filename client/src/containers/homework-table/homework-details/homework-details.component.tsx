import React from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";

import { useCommonTranslation } from "@localization";

import { Homework } from "@ts/homework";

import { HomeworkDetailsWrapper } from "./homework-details.styles";

const HomeworkDetailsRoot: React.FC<Homework> = ({ name, description, links }) => {
  const { t } = useCommonTranslation();

  return (
    <HomeworkDetailsWrapper>
      <Typography.Title level={3}>{name}</Typography.Title>
      <Typography.Text>{description}</Typography.Text>
      {links && (
        <>
          <Typography.Title level={5}>{t("LINKS")}</Typography.Title>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link}>{link}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </HomeworkDetailsWrapper>
  );
};

export const HomeworkDetails = React.memo(HomeworkDetailsRoot);
