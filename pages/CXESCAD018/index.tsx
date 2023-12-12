import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import ReactTable from "@/components/ReactTable/ReactTable";
import { editarTarifaBandeira } from "@/requests/CRUD/TarifaBandeira/editarTarifaBandeira";
import { listarTarifasBandeiras } from "@/requests/CRUD/TarifaBandeira/listarTarifasBandeiras";
import { FormatFields } from "@/utils";
import FormTarifaBandeira from "../CXESCAD018/FormTarifaBandeira";

const ConsultaTarifaBandeira = () => {
    const columns = [
        {
            header: "Código",
            accessorKey: "id_bandeira",
        },
        {
            header: "Nome",
            accessorKey: "nome_bandeira",
        },
        {
            header: "Valor da Tarifa",
            accessorKey: "valor_bandeira",
        },
        {
            header: "Status",
            accessorKey: "status_bandeira",
        },
    ];

    const formatTarifasBandeiras = (arr: any) => {
        return arr.map((tarifa: any) => {
            tarifa["valor_bandeira"] = FormatFields.formatarNumeroPreciso(tarifa["valor_bandeira"]);
            return tarifa;
        });
    };

    const sendEditTarifa = async (data: any) => {
        if (data["valor_bandeira"]) {
            data["valor_bandeira"] = FormatFields.desformatarNumeros(data["valor_bandeira"]);
        }
        return editarTarifaBandeira(data);
    };

    return (
        <>
            <Breadcrumb pageName="Consulta de Tarifa de Bandeira" />
            <Container>
                <ReactTable
                    columns={columns}
                    listFunction={listarTarifasBandeiras}
                    formatFunction={formatTarifasBandeiras}
                    idCol="id_bandeira"
                    isActiveCol="status_bandeira"
                    canEdit
                    canDesactive
                    editFunction={sendEditTarifa}
                    Form={FormTarifaBandeira}
                    pageName="Tarifa de Bandeira"
                />
            </Container>
        </>
    );
};

export default ConsultaTarifaBandeira;
