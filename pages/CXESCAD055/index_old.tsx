import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarTabelaCustoInstalacao } from "@/requests/CRUD/CustoInstalação/custoInstalacao";
import { cadastrarRegiaoVenda } from "@/requests/CRUD/RegiaoVenda/cadastrarRegiaoVenda";
import { IValueLabel } from "@/types/formInterfaces";
import { GetForm, valueLabel } from "@/utils";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import * as yup from "yup";
import FormRegioesVenda from "./FormRegioesVenda";

const CadastroRegioesVenda = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmitFunction = (data: FieldValues) => {
        setIsLoading(true);
        cadastrarRegiaoVenda(data).finally(() => setIsLoading(false));
    };

    return (
        <>
            <Breadcrumb pageName="Regiões de Venda" />
            <Container>
                <FormRegioesVenda onSubmitFunction={onSubmitFunction}>
                    <Button loading={isLoading}>Salvar</Button>
                </FormRegioesVenda>
            </Container>
        </>
    );
};

export default CadastroRegioesVenda;
