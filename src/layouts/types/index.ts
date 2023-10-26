export type NavGroup = {
  title: string;
  action?: string;
  subject?: string;
  badgeContent?: string;
  path?: string;
  children?: (NavGroup | NavLink)[];
};

export type NavLink = {
  path?: string;
  title: string;
  action?: string;
  subject?: string;
  disabled?: boolean;
  badgeContent?: string;
  externalLink?: boolean;
  openInNewTab?: boolean;
};

export type VerticalNavItemsType = (NavLink | NavGroup)[];
