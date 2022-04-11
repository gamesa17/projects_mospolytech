import { ROUTES } from "@client/router/routes";
import { SidebarMenuItem, SidebarMenuItemType } from "@components/sidebar";

export const MENU_ITEMS: SidebarMenuItem[] = [
  {
    key: ROUTES.PROFILE,
    to: ROUTES.PROFILE,
    type: SidebarMenuItemType.PROFILE,
  },
  {
    key: ROUTES.HOMEWORK,
    to: ROUTES.HOMEWORK,
    type: SidebarMenuItemType.HOMEWORK,
  },
  {
    key: ROUTES.GROUPS,
    to: ROUTES.GROUPS,
    type: SidebarMenuItemType.GROUPS,
  },
];
