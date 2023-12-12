import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import { cadastrarIsencaoGeracao } from "@/requests/CRUD/IsencaoGeracao/cadastrarIsencaoGeracao";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormIsencaoDeGeracao from "./FormInsencaoDeGeracao";

const CadastroIsencaoDeGeracao = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmitFunction = async (data: FieldValues) => {
        setIsLoading(true);

        for (const key in data) {
            if (+data[key] !== +data[key]) {
                data[key] = data[key].replaceAll(".", "").replaceAll(",", ".");
            }
        }
        cadastrarIsencaoGeracao(data).finally(() => setIsLoading(false));
    };

    return (
        <>
            <Breadcrumb pageName="Cadastro de Isenção de Geração Distribuída" />
            <Container>
                <FormIsencaoDeGeracao onSubmitFunction={onSubmitFunction}>
                    <Button loading={isLoading}>Salvar</Button>
                </FormIsencaoDeGeracao>
            </Container>
        </>
    );
};

export default CadastroIsencaoDeGeracao;
