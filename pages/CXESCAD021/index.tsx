import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import ReactTable from "@/components/ReactTable/ReactTable";
import { cadastrarAliquota } from "@/requests/CRUD/Aliquota/cadastrarAliquota";
import { editarAliquota } from "@/requests/CRUD/Aliquota/editarAliquota";
import { listarAliquotas } from "@/requests/CRUD/Aliquota/listarAliquotas";
import { FormatFields } from "@/utils";
import { FieldValues } from "react-hook-form";
import FormAliquota from "../CXESCAD021/FormAliquota";

const ConsultaAliquota = () => {
    const columns = [
        {
            header: "ID",
            accessorKey: "id_aliquota",
        },
        {
            header: "Status",
            accessorKey: "status_aliquota",
        },
        {
            header: "Concessionaria",
            accessorKey: "concessionaria_aliquota",
        },
        {
            header: "Mes Ano",
            accessorKey: "mesAno_aliquota",
        },
        {
            header: "ICMS Base",
            accessorKey: "icmsBase_aliquota",
        },
        {
            header: "ICMS Subsidiado",
            accessorKey: "icmsSubsidiado_aliquota",
        },
        {
            header: "Pis Cofins",
            accessorKey: "pisCofins_aliquota",
        },
    ];

    const formatAliquotas = async (arr: any) => {
        return arr.map((material: any) => {
            material["icmsBase_aliquota"] =
                FormatFields.formatarNumero(material["icmsBase_aliquota"]) +
                " %";
            material["icmsSubsidiado_aliquota"] =
                "% " +
                FormatFields.formatarNumero(
                    material["icmsSubsidiado_aliquota"]
                );
            material["pisCofins_aliquota"] =
                "% " +
                FormatFields.formatarNumero(material["pisCofins_aliquota"]);
            return material;
        });
    };

    const sendEditarAliquota = async (data: any) => {
        console.log(data);
        data["icmsBase_aliquota"] = FormatFields.desformatarNumeros(
            data["icmsBase_aliquota"]
        );
        data["icmsSubsidiado_aliquota"] = FormatFields.desformatarNumeros(
            data["icmsSubsidiado_aliquota"]
        );
        data["pisCofins_aliquota"] = FormatFields.desformatarNumeros(
            data["pisCofins_aliquota"]
        );
        return editarAliquota(data);
    };

    const sendCadastrarAliquota = async (data: FieldValues) => {
        data["icmsBase_aliquota"] = FormatFields.desformatarNumeros(
            data["icmsBase_aliquota"]
        );
        data["icmsSubsidiado_aliquota"] = FormatFields.desformatarNumeros(
            data["icmsSubsidiado_aliquota"]
        );
        data["pisCofins_aliquota"] = FormatFields.desformatarNumeros(
            data["pisCofins_aliquota"]
        );
        return cadastrarAliquota(data);
    };

    return (
        <>
            <Breadcrumb pageName="Consulta de Aliquota" />
            <Container>
                <ReactTable
                    columns={columns}
                    listFunction={listarAliquotas}
                    formatFunction={formatAliquotas}
                    idCol="id_aliquota"
                    isActiveCol="status_aliquota"
                    canEdit
                    canDesactive
                    createFunction={sendCadastrarAliquota}
                    editFunction={sendEditarAliquota}
                    Form={FormAliquota}
                    pageName="Aliquota"
                />
            </Container>
        </>
    );
};

export default ConsultaAliquota;
