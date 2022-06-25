import React from "react";
import { useNavigate } from "react-router";
import { DefaultTheme } from "styled-components";

import { LogoIcon } from "@icons/logo";
import { ROUTES } from "@client/router/routes";
import { useDashboardTranslation } from "@localization";

import { MENU_ITEMS_MAP } from "./sidebar.constants";
import { SidebarLogoWrapper, SidebarMenu, SidebarWrapper } from "./sidebar.styles";
import { SidebarMenuProps } from "./sidebar.types";

const SidebarRoot: React.FC<SidebarMenuProps> = ({ activeMenuItemKey, menuItems = [] }) => {
  const { t } = useDashboardTranslation();

  const navigate = useNavigate();

  const hasMenu = menuItems.length !== 0;

  const items = React.useMemo(
    () => menuItems.map((item) => ({ ...item, Icon: MENU_ITEMS_MAP[item.type] })),
    [menuItems]
  );

  const onMenuItemClickFactory = React.useCallback(
    (to: string) => () => {
      navigate(to);
    },
    [navigate]
  );

  return (
    <SidebarWrapper>
      <SidebarLogoWrapper to={ROUTES.DASHBOARD}>
        <LogoIcon />
      </SidebarLogoWrapper>
      {hasMenu && (
        <SidebarMenu
          theme={"dark" as unknown as DefaultTheme}
          mode="vertical"
          selectedKeys={[activeMenuItemKey || ""]}
          items={items.map(({ key, type, to, Icon }) => ({
            key,
            label: t(`MENU.${type}`),
            icon: <Icon />,
            onClick: onMenuItemClickFactory(to),
          }))}
        />
      )}
    </SidebarWrapper>
  );
};

export const Sidebar = React.memo(SidebarRoot);
