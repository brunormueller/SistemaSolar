import { LinksunBackend } from "../../../services/api";

export async function sidebarData(id_user: any, perfil: any) {
  const data = await LinksunBackend.get(
    `?class=Menu&action=getMenus&id_usuario=${id_user}&perfil_usuario=${perfil}`
  );
  let favoritosArr = [] as any;
  data.body.map((menuItem: any) => {
    menuItem.menus.map((menuPath: any) => {
      Object.values(menuPath).map((menuPathValue: any) => {
        if (menuPathValue.menu_favorito) {
          favoritosArr[menuPathValue.id_menu] = true;
        }
      });
    });
  });

  return {
    body: data.body,
    favoritosArr,
  };
}
