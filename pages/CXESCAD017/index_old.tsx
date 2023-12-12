import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import { cadastrarKit } from "@/requests/CRUD/KitManual/cadastroKitManual";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormKitManual from "./FormKitManual";

const CadastroKitManual = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmitFunction = async (data: FieldValues) => {
        setIsLoading(true);
        console.log(data);
        cadastrarKit(data).finally(() => setIsLoading(false));
    };

    return (
        <>
            <Breadcrumb pageName="Cadastro de Kit Manual" />
            <Container>
                <FormKitManual onSubmitFunction={onSubmitFunction}>
                    <Button loading={isLoading}>Salvar</Button>
                </FormKitManual>
            </Container>
        </>
    );
};

export default CadastroKitManual;
