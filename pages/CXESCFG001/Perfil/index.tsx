import ReactTable from "@/components/ReactTable/ReactTable";
import { cadastrarPerfil } from "@/requests/CRUD/Perfil/cadastrarPerfil";
import { editarPerfil } from "@/requests/CRUD/Perfil/editarPerfil";
import { listarPerfis } from "@/requests/CRUD/Perfil/listarPerfis";
import _ from "lodash";
import FormEditPerfil from "./FormEditPerfil";

const PerfilComponent = () => {
    const dados = [
        "status_perfil",
        "nome_perfil",
        "engenharia_perfil",
        "vendedor_perfil",
        "visualiza_todos_funis_perfil",
        "visualiza_todos_contatos_perfil",
        "visualiza_todas_agendas_perfil",
    ];
    const columns = [
        ...dados.map((e) => ({
            header: _.capitalize(e)
                .replaceAll("_perfil", "")
                .replaceAll("_", " "),
            accessorKey: e,
        })),
    ];

    const formatSimouNao = (arr: any) => {
        return arr.map((perfil: any) => {
            perfil["vendedor_perfil"] =
                +perfil["vendedor_perfil"] === 1 ? "Sim" : "Não";
            perfil["engenharia_perfil"] =
                +perfil["engenharia_perfil"] === 1 ? "Sim" : "Não";
            perfil["visualiza_todos_funis_perfil"] =
                +perfil["visualiza_todos_funis_perfil"] === 1 ? "Sim" : "Não";
            perfil["visualiza_todos_contatos_perfil"] =
                +perfil["visualiza_todos_contatos_perfil"] === 1
                    ? "Sim"
                    : "Não";
            perfil["visualiza_todas_agendas_perfil"] =
                +perfil["visualiza_todas_agendas_perfil"] === 1 ? "Sim" : "Não";
            return perfil;
        });
    };

    const editarPerfis = (data: any) => {
        return editarPerfil(data);
    };

    return (
        <ReactTable
            columns={columns}
            listFunction={listarPerfis}
            formatFunction={formatSimouNao}
            idCol="id_perfil"
            isActiveCol="status_perfil"
            canEdit
            canDesactive
            createFunction={cadastrarPerfil}
            editFunction={editarPerfis}
            Form={FormEditPerfil}
            pageName="Perfil"
        />
    );
};

export default PerfilComponent;
