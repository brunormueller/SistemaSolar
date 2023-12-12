import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import ReactTable from "@/components/ReactTable/ReactTable";
import { editarRegional } from "@/requests/CRUD/Regional/editarRegional";
import { listarRegionais } from "@/requests/CRUD/Regional/listarRegionais";
import { FormatFields } from "@/utils";
import FormRegionaisVenda from "../CXESCAD047/FormRegionaisVenda";

const ConsultaRegiaoVenda = () => {
    const columns = [
        {
            header: "Código",
            accessorKey: "id_regiao",
        },
        {
            header: "Regiao",
            accessorKey: "nome_regiao",
        },
        {
            header: "Índice",
            accessorKey: "indice_regiao",
        },
        {
            header: "Status",
            accessorKey: "status_regiao",
        },
    ];

    function formatarListaRegioes(arr: any) {
        return arr.map((regiao: any) => {
            regiao["indice_regiao"] = FormatFields.formatarNumero(regiao["indice_regiao"]) + "%";
            return regiao;
        });
    }

    return (
        <>
            <Breadcrumb pageName="Consulta de Regiões de Venda" />
            <Container>
                <ReactTable
                    columns={columns}
                    listFunction={listarRegionais}
                    formatFunction={formatarListaRegioes}
                    idCol="id_regiao"
                    isActiveCol="status_regiao"
                    canEdit
                    canDesactive
                    editFunction={editarRegional}
                    Form={FormRegionaisVenda}
                    pageName="Regiões de Venda"
                />
            </Container>
        </>
    );
};

export default ConsultaRegiaoVenda;
