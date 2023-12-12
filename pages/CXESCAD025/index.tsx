import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import ReactTable from "@/components/ReactTable/ReactTable";
import { editarIrradiacao } from "@/requests/CRUD/IrradiacaoGlobal/editarIrradiacao";
import { listarIrradiacao } from "@/requests/CRUD/IrradiacaoGlobal/listarIrradiacao";
import { FormatFields } from "@/utils";
import _ from "lodash";
import FormIrradicaoGlobal from "../CXESCAD025/FormIrradiacaoGlobal";

const ConsultaIrradiacaoGlobal = () => {
    const meses = [
        "janeiro",
        "fevereiro",
        "marco",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
    ];

    const columns = [
        {
            header: "ID",
            accessorKey: "id_irradiacao",
        },
        {
            header: "Cidade",
            accessorKey: "cidade_irradiacao",
        },
        {
            header: "UF",
            accessorKey: "uf_irradiacao",
        },
        {
            header: "Região",
            accessorKey: "regiao_irradiacao",
        },
        ...meses.map((taxa) => ({
            header: _.capitalize(`${taxa}`),
            accessorKey: `${taxa}_irradiacao`,
        })),
        {
            header: "Status Irradiacao",
            accessorKey: "status_irradiacao",
        },
    ];
    const formatMeses = async (arr: any) => {
        return arr.map((mes: any) => {
            meses.map((taxa) => {
                mes[`${taxa}_irradiacao`] =
                    "° " +
                    FormatFields.formatarNumero(mes[`${taxa}_irradiacao`]);
            });
            return mes;
        });
    };

    // const editWithFormat = async (arr: any) => {
    //     meses.map((taxa) => {
    //         arr[`${taxa}_irradiacao`] =
    //             "° " +
    //             FormatFields.desformatarNumeros(arr[`${taxa}_irradiacao`]);
    //     });
    //     return editarIrradiacao(arr);
    // };

    const editWithFormat = async (data: any) => {
        meses.map((taxa) => {
            data[`${taxa}_irradiacao`] = FormatFields.desformatarNumeros(
                data[`${taxa}_irradiacao`]
            );
        });
        return editarIrradiacao(data);
    };

    return (
        <>
            <Breadcrumb pageName="Consulta de Irradiacao Global" />
            <Container>
                <ReactTable
                    columns={columns}
                    listFunction={listarIrradiacao}
                    formatFunction={formatMeses}
                    idCol="id_irradiacao"
                    isActiveCol="status_irradiacao"
                    canEdit
                    canDesactive
                    editFunction={editWithFormat}
                    Form={FormIrradicaoGlobal}
                    pageName="Irradiacao Global"
                />
            </Container>
        </>
    );
};

export default ConsultaIrradiacaoGlobal;
