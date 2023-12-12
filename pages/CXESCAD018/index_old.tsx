import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import { cadastrarTarifaBandeira } from "@/requests/CRUD/TarifaBandeira/cadastrarTarifa";
import { FormatFields } from "@/utils";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormTarifaBandeira from "./FormTarifaBandeira";

const CadastrarTarifaBandeira = () => {
    const [isloading, setIsLoading] = useState(false);

    const onSubmit = (data: FieldValues) => {
        setIsLoading(true);
        data["valor_bandeira"] = FormatFields.desformatarNumeros(data["valor_bandeira"]);
        cadastrarTarifaBandeira(data).finally(() => setIsLoading(false));
    };

    return (
        <>
            <Breadcrumb pageName="Cadastro de Tarifa de Bandeira" />
            <Container>
                <FormTarifaBandeira onSubmitFunction={onSubmit}>
                    <Button loading={isloading}>Salvar</Button>
                </FormTarifaBandeira>
            </Container>
        </>
    );
};

export default CadastrarTarifaBandeira;
