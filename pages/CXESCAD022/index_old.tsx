import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import { FormatFields } from "@/utils";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormTarifaEnergia from "./FormTarifaEnergia";
import { cadastrarTarifaEnergia } from "@/requests/CRUD/TarifaEnergia/cadastrarTarifaEnergia";

const CadastroTarifaEnergia = () => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: FieldValues) => {
        setIsLoading(true);
        if (data["grupo_tarifa"] == "A") {
            data["fiob_tarifa"] = "";
            data["te_tarifa"] = "";
            data["tusde_tarifa"] = "";
            data["preco_fixo_tarifa"] = "";
            data["preco_ponta_tarifa"] = FormatFields.desformatarNumeros(data["preco_ponta_tarifa"]);
            data["preco_fora_ponta_tarifa"] = FormatFields.desformatarNumeros(data["preco_fora_ponta_tarifa"]);
            data["preco_demanda_tarifa"] = FormatFields.desformatarNumeros(data["preco_demanda_tarifa"]);
            data["percentFioB_tarifa"] = "";
        } else {
            data["fiob_tarifa"] = FormatFields.desformatarNumeros(data["fiob_tarifa"]);
            data["te_tarifa"] = FormatFields.desformatarNumeros(data["te_tarifa"]);
            data["tusde_tarifa"] = FormatFields.desformatarNumeros(data["tusde_tarifa"]);
            data["preco_fixo_tarifa"] = FormatFields.desformatarNumeros(data["preco_fixo_tarifa"]);
            data["preco_ponta_tarifa"] = "";
            data["preco_fora_ponta_tarifa"] = "";
            data["preco_demanda_tarifa"] = "";
            data["percentFioB_tarifa"] = ((+data["fiob_tarifa"] / +data["preco_fixo_tarifa"]) * 100 || 0).toFixed(7);
        }

        cadastrarTarifaEnergia(data).finally(() => setIsLoading(false));
    };

    return (
        <>
            <Breadcrumb pageName="Cadastro de Tarifa de Energia" />
            <Container>
                <FormTarifaEnergia onSubmitFunction={onSubmit}>
                    <Button loading={isLoading}>Salvar</Button>
                </FormTarifaEnergia>
            </Container>
        </>
    );
};

export default CadastroTarifaEnergia;
