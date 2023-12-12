import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import { GetForm } from "@/utils";
import { useState } from "react";
import * as yup from "yup";

const FormEstimativaConsumo = ({
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
                <InputGroup align="center">
                    <Input
                        formulario={form}
                        name="tipo_fatura_estimativa"
                        width="xl:w-1/3"
                        label="Tipo de Fatura"
                        error="Preencha a Fatura"
                        required
                        defaultValue={
                            defaultValues &&
                            defaultValues["tipo_fatura_estimativa"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "tipo_fatura_estimativa"
                        )}
                    />
                    <Input
                        formulario={form}
                        name="valor_estimativa"
                        width="xl:w-1/3"
                        label="Estimativa %"
                        mascara="numero"
                        error="Preencha a Estimativa"
                        // prefix="%"
                        required
                        defaultValue={
                            defaultValues && defaultValues["valor_estimativa"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "valor_estimativa"
                        )}
                    />
                </InputGroup>
                {children}
            </form>
        </>
    );
};

export default FormEstimativaConsumo;
