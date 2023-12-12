"use client";

import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import TabelaMenu from "@/pages/CXESCFG001/Perfil/TabelaMenu";
import { GetForm } from "@/utils";
import { useState } from "react";
import * as yup from "yup";

const FormEditPerfil = ({
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

    const perfis = [
        { value: "engenharia_perfil", label: "Engenharia" },
        { value: "vendedor_perfil", label: "Vendedor" },
        { value: "cria_funil_perfil", label: "Cria Funil" },
        {
            value: "visualiza_todos_funis_perfil",
            label: "Visualiza Todos Funis",
        },
        {
            value: "visualiza_todos_contatos_perfil",
            label: "Visualiza Todos Contatos",
        },
        {
            value: "visualiza_todas_agendas_perfil",
            label: "Visualiza Todas Agendas",
        },
    ];

    const opcao = [
        { value: "0", label: "Não" },
        { value: "1", label: "Sim" },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
            <InputGroup>
                <Input
                    name="nome_perfil"
                    label="Nome"
                    formulario={form}
                    error={"Preencha o Nome"}
                    mascara="letras"
                    required
                    defaultValue={defaultValues && defaultValues["nome_perfil"]}
                    disabled={disabledFields?.some(
                        (field: string) => field == "nome_perfil"
                    )}
                />
            </InputGroup>
            <InputGroup className="flex-wrap">
                {perfis.map((e, index) => (
                    <InputSelectComponent
                        key={index}
                        name={e.value}
                        label={e.label}
                        width="xl:w-[32%]"
                        formulario={form}
                        options={opcao}
                        required
                        error={`Informe se ${e.value}`}
                        defaultValue={defaultValues && defaultValues[e.value]}
                        disabled={disabledFields?.some(
                            (field: string) => field == e.value
                        )}
                    />
                ))}
            </InputGroup>

            <TabelaMenu form={form} menusDefault={defaultValues && defaultValues["permissoes_perfil"]}/>

            {/* //Permissões */}
            {children}
        </form>
    );
};

export default FormEditPerfil;
