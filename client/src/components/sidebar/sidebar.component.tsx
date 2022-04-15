import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router";
import { LogoIcon } from "@icons/logo";
import { ROUTES } from "@client/router/routes";
import { useDashboardTranslation } from "@localization";
import { SidebarLogoWrapper, SidebarMenu, SidebarWrapper } from "./sidebar.styles";
import { SidebarMenuProps } from "./sidebar.types";
import { MENU_ITEMS_MAP } from "./sidebar.constants";

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
        // @ts-ignore: Unreachable type error
        <SidebarMenu theme="dark" mode="vertical" selectedKeys={[activeMenuItemKey || ""]}>
          {items.map(({ key, type, to, Icon }) => (
            <Menu.Item key={key} icon={<Icon />} onClick={onMenuItemClickFactory(to)}>
              {t(`MENU.${type}`)}
            </Menu.Item>
          ))}
        </SidebarMenu>
      )}
    </SidebarWrapper>
  );
};

export const Sidebar = React.memo(SidebarRoot);
