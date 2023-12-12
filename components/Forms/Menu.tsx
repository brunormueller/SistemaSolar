import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { useState } from "react"
export function MenuSelect({ onValueChange }: any) {
    const [nomeAtual, setNomeAtual] = useState("Distribuidores")
    const classButtonMenu = (nomeAtual === "Distribuidores" ? "bg-primary" : "bg-success")
    const classMenuItem = "text-[15px] hover:bg-bodydark p-1 px-4";
    const toggleNome = () => {
        setNomeAtual(nomeAtual === "Distribuidores" ? "Kits Sistema" : "Distribuidores");
        onValueChange(nomeAtual === 'Distribuidores' ? 'Kits Sistema' : 'Distribuidores');
    };
    return (
        <Menu animate={{ mount: { y: 0 }, unmount: { y: 25 }, }}>
            <MenuHandler className={`${classButtonMenu} m-3`}>
                <Button>{nomeAtual}</Button>
            </MenuHandler>
            <MenuList className="z-999999">
                <MenuItem onClick={toggleNome} className={classMenuItem}>
                    {nomeAtual === "Distribuidores" ? "Kit Sistema" : "Distribuidores"}
                </MenuItem>
            </MenuList>
        </Menu>
    );
}