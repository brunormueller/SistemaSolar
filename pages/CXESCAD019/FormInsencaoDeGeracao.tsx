import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import { GetForm } from "@/utils";
import { useState } from "react";
import * as yup from "yup";

const FormIsencaoDeGeracao = ({
    onSubmitFunction,
    defaultValues,
    disabledFields,
    children,
    ...rest
}: any) => {
    const [yupSchema, setYupSchema] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
                <InputGroup>
                    <Input
                        name="icms1"
                        label="ICMS 1 (%)"
                        formulario={form}
                        mascara="numero"
                        error="Preencha a irradiação base"
                        required
                        defaultValue={defaultValues && defaultValues["icms1"]}
                        disabled={disabledFields?.some(
                            (field: string) => field == "icms1"
                        )}
                    />
                    <Input
                        name="icms2"
                        label="ICMS 2 (%)"
                        formulario={form}
                        mascara="numero"
                        error="Preencha a irradiação base"
                        required
                        defaultValue={defaultValues && defaultValues["icms2"]}
                        disabled={disabledFields?.some(
                            (field: string) => field == "icms2"
                        )}
                    />
                    <Input
                        name="pis"
                        label="PIS (%)"
                        formulario={form}
                        mascara="numero"
                        error="Preencha a irradiação base"
                        required
                        defaultValue={defaultValues && defaultValues["pis"]}
                        disabled={disabledFields?.some(
                            (field: string) => field == "pis"
                        )}
                    />
                    <Input
                        name="cofins"
                        label="COFINS (%)"
                        formulario={form}
                        mascara="numero"
                        error="Preencha a irradiação base"
                        required
                        defaultValue={defaultValues && defaultValues["cofins"]}
                        disabled={disabledFields?.some(
                            (field: string) => field == "cofins"
                        )}
                    />
                </InputGroup>
                {children}
            </form>
        </>
    );
};

export default FormIsencaoDeGeracao;
