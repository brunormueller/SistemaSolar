import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import { cadastrarInversor } from "@/requests/CRUD/Inversor/cadastrarInversor";
import { FormatFields } from "@/utils";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormInversor from "./FormInversor";

const CadastroInversor = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmitFunction = (data: FieldValues) => {
        const keys = [
            "corrente_inversor",
            "potenciaKVA_inversor",
            "potencia_inversor",
            "precovenda_inversor",
            "vlr_garantia_est_inversor",
        ];

        keys.forEach((key) => {
            if (data[key]) {
                data[key] = FormatFields.desformatarNumeros(data[key]);
            }
        });

        setIsLoading(true);
        cadastrarInversor(data).finally(() => setIsLoading(false));
    };

    return (
        <>
            <Breadcrumb pageName="Cadastro de Inversor" />
            <Container>
                <FormInversor onSubmitFunction={onSubmitFunction}>
                    <Button loading={isLoading}>Salvar</Button>
                </FormInversor>
            </Container>
        </>
    );
};

export default CadastroInversor;
