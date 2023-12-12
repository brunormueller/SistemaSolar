import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarTabelaCustoInstalacao } from "@/requests/CRUD/CustoInstalação/custoInstalacao";
import { IValueLabel } from "@/types/formInterfaces";
import { GetForm, valueLabel } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormRegioesVenda = ({ onSubmitFunction, defaultValues, disabledFields, children, ...rest }: any) => {
    const [yupSchema, setYupSchema] = useState<yup.ObjectSchema<{}, yup.AnyObject, {}, "">>(yup.object().shape({}));
    const [tabelaCustoInstalacao, setTabelaCustoInstalacao] = useState<IValueLabel[]>([]);

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

    useEffect(() => {
        listarTabelaCustoInstalacao().then((arr) => {
            const value = "id";
            const label = "name";
            setTabelaCustoInstalacao(valueLabel(arr, label, value));
        });
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
            <InputGroup>
                <Input
                    name="nome_regiao_venda"
                    label="Nome da Região"
                    formulario={form}
                    error={"Preencha o Nome da Região"}
                    required
                    defaultValue={defaultValues && defaultValues["nome_regiao_venda"]}
                    disabled={disabledFields?.some((field: string) => field == "nome_regiao_venda")}
                />
                <InputSelectComponent
                    label="Tabela Custo Instalação"
                    name="tabCustoInst_regiao_venda"
                    formulario={form}
                    options={tabelaCustoInstalacao}
                    error="Selecione uma Tabela"
                    required
                    defaultValue={defaultValues && defaultValues["tabCustoInst_regiao_venda"]}
                    disabled={disabledFields?.some((field: string) => field == "nome_regiao_venda")}
                />
            </InputGroup>
            {children}
        </form>
    );
};

export default FormRegioesVenda;
