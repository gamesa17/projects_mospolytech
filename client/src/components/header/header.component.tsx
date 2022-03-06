import React from "react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useDashboardTranslation } from "@localization";
import { HeaderChildren, HeaderWrapper } from "./header.styles";
import { HeaderProps } from "./header.types";

export const Header: React.FC<HeaderProps> = ({ children, onLogout }) => {
  const { t } = useDashboardTranslation();

  return (
    <HeaderWrapper>
      <HeaderChildren>{children}</HeaderChildren>
      {onLogout && (
        <Button icon={<LogoutOutlined />} onClick={onLogout}>
          {t("LOGOUT")}
        </Button>
      )}
    </HeaderWrapper>
  );
};
