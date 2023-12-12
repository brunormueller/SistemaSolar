import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarTiposFatura } from "@/requests/CRUD/TarifaEnergia/cadastrarTarifaEnergia";
import { IEstado, listarEstados } from "@/requests/common/EstadosCidades/estadosCidades";
import { IValueLabel } from "@/types/formInterfaces";
import { FormatFields, GetForm, valueLabel } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormTarifaEnergia = ({ onSubmitFunction, defaultValues, disabledFields, children, ...rest }: any) => {
    const [tarifaTE, setTarifaTE] = useState<number>(+defaultValues["te_tarifa"] || 0);
    const [tarifaTUSD, setTarifaTUSD] = useState<number>(+defaultValues["tusde_tarifa"] || 0);
    const [showTarifas, setShowTarifas] = useState(defaultValues["grupo_tarifa"] != "A");
    const [yupSchema, setYupSchema] = useState<yup.ObjectSchema<{}, yup.AnyObject, {}, "">>(yup.object().shape({}));
    const [dadosFaturas, setDadosFaturas] = useState<IValueLabel[]>([]);
    const [dadosEstado, setDadosEstado] = useState<any[]>([]);

    useEffect(() => {
        calcularPrecoRKwh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tarifaTE, tarifaTUSD, showTarifas]);

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

    useEffect(() => {
        listarEstados().then((arr) => setDadosEstado(arr));

        const buscarcarTipoFatura = async () => {
            listarTiposFatura().then((res) => setDadosFaturas(valueLabel(res, "nome_tipo_fatura", "nome_tipo_fatura")));
        };
        buscarcarTipoFatura();
    }, []);

    const calcularPrecoRKwh = () => {
        let resultado = (tarifaTE + tarifaTUSD).toFixed(7);
        resultado = FormatFields.formatarNumeroPreciso(String(resultado));
        form.setValue("preco_fixo_tarifa" as never, resultado as never);
    };

    const arrayGrupo: IValueLabel[] = [
        { value: "A", label: "A" },
        { value: "B", label: "B" },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
            <InputGroup align="center">
                <InputSelectComponent
                    label="Grupo"
                    name="grupo_tarifa"
                    formulario={form}
                    width="xl:w-1/4"
                    options={arrayGrupo}
                    error="Selecione um Grupo"
                    required
                    onChange={(selectedGrupo: any) => setShowTarifas(selectedGrupo.value != "A")}
                    defaultValue={defaultValues && defaultValues["grupo_tarifa"]}
                    disabled={disabledFields?.some((field: string) => field == "grupo_tarifa")}
                />
                <Input
                    label="Subgrupo"
                    width="xl:w-1/4"
                    name="subgrupo_tarifa"
                    formulario={form}
                    error={"Preencha o SubGrupo"}
                    required
                    maxLength={5}
                    defaultValue={defaultValues && defaultValues["subgrupo_tarifa"]}
                    disabled={disabledFields?.some((field: string) => field == "subgrupo_tarifa")}
                />
            </InputGroup>
            <InputGroup>
                <InputSelectComponent
                    label="Classificação"
                    name="classificacao_tarifa"
                    formulario={form}
                    width="xl:w-1/4"
                    options={dadosFaturas}
                    error="Selecione uma Classificacao"
                    required
                    defaultValue={defaultValues && defaultValues["classificacao_tarifa"]}
                    disabled={disabledFields?.some((field: string) => field == "classificacao_tarifa")}
                />
                <Input
                    label="Concessionaria"
                    width="xl:w-1/2"
                    name="concessionaria_tarifa"
                    formulario={form}
                    error={"Preencha o Concessionaria"}
                    required
                    defaultValue={defaultValues && defaultValues["concessionaria_tarifa"]}
                    disabled={disabledFields?.some((field: string) => field == "concessionaria_tarifa")}
                />
                <InputSelectComponent
                    label="UF"
                    width="xl:w-1/4"
                    name="uf_tarifa"
                    options={dadosEstado.map((estado: IEstado) => ({
                        label: `${estado.uf_estado} - ${estado.nome_estado}`,
                        value: `${estado.uf_estado}`,
                    }))}
                    formulario={form}
                    error={"Preencha a UF"}
                    required
                    defaultValue={defaultValues && defaultValues["uf_tarifa"]}
                    disabled={disabledFields?.some((field: string) => field == "uf_tarifa")}
                />
            </InputGroup>
            {showTarifas ? (
                <InputGroup>
                    <Input
                        label="Fio B (R$)"
                        width="xl:w-1/4"
                        prefix="R$"
                        name="fiob_tarifa"
                        formulario={form}
                        mascara="numeroPreciso"
                        error={"Preencha o Fio B"}
                        defaultValue={defaultValues && defaultValues["fiob_tarifa"]}
                        disabled={disabledFields?.some((field: string) => field == "fiob_tarifa")}
                    />
                    <Input
                        label="Tarifa TE (R$)"
                        width="xl:w-1/4"
                        name="te_tarifa"
                        formulario={form}
                        prefix="R$"
                        mascara="numeroPreciso"
                        error={"Preencha o Fio B"}
                        onChange={(e) => setTarifaTE(+e.target.value.replace(".", "").replace(",", "."))}
                        defaultValue={defaultValues && defaultValues["te_tarifa"]}
                        disabled={disabledFields?.some((field: string) => field == "te_tarifa")}
                    />
                    <Input
                        label="Tarifa TUSD (R$)"
                        width="xl:w-1/4"
                        name="tusde_tarifa"
                        formulario={form}
                        prefix="R$"
                        mascara="numeroPreciso"
                        error={"Preencha o Fio B"}
                        onChange={(e) => setTarifaTUSD(+e.target.value.replace(".", "").replace(",", "."))}
                        defaultValue={defaultValues && defaultValues["tusde_tarifa"]}
                        disabled={disabledFields?.some((field: string) => field == "tusde_tarifa")}
                    />
                    <Input
                        disabled
                        label="Preço R$/kWh"
                        width="xl:w-1/4"
                        name="preco_fixo_tarifa"
                        formulario={form}
                        prefix="R$"
                        mascara="numeroPreciso"
                        defaultValue={defaultValues && defaultValues["preco_fixo_tarifa"]}
                    />
                </InputGroup>
            ) : (
                <div>
                    <InputGroup align="center">
                        <Input
                            label="Preço R$/kWh (Ponta)"
                            width="xl:w-1/3"
                            name="preco_ponta_tarifa"
                            formulario={form}
                            prefix="R$"
                            mascara="numeroPreciso"
                            error={"Preencha o Preço Ponta"}
                            defaultValue={defaultValues && defaultValues["preco_ponta_tarifa"]}
                            disabled={disabledFields?.some((field: string) => field == "preco_ponta_tarifa")}
                        />
                        <Input
                            label="Preço R$/kWh (Fora Ponta)"
                            width="xl:w-1/3"
                            name="preco_fora_ponta_tarifa"
                            formulario={form}
                            prefix="R$"
                            mascara="numeroPreciso"
                            error={"Preencha o Preço Fora ponta"}
                            defaultValue={defaultValues && defaultValues["preco_fora_ponta_tarifa"]}
                            disabled={disabledFields?.some((field: string) => field == "preco_fora_ponta_tarifa")}
                        />
                        <Input
                            label="Preço Demanda Contratada (R$/kW)"
                            width="xl:w-1/3"
                            name="preco_demanda_tarifa"
                            formulario={form}
                            prefix="R$"
                            mascara="numeroPreciso"
                            error={"Preencha o Preço Demanda"}
                            defaultValue={defaultValues && defaultValues["preco_demanda_tarifa"]}
                            disabled={disabledFields?.some((field: string) => field == "preco_demanda_tarifa")}
                        />
                    </InputGroup>
                </div>
            )}
            {children}
        </form>
    );
};

export default FormTarifaEnergia;
