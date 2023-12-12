"use client";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarTipoInstalacao } from "@/requests/CRUD/EstruturaFixacao/cadastrarEstruturaFixacao";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormEstruturaFixacao = ({
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

    const [dadosTipos, setDadosTipo] = useState([]);

    useEffect(() => {
        const buscarcarTipoInstalacao = async () => {
            try {
                const response = await listarTipoInstalacao();
                setDadosTipo(response.body.instalacoes);
            } catch (error) {
                console.log(error);
            }
        };
        buscarcarTipoInstalacao();
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
                <InputGroup>
                    <Input
                        name="nome_estrutura"
                        label="Nome"
                        formulario={form}
                        error={"Preencha o Nome da Região"}
                        required
                        defaultValue={
                            defaultValues && defaultValues["nome_estrutura"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "nome_estrutura"
                        )}
                    />
                    <InputSelectComponent
                        label="Tipo Instalação"
                        name="tipo_instalacao"
                        formulario={form}
                        options={dadosTipos}
                        error="Selecione um tipo de instalacao"
                        required
                        defaultValue={
                            defaultValues && defaultValues["tipo_instalacao"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "tipo_instalacao"
                        )}
                    />
                </InputGroup>
                {children}
            </form>
        </>
    );
};

export default FormEstruturaFixacao;
