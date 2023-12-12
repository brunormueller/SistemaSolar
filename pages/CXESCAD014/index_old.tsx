import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import { cadastrarModulo } from "@/requests/CRUD/Modulos/cadastroModulo";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormModulo from "./FormModulo";
const CadastroModulo = () => {
    const [isloading, setIsLoading] = useState(false);

    const onSubmitFunction = async (data: FieldValues) => {
        // Sua função que envia para a api
        console.log(data);
        setIsLoading(true);
        cadastrarModulo(data).finally(() => setIsLoading(false));
    };

    return (
        <>
            <Breadcrumb pageName="Cadastro de Módulos" />
            <Container>
                <FormModulo onSubmitFunction={onSubmitFunction}>
                    <Button loading={isloading}>Salvar</Button>
                </FormModulo>
            </Container>
        </>
    );
};

export default CadastroModulo;
