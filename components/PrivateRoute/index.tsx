import { APP_ROUTES } from "@/constants/app-routes";
import { sidebarData } from "@/requests/common/Sidebar/sidebar";
import { useAuth } from "@/src/contexts/authContext";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type PrivateRouteProps = {
  children: ReactNode;
};

// const fetchData = async (
//   id_usuario: any,
//   perfil_usuario: any,
//   pathname: any,
//   push: any
// ) => {
//   const res = await sidebarData(id_usuario, perfil_usuario);
//   const menusPermitidos = res.body.map((menuItem: any) =>
//     menuItem.menus.some((menuPath: any) =>
//       Object.values(menuPath).some(
//         (menuPathValue: any) => "/" + menuPathValue.rotina_menu === pathname
//       )
//     )
//   );

//   return menusPermitidos;
// };

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { checkUserAuthenticated, valuesSession } = useAuth();
  const { push } = useRouter();
  const pathname = usePathname();
  const { session } = valuesSession();
  const id_usuario = session.id_usuario;
  const perfil_usuario = session.perfil_usuario;
  const isUserAutenticated = checkUserAuthenticated();

  useEffect(() => {
    const fetchDataAndCheckAccess = async () => {
      if (!isUserAutenticated) {
        push(APP_ROUTES.public.login);
      }
      //  else {
      //   const menusPermitidos = await fetchData(
      //     id_usuario,
      //     perfil_usuario,
      //     pathname,
      //     push
      //   );
      //   if (pathname != "/app") {
      //     if (!menusPermitidos || !menusPermitidos.includes(true)) {
      //       push(APP_ROUTES.public.noAccess);
      //     }
      //   }
      // }
    };

    fetchDataAndCheckAccess();
  }, [isUserAutenticated, push]);

  return (
    <>
      {!isUserAutenticated && null}
      {isUserAutenticated && children}
    </>
  );
};

export default PrivateRoute;
