import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import ReactTable from "@/components/ReactTable/ReactTable";
import { editarIsencao } from "@/requests/CRUD/IsencaoGeracao/editarIsencao";
import { listarIsencao } from "@/requests/CRUD/IsencaoGeracao/listarIsencao";
import { FormatFields } from "@/utils";
import _ from "lodash";
import FormIsencaoDeGeracao from "../CXESCAD019/FormInsencaoDeGeracao";

const ConsultaAliquota = () => {
    const dados = ["icms1", "icms2", "pis", "cofins"];
    const columns = [
        {
            header: "ID",
            accessorKey: "id",
        },
        ...dados.map((e) => ({
            header: _.capitalize(e),
            accessorKey: e,
        })),
        {
            header: "Status Isencao",
            accessorKey: "status",
        },
    ];

    const formatarListaIsencao = (arr: any) => {
        return arr.map((isencao: any) => {
            dados.map((coluna) => {
                isencao[coluna] = FormatFields.formatarNumero(isencao[coluna]) + "%";
            });
            return isencao;
        });
    };

    const sendEditIsencaoDeGeracao = async (data: any) => {
        if (Object.keys(data).some((chave) => dados.includes(chave))) {
            dados.map((coluna) => {
                data[coluna] = FormatFields.desformatarNumeros(data[coluna]);
            });
        }
        return editarIsencao(data);
    };

    return (
        <>
            <Breadcrumb pageName="Consulta de Insenção de Geração" />
            <Container>
                <ReactTable
                    columns={columns}
                    listFunction={listarIsencao}
                    formatFunction={formatarListaIsencao}
                    idCol="id"
                    isActiveCol="status"
                    canEdit
                    canDesactive
                    editFunction={sendEditIsencaoDeGeracao}
                    Form={FormIsencaoDeGeracao}
                    pageName="Insenção de Geração"
                />
            </Container>
        </>
    );
};

export default ConsultaAliquota;
