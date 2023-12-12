import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import ReactTable from "@/components/ReactTable/ReactTable";

import { editarInversores } from "@/requests/CRUD/Inversor/editarInversor";
import { listarInversores } from "@/requests/CRUD/Inversor/listarInversores";
import { FormatFields } from "@/utils";
import FormInversor from "../CXESCAD013/FormInversor";

const ConsultarInversores = () => {
    const columns = [
        {
            header: "ID",
            accessorKey: "id_inversor",
        },
        {
            header: "Marca",
            accessorKey: "marca_inversor",
        },
        {
            header: "Modelo",
            accessorKey: "modelo_inversor",
        },
        {
            header: "Cód. Interno",
            accessorKey: "cod_interno_inversor",
        },
        {
            header: "Garantia",
            accessorKey: "garantia_inversor",
        },
        {
            header: "Valor Garantia Estendida",
            accessorKey: "vlr_garantia_est_inversor",
        },
        {
            header: "NCM",
            accessorKey: "ncm_inversor",
        },
        {
            header: "Número EX",
            accessorKey: "numero_ex_inversor",
        },
        {
            header: "Resolução",
            accessorKey: "resolucao_inversor",
        },
        {
            header: "Tipo de Ligação",
            accessorKey: "ligacao_inversor",
        },
        {
            header: "Origem",
            accessorKey: "origem_inversor",
        },
        {
            header: "Preço de Venda",
            accessorKey: "precovenda_inversor",
        },
        {
            header: "Potência em kW",
            accessorKey: "potencia_inversor",
        },
        {
            header: "Potência em kVA",
            accessorKey: "potenciaKVA_inversor",
        },
        {
            header: "Tensão",
            accessorKey: "tensao_inversor",
        },
        {
            header: "Corrente",
            accessorKey: "corrente_inversor",
        },
        {
            header: "Observação Interna",
            accessorKey: "obs_interna_inversor",
        },
        {
            header: "Código FINAME(até 75 kWp)",
            accessorKey: "codigo_finameAte75_inversor",
        },
        {
            header: "Código FINAME(até 375 kWp)",
            accessorKey: "codigo_finameAte375_inversor",
        },
        {
            header: "Código FINAME(acima 375 kWp)",
            accessorKey: "codigo_finameAcima375_inversor",
        },
        {
            header: "Status Inversor",
            accessorKey: "status_inversor",
        },
    ];

    const formatInversor = async (arr: any) => {
        return arr.map((material: any) => {
            material["vlr_garantia_est_inversor"] =
                "R$ " +
                FormatFields.formatarNumero(
                    material["vlr_garantia_est_inversor"]
                );
            material["precovenda_inversor"] =
                "R$ " +
                FormatFields.formatarNumero(material["precovenda_inversor"]);
            material["potencia_inversor"] =
                "kW " +
                FormatFields.formatarNumero(material["potencia_inversor"]);
            material["potenciaKVA_inversor"] =
                "kVA" +
                FormatFields.formatarNumero(material["potenciaKVA_inversor"]);
            material["tensao_inversor"] =
                "V " + FormatFields.formatarNumero(material["tensao_inversor"]);
            material["corrente_inversor"] =
                "A " +
                FormatFields.formatarNumero(material["corrente_inversor"]);
            material["garantia_inversor"] =
                "Anos " + material["garantia_inversor"];
            return material;
        });
    };

    const sendEditarInversor = async (data: any) => {
        console.log(data);
        data["vlr_garantia_est_inversor"] =
            "R$ " +
            FormatFields.desformatarNumeros(data["vlr_garantia_est_inversor"]);
        data["precovenda_inversor"] =
            "R$ " +
            FormatFields.desformatarNumeros(data["precovenda_inversor"]);
        data["potencia_inversor"] =
            "kW " + FormatFields.desformatarNumeros(data["potencia_inversor"]);
        data["potenciaKVA_inversor"] =
            "kVA" +
            FormatFields.desformatarNumeros(data["potenciaKVA_inversor"]);
        data["tensao_inversor"] =
            "V " + FormatFields.desformatarNumeros(data["tensao_inversor"]);
        data["corrente_inversor"] =
            "A " + FormatFields.desformatarNumeros(data["corrente_inversor"]);
        return editarInversores(data);
    };

    return (
        <>
            <Breadcrumb pageName="Consulta Inversores" />
            <Container>
                <ReactTable
                    columns={columns}
                    listFunction={listarInversores}
                    formatFunction={formatInversor}
                    idCol="id_inversor"
                    isActiveCol="status_inversor"
                    canEdit
                    canDesactive
                    editFunction={sendEditarInversor}
                    Form={FormInversor}
                    pageName="Inversores"
                />
            </Container>
        </>
    );
};

export default ConsultarInversores;
