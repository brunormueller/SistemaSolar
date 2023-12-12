import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import ReactTable from "@/components/ReactTable/ReactTable";
import { listarFornecedores } from "@/requests/CRUD/Fornecedor/listarFornecedores";
import { editarModulos } from "@/requests/CRUD/Modulos/editarModulos";
import { listarModulos } from "@/requests/CRUD/Modulos/listarModulos";
import { FormatFields } from "@/utils";
import _ from "lodash";
import { useState } from "react";
import FormModulo from "../CXESCAD014/FormModulo";

const ConsultaModulos = () => {
    const [fornecedores, setFornecedores] = useState<any[]>([]);

    const dados = [
        "id_modulo",
        "grupo_modulo",
        "cod_interno_modulo",
        "marca_modulo",
        "padrao_modulo",
        "modelo_modulo",
        "precovenda_modulo",
        "minimoPlaca_modulo",
        "origem_modulo",
        "celula_modulo",
        "potencia_modulo",
        "fornecedores",
        "garantia_modulo",
        "ncm_modulo",
        "numero_ex_modulo",
        "codigo_finameAte75_modulo",
        "codigo_finameAte375_modulo",
        "codigo_finameAcima375_modulo",
        "status_modulo",
    ];
    const columns = dados.map((e) => {
        let header = _.capitalize(e).replaceAll("_modulo", "").replaceAll("_", " ");
        header = header == "Precovenda" ? "Preço de Venda" : header;
        header = header == "Minimoplaca" ? "Mínimo de Placas" : header;
        header = header == "Celula" ? "Célula" : header;
        header = header == "Potencia" ? "Potência" : header;
        return { header: header, accessorKey: e };
    });

    const formatModulosList = async (arr: any) => {
        let fornecedoresList: any[] = [];
        if (fornecedores[0] == undefined) {
            fornecedoresList = await listarFornecedores().then((res: any) => {
                setFornecedores(res);
                return res;
            });
        } else {
            fornecedoresList = fornecedores;
        }

        return arr.map((modulo: any) => {
            modulo["padrao_modulo"] = Boolean(+modulo["padrao_modulo"]) ? "Sim" : "Não";
            modulo["potencia_modulo"] = `${FormatFields.formatarNumero(modulo["potencia_modulo"])} Wp`;
            modulo["precovenda_modulo"] = `R$ ${FormatFields.formatarNumero(modulo["precovenda_modulo"])}`;
            modulo["fornecedores"] = fornecedores
                .filter((fornecedor) => modulo["fornecedores"]?.split(",").includes(fornecedor.id_fornecedor))
                .map((fornecedor) => fornecedor["razaosocial_fornecedor"])
                .join(", ");
            return modulo;
        });
    };

    return (
        <>
            <Breadcrumb pageName="Consulta de Modulos" />
            <Container>
                <ReactTable
                    columns={columns}
                    listFunction={listarModulos}
                    formatFunction={formatModulosList}
                    idCol="id_modulo"
                    isActiveCol="status_modulo"
                    canEdit
                    canDesactive
                    editFunction={editarModulos}
                    Form={FormModulo}
                    pageName="Modulos"
                />
            </Container>
        </>
    );
};

export default ConsultaModulos;
