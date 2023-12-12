import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import ReactTable from "@/components/ReactTable/ReactTable";
import { editarKitManual } from "@/requests/CRUD/KitManual/editarKitManual";
import { listarKitsManual } from "@/requests/CRUD/KitManual/listarKitManual";
import { FormatFields } from "@/utils";
import _ from "lodash";

const ConsultaKitManual = () => {
    const dados = [
        "id_kit",
        "tipo_kit",
        "finame_kit",
        "potencia_modulo_kit",
        "qtd_min_modulos_kit",
        "qtd_max_modulos_kit",
        // "range_modulos_kit", //range n tem
        "inversor_1",
        "qtd_inversor1_kit",
        "inversor_2",
        "qtd_inversor2_kit",
        "inversor_3",
        "qtd_inversor3_kit",
        "potencia_inversor_kit",
        // "potencia_trafo_kit", //potencia trafo n tem
        //corrente inversores
        //corrente inversores fc=0,9
        //valor comercial
        //monitoramento
        //dps ca
        // "disjuntor_comercial_kit", //disjuntor comerical n tem desisto de ver o resto.
        "status_kit",
    ];
    const columns = [
        ...dados.map((e) => ({
            header: _.capitalize(e).replaceAll("_kit", "").replaceAll("_", " "),
            accessorKey: e,
        })),
    ];

    

    const formatKitsList = async (arr: any) => {
        return arr.map((kit: any) => {
            kit["tipo_kit"] = kit["tipo_kit"] == 1 ? "Manual" : "Padrão";
            kit["finame_kit"] = kit["finame_kit"] == 1 ? "Sim" : "Não";
            kit["potencia_modulo_kit"] = `${kit["potencia_modulo_kit"]} Wp`;
            kit["potencia_inversor_kit"] = `${FormatFields.formatarNumero(kit["potencia_inversor_kit"])} kW`
            return kit;
        });
    };

    return (
        <>
            <Breadcrumb pageName="Consulta de Kit Manual" />
            <Container>
                <ReactTable
                    columns={columns}
                    listFunction={listarKitsManual}
                    formatFunction={formatKitsList}
                    idCol="id_kit"
                    isActiveCol="status_kit"
                    // canEdit
                    canDesactive
                    editFunction={editarKitManual}
                    // Form={FormIsencaoDeGeracao}
                    pageName="Kit Manual"
                />
            </Container>
        </>
    );
};

export default ConsultaKitManual;
