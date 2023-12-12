import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import {
  IEstado,
  listarEstados,
} from "@/requests/common/EstadosCidades/estadosCidades";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormAliquota = ({
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
  const [estados, setEstados] = useState<any[]>([]);

  useEffect(() => {
    listarEstados().then((arr) => setEstados(arr));
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
        <InputGroup align="center">
          <Input
            name="concessionaria_aliquota"
            label="Concessionária de Energia"
            formulario={form}
            width="xl:w-1/2"
            mascara="letrasNumeros"
            error="Preencha a Concessionária "
            required
            defaultValue={
              defaultValues && defaultValues["concessionaria_aliquota"]
            }
            disabled={disabledFields?.some(
              (field: string) => field == "concessionaria_aliquota"
            )}
          />
          <InputSelectComponent
            name="estado_aliquota"
            width="xl:w-1/6"
            label="UF"
            formulario={form}
            options={estados.map((estado: IEstado) => ({
              label: `${estado.uf_estado} - ${estado.nome_estado}`,
              value: `${estado.uf_estado}`,
            }))}
            error="Selecione o Estado"
            required
            defaultValue={defaultValues && defaultValues["estado_aliquota"]}
            disabled={disabledFields?.some(
              (field: string) => field == "estado_aliquota"
            )}
          />
        </InputGroup>
        <InputGroup align="center">
          <Input
            name="mesAno_aliquota"
            width="xl:w-1/3"
            label="Mês/Ano Ref."
            formulario={form}
            mascara="mesAno"
            required
            error="Preencha o Mês/Ano"
            defaultValue={defaultValues && defaultValues["mesAno_aliquota"]}
            disabled={disabledFields?.some(
              (field: string) => field == "mesAno_aliquota"
            )}
          />
          <Input
            name="icmsBase_aliquota"
            width="xl:w-1/3"
            label="ICMS Base (%)"
            formulario={form}
            mascara="numero"
            error="Preencha o ICMS Base"
            required
            defaultValue={defaultValues && defaultValues["icmsBase_aliquota"]}
            disabled={disabledFields?.some(
              (field: string) => field == "icmsBase_aliquota"
            )}
          />
        </InputGroup>
        <InputGroup align="center">
          <Input
            label="ICMS Subsidiado (%)"
            name="icmsSubsidiado_aliquota"
            width="xl:w-1/3"
            formulario={form}
            mascara="numero"
            error="Preencha o ICMS Subsidiado"
            required
            defaultValue={
              defaultValues && defaultValues["icmsSubsidiado_aliquota"]
            }
            disabled={disabledFields?.some(
              (field: string) => field == "icmsSubsidiado_aliquota"
            )}
          />
          <Input
            width="xl:w-1/3"
            label="PIS + COFINS (%)"
            name="pisCofins_aliquota"
            formulario={form}
            mascara="numero"
            error="Preencha o Pis + Cofins"
            required
            defaultValue={defaultValues && defaultValues["pisCofins_aliquota"]}
            disabled={disabledFields?.some(
              (field: string) => field == "pisCofins_aliquota"
            )}
          />
        </InputGroup>
        {children}
      </form>
    </>
  );
};
export default FormAliquota;
