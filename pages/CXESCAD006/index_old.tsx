"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import { cadastrarInstituicaoFinanceira } from "@/requests/CRUD/InstituicaoFinanceira/cadastrarInstituicao";
import { GetForm } from "@/utils";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import * as yup from "yup";
import FormInstituicao from "./FormInstituicao";

const CadastroInstituicaoFinanceira = () => {
    const [isloading, setIsLoading] = useState(false);
    const [yupSchema, setYupSchema] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

    const onSubmitFunction = async (data: FieldValues) => {
        setIsLoading(true);
        cadastrarInstituicaoFinanceira(data).finally(() => setIsLoading(false));
    };
    return (
        <>
            <Breadcrumb pageName="Instituição Financeira" />
            <Container>
                <FormInstituicao onSubmitFunction={onSubmitFunction}>
                    <Button loading={isloading}>Salvar</Button>
                </FormInstituicao>
            </Container>
        </>
    );
};

export default CadastroInstituicaoFinanceira;
