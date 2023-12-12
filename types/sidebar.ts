export interface ChildMenuItem {
  id_menu: string;
  tipo_menu: string;
  nome_menu: string;
  rotina_menu: string;
}

export interface MenuItem {
  tipo_icone_menu: any;
  id_menu: string;
  tipo_menu: string;
  nome_menu: string;
  menus: ChildMenuItem[];
  icone_menu: string;
  tipo_icone: string;
}
export interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
