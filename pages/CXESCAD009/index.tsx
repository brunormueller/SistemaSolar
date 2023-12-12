import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import ReactTable from "@/components/ReactTable/ReactTable";
import { editarEstruturaFixacao } from "@/requests/CRUD/EstruturaFixacao/editarEstruturaFixacao";
import { listarEstruturas } from "@/requests/CRUD/EstruturaFixacao/listarEstruturaFixacao";
import FormEstruturaFixacao from "../CXESCAD009/FormEstruturaFixacao";

const ConsultaRegiaoVenda = () => {
    const columns = [
        {
            header: "ID",
            accessorKey: "id_estrutura",
        },
        {
            header: "Nome Estrutura",
            accessorKey: "nome_estrutura",
        },
        {
            header: "Código Tipo instalação",
            accessorKey: "cod_tipo_instalacao",
        },
        {
            header: "Status Estrutura",
            accessorKey: "status_estrutura",
        },
    ];

    return (
        <>
            <Breadcrumb pageName="Consulta Estrutura de Fixação" />
            <Container>
                <ReactTable
                    columns={columns}
                    listFunction={listarEstruturas}
                    idCol="id_estrutura"
                    isActiveCol="status_estrutura"
                    canEdit
                    canDesactive
                    editFunction={editarEstruturaFixacao}
                    Form={FormEstruturaFixacao}
                    pageName="Estrutura de Fixação"
                />
            </Container>
        </>
    );
};

export default ConsultaRegiaoVenda;
