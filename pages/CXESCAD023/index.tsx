import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import ReactTable from "@/components/ReactTable/ReactTable";
import { cadastrarEstimativaConsumo } from "@/requests/CRUD/EstimativaConsumo/cadastrarEstimativaConsumo";
import { editarEstimativaConsumoDireto } from "@/requests/CRUD/EstimativaConsumo/editarEstimativaConsumo";
import { listarEstimativaConsumoDireto } from "@/requests/CRUD/EstimativaConsumo/listarEstimativaConsumo";
import { FormatFields } from "@/utils";
import { FieldValues } from "react-hook-form";
import FormEstimativaConsumo from "../CXESCAD023/FormEstimativaConsumo";

const ConsultaEstimativaConsumo = () => {
    const columns = [
        {
            header: "ID",
            accessorKey: "id_estimativa",
        },
        {
            header: "Status Estimativa",
            accessorKey: "status_estimativa",
        },
        {
            header: "Tipo Fatura",
            accessorKey: "tipo_fatura_estimativa",
        },
        {
            header: "Valor",
            accessorKey: "valor_estimativa",
        },
    ];

    const formatEstimativa = async (arr: any) => {
        return arr.map((estimativa: any) => {
            estimativa["valor_estimativa"] =
                "R$" +
                FormatFields.formatarNumero(estimativa["valor_estimativa"]);
            return estimativa;
        });
    };

    const onSubmitFunction = async (data: FieldValues) => {
        data["valor_estimativa"] = FormatFields.desformatarNumeros(
            data["valor_estimativa"]
        );
        return cadastrarEstimativaConsumo(data);
    };

    const sendEditarEstimativa = async (data: any) => {
        data["valor_estimativa"] = FormatFields.desformatarNumeros(
            data["valor_estimativa"]
        );
        return editarEstimativaConsumoDireto(data);
    };

    return (
        <>
            <Breadcrumb pageName="Consulta de Estimativas de Consumo Direto" />
            <Container>
                <ReactTable
                    columns={columns}
                    listFunction={listarEstimativaConsumoDireto}
                    idCol="id_estimativa"
                    formatFunction={formatEstimativa}
                    isActiveCol="status_estimativa"
                    canEdit
                    canDesactive
                    createFunction={onSubmitFunction}
                    editFunction={sendEditarEstimativa}
                    Form={FormEstimativaConsumo}
                    pageName="Estimativas de Consumo Direto"
                />
            </Container>
        </>
    );
};

export default ConsultaEstimativaConsumo;
