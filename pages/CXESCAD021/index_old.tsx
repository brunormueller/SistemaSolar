import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import { cadastrarAliquota } from "@/requests/CRUD/Aliquota/cadastrarAliquota";
import { FormatFields } from "@/utils";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormAliquota from "./FormAliquota";

const CadastroAliquota = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmitFunction = (data: FieldValues) => {
        setIsLoading(true);
        data["icmsBase_aliquota"] = FormatFields.desformatarNumeros(
            data["icmsBase_aliquota"]
        );
        data["icmsSubsidiado_aliquota"] = FormatFields.desformatarNumeros(
            data["icmsSubsidiado_aliquota"]
        );
        data["pisCofins_aliquota"] = FormatFields.desformatarNumeros(
            data["pisCofins_aliquota"]
        );
        cadastrarAliquota(data).finally(() => setIsLoading(false));
    };

    return (
        <>
            <Breadcrumb pageName="Cadastro de Alíquota" />
            <Container>
                <FormAliquota onSubmitFunction={onSubmitFunction}>
                    <Button loading={isLoading}>Salvar</Button>
                </FormAliquota>
            </Container>
        </>
    );
};
export default CadastroAliquota;
