import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import { useState } from "react";
import FomParametrosAutomatizacaoComponent from "./Automatizacao";
import ContratoComponent from "./Contrato";
import FunisComponent from "./Funis";
import FormIntegradorComponent from "./Integrador";
import NavItem from "./NavItem";
import PerfilComponent from "./Perfil";
import FormPropostaComponent from "./Proposta";
import UsuarioComponent from "./Usuario";

const Configuracoes = () => {
    const [navMenus, setNavMenus] = useState([
        {
            name: "Integrador",
            component: FormIntegradorComponent,
            selected: true,
        },
        {
            name: "Perfis de Usuário",
            component: PerfilComponent,
            selected: false,
        },
        { name: "Usuários", component: UsuarioComponent, selected: false },
        { name: "Funis", component: FunisComponent, selected: false },
        {
            name: "Parâmetros de Automatização",
            component: FomParametrosAutomatizacaoComponent,
            selected: false,
        },
        { name: "Proposta", component: FormPropostaComponent, selected: false },
        { name: "Contrato", component: ContratoComponent, selected: false },
    ]);

    const SelectedComponent = navMenus.find((menu) => menu.selected)?.component;

    const handleMenuItemClick = (index: number) => {
        setNavMenus((prevNavMenus) =>
            prevNavMenus.map((nav, i) => ({
                ...nav,
                selected: i === index,
            }))
        );
    };

    return (
        <>
            <Breadcrumb pageName="Configurações" />
            <Container>
                <ul className="list-none flex flex-row overflow-auto ">
                    {navMenus?.map((menu, index) => (
                        <NavItem
                            key={`${menu.name}_${index}`}
                            selected={menu.selected}
                            index={index}
                            arrayLength={navMenus.length}
                            onClick={() => handleMenuItemClick(index)}
                        >
                            {menu.name}
                        </NavItem>
                    ))}
                </ul>
                <section className="overflow-x-auto py-5 ">
                    {SelectedComponent && <SelectedComponent />}
                </section>
            </Container>
        </>
    );
};

export default Configuracoes;
