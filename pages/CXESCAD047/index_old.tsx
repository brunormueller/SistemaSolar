"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import { cadastrarRegional } from "@/requests/CRUD/Regional/cadastrarRegional";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormRegionaisVenda from "./FormRegionaisVenda";

const CadastrarRegionaisVenda = () => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: FieldValues) => {
        setIsLoading(true);
        cadastrarRegional(data).finally(() => setIsLoading(false));
    };

    return (
        <>
            <Breadcrumb pageName="Cadastro de Regionais de Venda" />
            <Container>
                <FormRegionaisVenda onSubmitFunction={onSubmit}>
                    <Button loading={isLoading}>Salvar</Button>
                </FormRegionaisVenda>
            </Container>
        </>
    );
};

export default CadastrarRegionaisVenda;
