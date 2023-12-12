import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarTipoFornecedor } from "@/requests/CRUD/disjuntor/cadastroDisjuntor";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormDisjuntor = ({
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

  const arrayCurvaDisjuntor = [
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
  ];

  const arrayOrigem = [
    { value: "Nacional", label: "Nacional" },
    { value: "Importato", label: "Importato" },
  ];

  const arrayNumeroPolos = [
    { value: "Monopolar", label: "Monopolar" },
    { value: "Bipolar", label: "Bipolar" },
    { value: "Tripolar", label: "Tripolar" },
  ];

  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    const buscarcarTipoInstalacao = async () => {
      try {
        const response = await listarTipoFornecedor();
        setFornecedores(response.body.fornecedores);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    buscarcarTipoInstalacao();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
        <InputGroup align="center">
          <Input
            formulario={form}
            name="marca_disjuntor"
            width="xl:w-1/3"
            label="Marca"
            error="Preencha a Marca"
            required
            defaultValue={defaultValues && defaultValues["marca_disjuntor"]}
            disabled={disabledFields?.some(
              (field: string) => field == "marca_disjuntor"
            )}
          />
          <Input
            formulario={form}
            name="modelo_disjuntor"
            width="xl:w-1/3"
            label="Modelo"
            required
            error="Preencha o Modelo"
            defaultValue={defaultValues && defaultValues["modelo_disjuntor"]}
            disabled={disabledFields?.some(
              (field: string) => field == "modelo_disjuntor"
            )}
          />
        </InputGroup>
        <InputGroup align="center">
          <Input
            formulario={form}
            name="precovenda_disjuntor"
            width="xl:w-1/5"
            label="Preço de Venda"
            required
            mascara="numero"
            error="Preencha a Venda"
            prefix="R$"
            defaultValue={
              defaultValues && defaultValues["precovenda_disjuntor"]
            }
            disabled={disabledFields?.some(
              (field: string) => field == "precovenda_disjuntor"
            )}
          />
          <InputSelectComponent
            formulario={form}
            name="curva_disparo_disjuntor"
            width="xl:w-1/5"
            label="Curva de Disparo"
            required
            error="Preencha a curva de disparo"
            options={arrayCurvaDisjuntor}
            defaultValue={
              defaultValues && defaultValues["curva_disparo_disjuntor"]
            }
            disabled={disabledFields?.some(
              (field: string) => field == "curva_disparo_disjuntor"
            )}
          />
          <InputSelectComponent
            formulario={form}
            name="nro_polos_disjuntor"
            label="N.° de Polos"
            error="Preencha o Números de Polos"
            required
            width="xl:w-1/4"
            options={arrayNumeroPolos}
            defaultValue={defaultValues && defaultValues["nro_polos_disjuntor"]}
            disabled={disabledFields?.some(
              (field: string) => field == "nro_polos_disjuntor"
            )}
          />
        </InputGroup>
        <InputGroup align="center">
          <Input
            formulario={form}
            name="tensaovca_disjuntor"
            width="xl:w-1/5"
            label="Tensão (Vca)"
            error="Preencha a Tensão"
            mascara="numero"
            required
            defaultValue={defaultValues && defaultValues["tensaovca_disjuntor"]}
            disabled={disabledFields?.some(
              (field: string) => field == "tensaovca_disjuntor"
            )}
          />
          <Input
            formulario={form}
            name="tensaovcc_disjuntor"
            width="xl:w-1/5"
            label="Tensão (Vcc)"
            error="Preencha a Tensão"
            mascara="numero"
            required
            defaultValue={defaultValues && defaultValues["tensaovcc_disjuntor"]}
            disabled={disabledFields?.some(
              (field: string) => field == "tensaovcc_disjuntor"
            )}
          />
          <Input
            formulario={form}
            name="correntenominal_disjuntor"
            width="xl:w-1/4"
            d
            label="Corrente Nominal (A)"
            error="Preencha a Corrente"
            mascara="numero"
            required
            defaultValue={
              defaultValues && defaultValues["correntenominal_disjuntor"]
            }
            disabled={disabledFields?.some(
              (field: string) => field == "correntenominal_disjuntor"
            )}
          />
        </InputGroup>
        <InputGroup align="center">
          <InputSelectComponent
            formulario={form}
            name="origem_disjuntor"
            label="Origem"
            error="Preencha a Origem"
            required
            width="xl:w-1/3"
            options={arrayOrigem}
            defaultValue={defaultValues && defaultValues["origem_disjuntor"]}
            disabled={disabledFields?.some(
              (field: string) => field == "origem_disjuntor"
            )}
          />
          <InputSelectComponent
            isMulti
            formulario={form}
            name="fornecedores"
            label="Fornecedores"
            error="Preencha o Fornecedor"
            required
            width="xl:w-1/3"
            options={fornecedores}
            defaultValue={defaultValues && defaultValues["fornecedores"]}
            disabled={disabledFields?.some(
              (field: string) => field == "fornecedores"
            )}
          />
        </InputGroup>
        {children}
      </form>
    </>
  );
};

export default FormDisjuntor;
