import React from "react";
import { Spin } from "antd";
import { LoaderWrapper } from "./loader.styles";

export const Loader: React.FC = () => (
  <LoaderWrapper>
    <Spin />
  </LoaderWrapper>
);
