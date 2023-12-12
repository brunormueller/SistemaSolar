import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import ReactTable from "@/components/ReactTable/ReactTable";
import { listarRegioesVenda } from "@/requests/CRUD/RegiaoVenda/listarRegioesVenda";
import { editarRegiaoVenda } from "@/requests/CRUD/RegiaoVenda/editarRegiaoVenda";
import FormRegioesVenda from "../CXESCAD055/FormRegioesVenda";

const ConsultaRegiaoVenda = () => {
    const columns = [
        {
            header: "ID",
            accessorKey: "id_regiao_venda",
        },
        {
            header: "Nome da Região",
            accessorKey: "nome_regiao_venda",
        },
        {
            header: "Tabela do Custo de Instalação",
            accessorKey: "tabCustoInst_regiao_venda",
        },
        {
            header: "Status da Região",
            accessorKey: "status_regiao_venda",
        },
    ];

    // const disabledFields = ["nome_regiao_venda", "nome_regiao_venda"];

    return (
        <>
            <Breadcrumb pageName="Consulta de Regiões de Venda" />
            <Container>
                <ReactTable
                    columns={columns}
                    listFunction={listarRegioesVenda}
                    idCol="id_regiao_venda"
                    isActiveCol="status_regiao_venda"
                    canEdit
                    canDesactive
                    editFunction={editarRegiaoVenda}
                    Form={FormRegioesVenda}
                    // disabledFields={disabledFields}
                    pageName="Região de Venda"
                />
            </Container>
        </>
    );
};

export default ConsultaRegiaoVenda;
