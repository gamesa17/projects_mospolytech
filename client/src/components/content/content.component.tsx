import React from "react";
import { ContentWrapper } from "./content.styles";
import { ContentProps } from "./content.types";

export const Content: React.FC<ContentProps> = ({ padding, children }) => (
  <ContentWrapper padding={padding}>{children}</ContentWrapper>
);
