"use client";

import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarPerfis } from "@/requests/CRUD/Perfil/listarPerfis";
import { listarRegionais } from "@/requests/CRUD/Regional/listarRegionais";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormUsuario = ({
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
    const [dadosPerfil, setDadosPerfil] = useState<any[]>([]);
    const [dadosRegional, setDadosRegional] = useState<any[]>([]);

    const [disabledPassword, setDisabledPassword] = useState<boolean>(
        disabledFields?.some((field: string) => field == "senha_usuario")
    );

    useEffect(() => {
        listarRegionais().then((res) => setDadosRegional(res));
        listarPerfis().then((res) => setDadosPerfil(res));
    }, []);

    const tabelas = [
        { value: "1", label: "Tabela 1" },
        { value: "2", label: "Tabela 2" },
        { value: "3", label: "Tabela 3" },
        { value: "4", label: "Tabela 4" },
    ];

    const orientacao = [
        { value: "1", label: "Sim" },
        { value: "0", label: "Não" },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
            <InputGroup>
                <Input
                    name="nome_usuario"
                    label="Nome"
                    width="xl:w-1/3"
                    formulario={form}
                    error={"Preencha o Nome"}
                    mascara="letras"
                    required
                    defaultValue={
                        defaultValues && defaultValues["nome_usuario"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "nome_usuario"
                    )}
                />
                <InputSelectComponent
                    name="perfil_usuario"
                    label="Perfil"
                    width="xl:w-1/3"
                    formulario={form}
                    error={"Escolha um Perfil"}
                    options={dadosPerfil
                        .filter((element) => element.status_perfil == 1)
                        .map((element) => ({
                            value: element.id_perfil,
                            label: element.nome_perfil,
                        }))}
                    required
                    defaultValue={
                        defaultValues && defaultValues["perfil_usuario"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "perfil_usuario"
                    )}
                />
                <InputSelectComponent
                    name="regiao_usuario"
                    label="Regional"
                    width="xl:w-1/3"
                    formulario={form}
                    error={"Escolha a Regional!"}
                    options={dadosRegional
                        .filter((element) => element.status_regiao == 1)
                        .map((element) => ({
                            value: element.id_regiao,
                            label: element.nome_regiao,
                        }))}
                    required
                    defaultValue={
                        defaultValues && defaultValues["regiao_usuario"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "regiao_usuario"
                    )}
                />
            </InputGroup>
            <InputGroup>
                <Input
                    name="comissao_usuario"
                    label="Comissão"
                    formulario={form}
                    mascara="numero"
                    error={"Preencha a comissão!"}
                    required
                    defaultValue={
                        defaultValues && defaultValues["comissao_usuario"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "comissao_usuario"
                    )}
                />
                <Input
                    name="telefone1_usuario"
                    label="Telefone 1"
                    formulario={form}
                    mascara="telefone"
                    error={"Preencha o Telefone!"}
                    required
                    defaultValue={
                        defaultValues && defaultValues["telefone1_usuario"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "telefone1_usuario"
                    )}
                />
                <Input
                    name="email_usuario"
                    label="E-mail"
                    formulario={form}
                    type="email"
                    error="Preencha o email"
                    required
                    defaultValue={
                        defaultValues && defaultValues["email_usuario"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "email_usuario"
                    )}
                />
                <Input
                    formulario={form}
                    name="login_usuario"
                    label="Login"
                    required
                    error="Preencha o Login"
                    defaultValue={
                        defaultValues && defaultValues["login_usuario"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "login_usuario"
                    )}
                />
            </InputGroup>
            {children}
        </form>
    );
};

export default FormUsuario;
