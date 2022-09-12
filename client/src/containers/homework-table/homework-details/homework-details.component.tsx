import React from "react";
import sanitize from "sanitize-html";
import { Typography } from "antd";

import { Homework } from "@ts/types";

import { HomeworkDetailsLinks, HomeworkDetailsWrapper } from "./homework-details.styles";

const HomeworkDetailsRoot: React.FC<Homework> = ({ name, description, link }) => (
  <HomeworkDetailsWrapper>
    <Typography.Title level={3}>{name}</Typography.Title>
    {description && (
      <Typography.Text>
        <span dangerouslySetInnerHTML={{ __html: sanitize(description) }}></span>
      </Typography.Text>
    )}
    {link && (
      <HomeworkDetailsLinks>
        <li>
          <a href={link} target="_blank" rel="noreferrer nofollow">
            {link}
          </a>
        </li>
      </HomeworkDetailsLinks>
    )}
  </HomeworkDetailsWrapper>
);

export const HomeworkDetails = React.memo(HomeworkDetailsRoot);
