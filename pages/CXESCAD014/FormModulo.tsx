import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarFornecedores } from "@/requests/CRUD/Fornecedor/listarFornecedores";
import { GetForm, valueLabel } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";
const FormModulo = ({ onSubmitFunction, defaultValues, disabledFields, children, ...rest }: any) => {
    const [yupSchema, setYupSchema] = useState<yup.ObjectSchema<{}, yup.AnyObject, {}, "">>(yup.object().shape({}));

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

    const grupoEmpresa = [{ value: "Padrão", label: "Padrão" }];
    const moduloPadrao = [
        { value: "1", label: "Sim" },
        { value: "0", label: "Não" },
    ];

    const celula = [
        { value: "Monocristalino", label: "Monocristalino" },
        { value: "Policristalino", label: "Policristalino" },
    ];

    const origem = [
        { value: "Nacional", label: "Nacional" },
        { value: "Importado", label: "Importado" },
    ];

    const [fornecedores, setFornecedores] = useState<any[]>([]);

    useEffect(() => {
        const buscarcarTipoInstalacao = async () => {
            listarFornecedores().then((arr) => {
                arr.filter((fornecedor) => fornecedor.status_fornecedor == "1");
                setFornecedores(valueLabel(arr, "razaosocial_fornecedor", "id_fornecedor"));
            });
        };
        buscarcarTipoInstalacao();
    }, []);
    return (
        <>
            <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
                <InputGroup>
                    <Input
                        label="Marca"
                        width="xl:w-1/3"
                        name="marca_modulo"
                        formulario={form}
                        mascara="letrasNumeros"
                        error="Preencha a Marca"
                        required
                        defaultValue={defaultValues && defaultValues["marca_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "marca_modulo")}
                    />

                    <Input
                        label="Modelo"
                        width="xl:w-1/3"
                        name="modelo_modulo"
                        formulario={form}
                        mascara="letrasNumeros"
                        error="Preencha o Modelo"
                        required
                        defaultValue={defaultValues && defaultValues["modelo_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "modelo_modulo")}
                    />

                    <InputSelectComponent
                        formulario={form}
                        name="grupo_modulo"
                        label="Grupo Empresa"
                        width="xl:w-1/3"
                        options={grupoEmpresa}
                        error="Preencha o Grupo de Empresa"
                        required
                        defaultValue={defaultValues && defaultValues["grupo_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "grupo_modulo")}
                    />

                    <Input
                        formulario={form}
                        name="cod_interno_modulo"
                        label="Cód. Interno"
                        width="xl:w-1/3"
                        mascara="numerico"
                        error="Preencha o  Código Interno"
                        required
                        defaultValue={defaultValues && defaultValues["cod_interno_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "cod_interno_modulo")}
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        formulario={form}
                        name="precovenda_modulo"
                        label="Preço Venda"
                        width="xl:w-1/3"
                        mascara="numero"
                        error="Preencha o Preço de Venda"
                        required
                        defaultValue={defaultValues && defaultValues["precovenda_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "precovenda_modulo")}
                    />

                    <InputSelectComponent
                        formulario={form}
                        name="origem_modulo"
                        label="Origem"
                        width="xl:w-1/3"
                        options={origem}
                        error="Preencha a Origem"
                        required
                        defaultValue={defaultValues && defaultValues["origem_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "origem_modulo")}
                    />

                    <Input
                        formulario={form}
                        name="garantia_modulo"
                        label="Garantia"
                        width="xl:w-1/3"
                        mascara="numerico"
                        error="Preencha a Garantia"
                        required
                        defaultValue={defaultValues && defaultValues["garantia_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "garantia_modulo")}
                    />

                    <InputSelectComponent
                        formulario={form}
                        name="celula_modulo"
                        label="Célula"
                        width="xl:w-1/3"
                        options={celula}
                        error="Preencha a Célula"
                        required
                        defaultValue={defaultValues && defaultValues["celula_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "celula_modulo")}
                    />
                </InputGroup>

                <InputGroup>
                    <Input
                        formulario={form}
                        name="minimoPlaca_modulo"
                        label="Mínimo de Placas"
                        width="xl:w-1/3"
                        mascara="numerico"
                        error="Preencha o Mínimo de Placas"
                        required
                        defaultValue={defaultValues && defaultValues["minimoPlaca_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "minimoPlaca_modulo")}
                    />

                    <Input
                        formulario={form}
                        name="potencia_modulo"
                        label="Potência (Wp)"
                        width="xl:w-1/3"
                        mascara="numero"
                        error="Preencha a Potência"
                        required
                        defaultValue={defaultValues && defaultValues["potencia_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "potencia_modulo")}
                    />

                    <InputSelectComponent
                        formulario={form}
                        name="padrao_modulo"
                        label="Módulo Padrão"
                        width="xl:w-1/3"
                        options={moduloPadrao}
                        error="Preencha o Módulo Padrão"
                        required
                        defaultValue={defaultValues && defaultValues["padrao_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "padrao_modulo")}
                    />

                    <InputSelectComponent
                        formulario={form}
                        name="fornecedores"
                        label="Fornecedores"
                        width="xl:w-1/3"
                        options={fornecedores}
                        error="Preencha o Fornecedor"
                        required
                        isMulti
                        defaultValue={defaultValues && defaultValues["fornecedores"]}
                        disabled={disabledFields?.some((field: string) => field == "fornecedores")}
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        formulario={form}
                        name="ncm_modulo"
                        label="NCM"
                        width="xl:w-1/2"
                        mascara="numerico"
                        error="Preencha o NCM"
                        required
                        defaultValue={defaultValues && defaultValues["ncm_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "ncm_modulo")}
                    />

                    <Input
                        formulario={form}
                        name="numero_ex_modulo"
                        label="Número EX"
                        width="xl:w-1/2"
                        mascara="numerico"
                        error="Preencha o Número EX"
                        required
                        defaultValue={defaultValues && defaultValues["numero_ex_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "numero_ex_modulo")}
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        formulario={form}
                        name="codigo_finameAte75_modulo"
                        label="Código FINAME
              (até 75 kWp)"
                        width="xl:w-1/3"
                        mascara="numerico"
                        defaultValue={defaultValues && defaultValues["codigo_finameAte75_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "codigo_finameAte75_modulo")}
                    />

                    <Input
                        formulario={form}
                        name="codigo_finameAte375_modulo"
                        label="Código FINAME
              (até 375 kWp)"
                        width="xl:w-1/3"
                        mascara="numerico"
                        defaultValue={defaultValues && defaultValues["codigo_finameAte375_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "codigo_finameAte375_modulo")}
                    />

                    <Input
                        formulario={form}
                        name="codigo_finameAcima375_modulo"
                        label="Código FINAME
              (acima 375 kWp)"
                        width="xl:w-1/3"
                        mascara="numerico"
                        defaultValue={defaultValues && defaultValues["codigo_finameAcima375_modulo"]}
                        disabled={disabledFields?.some((field: string) => field == "codigo_finameAcima375_modulo")}
                    />
                </InputGroup>
                {children}
            </form>
        </>
    );
};

export default FormModulo;
