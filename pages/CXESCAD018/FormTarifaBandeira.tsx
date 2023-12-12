import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import { GetForm } from "@/utils";
import { useState } from "react";
import * as yup from "yup";

const FormTarifaBandeira = ({ onSubmitFunction, defaultValues, disabledFields, children, ...rest }: any) => {
    const [yupSchema, setYupSchema] = useState<yup.ObjectSchema<{}, yup.AnyObject, {}, "">>(yup.object().shape({}));

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

    return (
        <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
            <InputGroup align="center">
                <Input
                    label="Nome"
                    width="xl:w-1/2"
                    name="nome_bandeira"
                    formulario={form}
                    mascara="letrasNumeros"
                    error={"Preencha o Nome"}
                    required
                    defaultValue={defaultValues && defaultValues["nome_bandeira"]}
                    disabled={disabledFields?.some((field: string) => field == "nome_bandeira")}
                />
                <Input
                    label="Valor"
                    width="xl:w-1/2"
                    name="valor_bandeira"
                    formulario={form}
                    error={"Preencha o Valor"}
                    prefix="R$"
                    mascara="numeroPreciso"
                    required
                    defaultValue={defaultValues && defaultValues["valor_bandeira"]}
                    disabled={disabledFields?.some((field: string) => field == "valor_bandeira")}
                />
            </InputGroup>
            {children}
        </form>
    );
};

export default FormTarifaBandeira;
