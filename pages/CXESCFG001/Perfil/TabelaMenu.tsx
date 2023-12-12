import Input from "@/components/Forms/Input";
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { sidebarData } from "@/requests/common/Sidebar/sidebar";
import { useAuth } from "@/src/contexts/authContext";
import { useEffect, useState } from "react";

const TabelaMenu = ({ form, menusDefault }: any) => {
    const [menus, setMenus] = useState<any[]>([]);
    const [menusId, setMenusId] = useState<any[]>([]);
    const { valuesSession } = useAuth();
    const { session } = valuesSession();
    const id_usuario = session.id_usuario;
    const perfil = session.perfil_usuario;

    useEffect(() => {
        sidebarData(1, 1000).then((response) => {
            setMenus(response.body);
            if (menusDefault) {
                setMenusId(menusDefault.split("^"));
            }
        });
    }, []);

    useEffect(() => {
        form.setValue("permissoes_perfil", menusId.join("^"));
    }, [menusId]);

    return (
        <Table className="min-w-full bg-white dark:bg-[#1d2a39] border border-gray-300 shadow-sm">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] font-bold">
                        Menu Pai
                    </TableHead>
                    <TableHead className="font-bold py-2 px-4 border-b text-center">
                        Menu
                    </TableHead>
                    <TableHead className=" w-6 font-bold">Acesso</TableHead>
                    <TableHead className=" w-6 font-bold">Edição</TableHead>
                </TableRow>
            </TableHeader>
            <tbody>
                {menus.map((menu: any) => {
                    return (
                        <TableRow key={menu.id_menu}>
                            <TableCell className="py-2 text-center">
                                
                            </TableCell>
                            <TableCell className="py-2 text-center">
                                {menu.nome_menu}
                            </TableCell>
                            <TableCell className="py-2 text-center">
                                <Input
                                    name=""
                                    checked={menusId.some(
                                        (id) => id == menu.id_menu
                                    )}
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setMenusId((previous) => [
                                                ...previous,
                                                menu.id_menu,
                                            ]);
                                        } else {
                                            setMenusId((previous) =>
                                                previous.filter(
                                                    (menufiltro) =>
                                                        menufiltro !==
                                                        menu.id_menu
                                                )
                                            );
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell className="py-2 text-center">
                                <Input
                                    type="checkbox"
                                    name={"permissoes_perfil"}
                                    // formulario={form}
                                    className="hidden"
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
                {menus?.map((menu: any) => {
                    //mapear os menus
                    return menu.menus[0]?.map((submenu: any) => (
                        <TableRow key={submenu.id_menu}>
                            <TableCell className="py-2 text-center">
                                {menu.nome_menu}
                            </TableCell>
                            <TableCell className="py-2 text-center">
                                {submenu.nome_menu}
                            </TableCell>
                            <TableCell className="py-2 text-center">
                                <Input
                                    name=""
                                    checked={menusId.some(
                                        (id) => id == submenu.id_menu
                                    )}
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setMenusId((previous) => [
                                                ...previous,
                                                submenu.id_menu,
                                            ]);
                                        } else {
                                            setMenusId((previous) =>
                                                previous.filter(
                                                    (menufiltro) =>
                                                        menufiltro !==
                                                        submenu.id_menu
                                                )
                                            );
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell className="py-2 text-center">
                                <Input
                                    type="checkbox"
                                    name={"permissoes_perfil"}
                                    // formulario={form}
                                    className="hidden"
                                />
                            </TableCell>
                        </TableRow>
                    ));
                })}
            </tbody>
        </Table>
    );
};

export default TabelaMenu;
