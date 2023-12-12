"use client";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import { GetForm } from "@/utils";
import { useState } from "react";
import * as yup from "yup";

const FormRegionaisVenda = ({ onSubmitFunction, defaultValues, disabledFields, children, ...rest }: any) => {
    const [yupSchema, setYupSchema] = useState<yup.ObjectSchema<{}, yup.AnyObject, {}, "">>(yup.object().shape({}));

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

    return (
        <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
            <InputGroup>
                <Input
                    label="Nome da Região"
                    width="xl:w-1/2"
                    name="nome_regiao"
                    formulario={form}
                    mascara="letrasNumeros"
                    error={"Preencha o Nome"}
                    required
                    defaultValue={
                        defaultValues && defaultValues["nome_regiao"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "nome_regiao"
                    )}
                />
                <Input
                    label="Índice"
                    width="xl:w-1/2"
                    name="indice_regiao"
                    formulario={form}
                    error={"Preencha o Inidice"}
                    mascara="numero"
                    required
                    defaultValue={
                        defaultValues && defaultValues["indice_regiao"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "indice_regiao"
                    )}
                />
            </InputGroup>
            {children}
        </form>
    );
};

export default FormRegionaisVenda;
