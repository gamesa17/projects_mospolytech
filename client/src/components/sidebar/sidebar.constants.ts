import { SnippetsOutlined, UserOutlined } from "@ant-design/icons";
import { SidebarMenuItemType } from "./sidebar.types";

export const MENU_ITEMS_MAP = {
  [SidebarMenuItemType.HOMEWORK]: SnippetsOutlined,
  [SidebarMenuItemType.PROFILE]: UserOutlined,
};
