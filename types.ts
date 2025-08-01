


export type Theme = 'light' | 'dark';

export interface NavItem {
  href: string;
  label: string;
}

export interface NavItemGroup {
  title: string;
  icon: React.ReactNode;
  items: NavItem[];
}

export interface PropDef {
    name: string;
    type: string;
    default: string;
    description: string;
}

export interface TreeNodeData {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNodeData[];
}