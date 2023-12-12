import GetIcon from "@/components/Icons/IconComponent";
import { listarTodosKanbans } from "@/requests/CRM/kanban";
import { sidebarData } from "@/requests/common/Sidebar/sidebar";

import { MenuItem, SidebarProps } from "@/types/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { BsFunnel } from "react-icons/bs";
import * as io from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { cadastrarMenuFavorito } from "@/requests/CRUD/Usuario/cadastrarUsuario";
import { useAuth } from "@/src/contexts/authContext";
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [kabanMenus, setKabanMenus] = useState<any[]>([]);
  const [funilClicado, setFunilClicado] = useState(0);
  const [favoritos, setFavoritos] = useState<{ [key: string]: boolean }>({});
  const [favoritosPorUsuario, setFavoritosPorUsuario] = useState();
  const { valuesSession } = useAuth();
  const { session } = valuesSession();
  const id_usuario = session.id_usuario;
  const perfil = session.perfil_usuario;

  useEffect(() => {
    listarTodosKanbans().then((response) => {
      setKabanMenus(response);
    });

    if (id_usuario && perfil) {
      handleGetDataMenu();
    }
  }, [id_usuario]);
  const handleGetDataMenu = async () => {
    await sidebarData(id_usuario, perfil).then((response) => {
      setMenus(response.body);
      setFavoritos(response.favoritosArr);
    });
  };
  const handleCadastraFavorito = async (menu: any) => {
    await cadastrarMenuFavorito(menu, id_usuario).then((res) => {
      handleGetDataMenu();
    });
  };
  return (
    <>
      <aside
        className={`absolute left-0 top-0 z-1 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center self-center	gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            <Image
              width={162}
              height={25}
              src={"/images/logo/linksun.png"}
              alt="Logo"
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          ></button>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-1  px-4 lg:mt-9 lg:px-6">
            {/* <!-- Menu Group --> */}
            <div>
              <li className="list-none pb-5">
                <Link
                  href="CXESCRM005" // You need to specify the correct href for child items
                  className={`group relative flex items-center gap-2.5 rounded-md mb-4 py-2 px-4  bg-secondary font-medium text-black duration-300 ease-in-out  dark:hover:bg-meta-4}`}
                >
                  <AiOutlinePlus />
                  Nova Proposta
                </Link>
              </li>
              <li className="list-none pb-2">
                <Link
                  href="CXESCRM004" // You need to specify the correct href for child items
                  className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4  hover:bg-secondaryMenu font-medium text-bodydark1 duration-300 ease-in-out  dark:hover:bg-meta-4}`}
                >
                  <MdSpaceDashboard />
                  Dashboard
                </Link>
              </li>
              <ul className="mb-2 flex flex-col gap-1.5">
                <SidebarLinkGroup activeCondition={pathname === "/"}>
                  {(handleClick, open) => (
                    <>
                      <Link
                        href="#"
                        className={`group relative flex items-center  gap-2.5 rounded-md py-2 px-4 ${
                          open && "bg-primary hover:bg-primary"
                        } hover:bg-secondaryMenu font-medium text-bodydark1 duration-300 ease-in-out  dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                        }}
                      >
                        <AiFillStar />
                        Favoritos
                        <io.IoIosArrowDown
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5">
                          {menus &&
                            menus.map((menuItem) =>
                              menuItem.menus.map((menuPath) =>
                                Object.values(menuPath).map(
                                  (menuPathValue, index) =>
                                    menuPathValue.menu_favorito && (
                                      <li
                                        key={index}
                                        className="flex items-center"
                                      >
                                        {favoritos[menuPathValue.id_menu] ? (
                                          <AiFillStar
                                            onClick={() => {
                                              handleCadastraFavorito({
                                                ...favoritos,
                                                [menuPathValue.id_menu]: false,
                                              });
                                              setFavoritos((prev) => ({
                                                ...prev,
                                                [menuPathValue.id_menu]: false,
                                              }));
                                            }}
                                            color="#fcba03"
                                            size={21}
                                            className="ml-2"
                                          />
                                        ) : (
                                          <AiOutlineStar
                                            onClick={() => {
                                              handleCadastraFavorito({
                                                ...favoritos,
                                                [menuPathValue.id_menu]: true,
                                              });
                                              setFavoritos((prev) => ({
                                                ...prev,
                                                [menuPathValue.id_menu]: true,
                                              }));
                                            }}
                                            size={21}
                                            className="ml-2"
                                          />
                                        )}
                                        <Link
                                          href={menuPathValue.rotina_menu}
                                          className={`group relative flex text-left py-2  text-sm gap-2.5 rounded-md px-6 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                            pathname ===
                                              `/${menuPathValue.rotina_menu}` &&
                                            "text-white"
                                          }`}
                                        >
                                          {menuPathValue.nome_menu}
                                        </Link>
                                      </li>
                                    )
                                )
                              )
                            )}
                        </ul>
                      </div>
                    </>
                  )}
                </SidebarLinkGroup>
              </ul>

              <ul className="mb-2 flex flex-col gap-1.5">
                {menus &&
                  menus.map((menuItem) => (
                    <SidebarLinkGroup
                      key={menuItem.id_menu}
                      activeCondition={menuItem.menus.some((menuPath) => {
                        return Object.values(menuPath).some((menuPathValue) => {
                          const menuText = "/" + menuPathValue.rotina_menu;
                          if (menuText == pathname) {
                            return true;
                          }
                        });
                      })}
                    >
                      {(handleClick, open) => (
                        <>
                          <Link
                            href="#"
                            className={`group relative flex items-center  gap-2.5 rounded-md py-2 px-4 ${
                              open && "bg-primary hover:bg-primary"
                            } hover:bg-secondaryMenu font-medium text-bodydark1 duration-300 ease-in-out  dark:hover:bg-meta-4 `}
                            onClick={(e) => {
                              e.preventDefault();
                              handleClick();
                            }}
                          >
                            {menuItem.icone_menu && (
                              <GetIcon
                                icon={menuItem.icone_menu}
                                className=""
                              />
                            )}
                            {menuItem.tipo_menu === "0" && menuItem.nome_menu}
                            <io.IoIosArrowDown
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                open && "rotate-180"
                              }`}
                            />
                          </Link>
                          <div
                            className={`translate transform overflow-hidden ${
                              !open && "hidden"
                            }`}
                          >
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5">
                              {menuItem.menus.map((childItem) => {
                                const nomeMenu = Object.values(childItem);

                                return nomeMenu.map((item, index) => (
                                  <li key={index} className="flex items-center">
                                    {favoritos[item.id_menu] ? (
                                      <AiFillStar
                                        onClick={() => {
                                          handleCadastraFavorito({
                                            ...favoritos,
                                            [item.id_menu]: false,
                                          });
                                          setFavoritos((prev) => ({
                                            ...prev,
                                            [item.id_menu]: false,
                                          }));
                                        }}
                                        color="#fcba03"
                                        size={21}
                                        className="ml-2"
                                      />
                                    ) : (
                                      <AiOutlineStar
                                        onClick={() => {
                                          handleCadastraFavorito({
                                            ...favoritos,
                                            [item.id_menu]: true,
                                          });
                                          setFavoritos((prev) => ({
                                            ...prev,
                                            [item.id_menu]: true,
                                          }));
                                        }}
                                        size={21}
                                        className="ml-2"
                                      />
                                    )}

                                    <Link
                                      href={item.rotina_menu}
                                      className={`group relative  flex text-left py-2 text-sm gap-2.5 rounded-md px-6 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                        pathname === "/" + item.rotina_menu &&
                                        "text-white"
                                      }`}
                                    >
                                      {item.nome_menu}{" "}
                                    </Link>
                                  </li>
                                ));
                              })}
                            </ul>
                          </div>
                        </>
                      )}
                    </SidebarLinkGroup>
                  ))}
              </ul>
              <ul className="mb-2 flex flex-col gap-1.5">
                <SidebarLinkGroup activeCondition={pathname === "/CXESCRM002"}>
                  {(handleClick, open) => (
                    <>
                      <Link
                        href="#"
                        className={`group relative flex items-center  gap-2.5 rounded-md py-2 px-4 ${
                          open && "bg-primary hover:bg-primary"
                        } hover:bg-secondaryMenu font-medium text-bodydark1 duration-300 ease-in-out  dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                        }}
                      >
                        <BsFunnel />
                        Funis
                        <io.IoIosArrowDown
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5">
                          {kabanMenus &&
                            kabanMenus.map((kanban, index) => (
                              <li key={index}>
                                <Link
                                  href={`CXESCRM002?funil=${kanban.id_kanban}`}
                                  onClick={() =>
                                    setFunilClicado(kanban.id_kanban)
                                  }
                                  className={`group relative flex text-left py-2  text-sm gap-2.5 rounded-md px-6 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                    pathname === "/CXESCRM002" &&
                                    funilClicado === kanban.id_kanban &&
                                    "text-white"
                                  }`}
                                >
                                  {kanban.titulo_kanban}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </>
                  )}
                </SidebarLinkGroup>
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
