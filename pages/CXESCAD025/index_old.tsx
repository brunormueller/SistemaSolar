import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import { cadastrarIrradiacaoGlobal } from "@/requests/CRUD/IrradiacaoGlobal/cadastrarIrradiacaoGlobal";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormIrradicaoGlobal from "./FormIrradiacaoGlobal";

const CadastroIrradiacaoGlobal = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
    
    const onSubmitFunction = (data: FieldValues) => {
        setIsLoading(true);
        meses.map((mes) => {
            data[`${mes}_irradiacao`] = +data[`${mes}_irradiacao`]
                .replaceAll(".", "")
                .replaceAll(",", ".");
        });
        data["media_irradiacao"] = +data["media_irradiacao"]
            .replaceAll(".", "")
            .replaceAll(",", ".");
        cadastrarIrradiacaoGlobal(data).finally(() => setIsLoading(false));
    };

    return (
        <>
            <Breadcrumb pageName="Cadastro de Irradiação Global" />
            <Container>
                <FormIrradicaoGlobal onSubmitFunction={onSubmitFunction}>
                    <Button loading={isLoading}>Salvar</Button>
                </FormIrradicaoGlobal>
            </Container>
        </>
    );
};

export default CadastroIrradiacaoGlobal;
