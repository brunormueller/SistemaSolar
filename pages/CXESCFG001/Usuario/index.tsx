import ReactTable from "@/components/ReactTable/ReactTable";
import { listarEmpresas } from "@/requests/CRUD/Empresa/listarEmpresas";
import { listarPerfis } from "@/requests/CRUD/Perfil/listarPerfis";
import { cadastrarUsuario } from "@/requests/CRUD/Usuario/cadastrarUsuario";
import { editarUsuario } from "@/requests/CRUD/Usuario/editarUsuario";
import { listarUsuarios } from "@/requests/CRUD/Usuario/listarUsuarios";
import { resetarSenhaUsuario } from "@/requests/CRUD/Usuario/resetarSenhaUsuario";
import { FormatFields } from "@/utils";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormUsuario from "./FormUsuario";

const UsuarioComponent = () => {
    const [perfis, setPerfis] = useState<any[]>([]);
    const [empresas, setEmpresas] = useState<any[]>([]);

    const columns = [
        {
            header: "Código",
            accessorKey: "id_usuario",
        },
        {
            header: "Nome",
            accessorKey: "nome_usuario",
        },
        {
            header: "Perfil",
            accessorKey: "perfil_usuario",
        },
        {
            header: "Comissão",
            accessorKey: "comissao_usuario",
        },
        {
            header: "Login",
            accessorKey: "login_usuario",
        },
        {
            header: "E-mail",
            accessorKey: "email_usuario",
        },
        {
            header: "Telefone 1",
            accessorKey: "telefone1_usuario",
        },
        {
            header: "Status",
            accessorKey: "status_usuario",
        },
    ];

    async function formatarListaUsuarios(arr: any) {
        let perfisList: any[] = [];
        let empresasList: any[] = [];
        if (perfis[0] == undefined) {
            perfisList = await listarPerfis().then((res) => {
                setPerfis(res);
                return res;
            });
        } else {
            perfisList = perfis;
        }

        if (empresas[0] == undefined) {
            empresasList = await listarEmpresas().then((res) => {
                setEmpresas(res);
                return res;
            });
        } else {
            empresasList = empresas;
        }

        return arr.map((e: any) => {
            e["comissao_usuario"] = `${FormatFields.formatarNumero(
                e["comissao_usuario"]
            )}%`;
            e["perfil_usuario"] = perfisList.find(
                (perfil: any) => perfil.id_perfil == e["perfil_usuario"]
            )?.nome_perfil;
            return e;
        });
    }
    const onSubmitFunction = async (data: FieldValues) => {
        data["comissao_usuario"] = data["comissao_usuario"]
            .replaceAll(".", "")
            .replaceAll(",", ".");
        return cadastrarUsuario(data);
    };
    const refreshFunction = async (data: any) => {
        resetarSenhaUsuario(data);
    };

    const disabledFields = ["senha_usuario"];

    return (
        <ReactTable
            columns={columns}
            createFunction={onSubmitFunction}
            listFunction={listarUsuarios}
            formatFunction={formatarListaUsuarios}
            idCol="id_usuario"
            refreshFunction={refreshFunction}
            canRefresh
            isActiveCol="status_usuario"
            canEdit
            canDesactive
            editFunction={editarUsuario}
            Form={FormUsuario}
            disabledFields={disabledFields}
            pageName="Usuário"
        />
    );
};

export default UsuarioComponent;
