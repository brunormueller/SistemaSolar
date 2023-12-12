import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import ReactTable from "@/components/ReactTable/ReactTable";
import { editarTarifaEnergia } from "@/requests/CRUD/TarifaEnergia/editarTarifaEnergia";
import { listarTarifasEnergia } from "@/requests/CRUD/TarifaEnergia/listarTarifasEnergia";
import { FormatFields } from "@/utils";
import FormTarifaEnergia from "../CXESCAD022/FormTarifaEnergia";

const ConsultaTarifaEnergia = () => {
    // const [classificacoes, setClassificacoes] = useState<any[]>([]);

    const columns = [
        {
            header: "Código",
            accessorKey: "id_tarifa",
        },
        {
            header: "Concessionária de Energia",
            accessorKey: "concessionaria_tarifa",
        },
        {
            header: "UF",
            accessorKey: "uf_tarifa",
        },
        {
            header: "Grupo",
            accessorKey: "grupo_tarifa",
        },
        {
            header: "Subgrupo",
            accessorKey: "subgrupo_tarifa",
        },
        {
            header: "Classificação",
            accessorKey: "classificacao_tarifa",
        },
        {
            header: "Fio B R$/kWh",
            accessorKey: "fiob_tarifa",
        },
        {
            header: "Tarifa TE R$/kWh",
            accessorKey: "te_tarifa",
        },
        {
            header: "TUSD R$/kWh",
            accessorKey: "tusde_tarifa",
        },
        {
            header: "Preço R$/kWh",
            accessorKey: "preco_fixo_tarifa",
        },
        {
            header: "Preço R$/kWh (Ponta)",
            accessorKey: "preco_ponta_tarifa",
        },
        {
            header: "Preço R$/kWh (Fora Ponta)",
            accessorKey: "preco_fora_ponta_tarifa",
        },
        {
            header: "Preço Demanda Contratada (R$/kWh)",
            accessorKey: "preco_demanda_tarifa",
        },
        {
            header: "Status Estimativa",
            accessorKey: "status_tarifa",
        },
    ];

    async function formatarListaTarifasEnergia(arr: any) {
        // let classificacoesList: any[] = [];

        // if (classificacoes[0] == undefined) {
        //     classificacoesList = await listarTiposFatura().then((res) => {
        //         setClassificacoes(res);
        //         return res;
        //     });
        // } else {
        //     classificacoesList= classificacoes;
        // }

        return arr.map((e: any) => {
            // e["classificacao_tarifa"] = classificacoesList.find((e: any) => e.id_tipo_fatura == e["classificacao_tarifa"]);
            for (let chave in e) {
                if (+e[chave] == +e[chave] && chave != "id_tarifa") e[chave] = FormatFields.formatarNumeroPreciso(e[chave]);
            }
            return e;
        });
    }

    const sendEditTarifasEnergia = async (data: any) => {
        if (data["grupo_tarifa"] == "A") {
            data["fiob_tarifa"] = "";
            data["te_tarifa"] = "";
            data["tusde_tarifa"] = "";
            data["preco_fixo_tarifa"] = "";
            data["preco_ponta_tarifa"] = FormatFields.desformatarNumeros(data["preco_ponta_tarifa"]);
            data["preco_fora_ponta_tarifa"] = FormatFields.desformatarNumeros(data["preco_fora_ponta_tarifa"]);
            data["preco_demanda_tarifa"] = FormatFields.desformatarNumeros(data["preco_demanda_tarifa"]);
            data["percentFioB_tarifa"] = "";
        } else if (data["grupo_tarifa"] == "B") {
            data["fiob_tarifa"] = FormatFields.desformatarNumeros(data["fiob_tarifa"]);
            data["te_tarifa"] = FormatFields.desformatarNumeros(data["te_tarifa"]);
            data["tusde_tarifa"] = FormatFields.desformatarNumeros(data["tusde_tarifa"]);
            data["preco_fixo_tarifa"] = FormatFields.desformatarNumeros(data["preco_fixo_tarifa"]);
            data["preco_ponta_tarifa"] = "";
            data["preco_fora_ponta_tarifa"] = "";
            data["preco_demanda_tarifa"] = "";
            data["percentFioB_tarifa"] = ((+data["fiob_tarifa"] / +data["preco_fixo_tarifa"]) * 100 || 0).toFixed(7);
        }

        return editarTarifaEnergia(data);
    };

    return (
        <>
            <Breadcrumb pageName="Consulta de Tarifa Energia" />
            <Container>
                <ReactTable
                    columns={columns}
                    listFunction={listarTarifasEnergia}
                    formatFunction={formatarListaTarifasEnergia}
                    idCol="id_tarifa"
                    isActiveCol="status_tarifa"
                    canEdit
                    canDesactive
                    editFunction={sendEditTarifasEnergia}
                    Form={FormTarifaEnergia}
                    pageName="Tarifa Energia"
                />
            </Container>
        </>
    );
};

export default ConsultaTarifaEnergia;
