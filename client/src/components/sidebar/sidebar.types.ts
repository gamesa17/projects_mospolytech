export enum SidebarMenuItemType {
  HOMEWORK = "HOMEWORK",
  PROFILE = "PROFILE",
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
