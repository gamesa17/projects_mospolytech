export enum SidebarMenuItemType {
  HOMEWORK = "HOMEWORK",
  PROFILE = "PROFILE",
  GROUPS = "GROUPS",
}

export type SidebarMenuItem = {
  key: string;
  type: SidebarMenuItemType;
  to: string;
};

export type SidebarMenuProps = {
  activeMenuItemKey?: string;
  menuItems?: SidebarMenuItem[];
};
