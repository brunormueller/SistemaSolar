import Button from "@/components/Forms/Button";
import { editarParametros } from "@/requests/CRUD/ParametrosComerciais/editarParametros";
import { listarParametros } from "@/requests/CRUD/ParametrosComerciais/listarParametros";
import { FormatFields } from "@/utils";
import { useEffect, useState } from "react";
import FormProposta from "./FormProposta";
import LoaderSun from "@/components/common/Loader/LoaderSun";

const FormPropostaComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState<any>(false);

  useEffect(() => {
    atualizarParametros();
  }, []);

  const atualizarParametros = () => {
    listarParametros().then((res) => setDefaultValues(res));
  };

  const onSubmitFunction = (data: any) => {
    data = { ...defaultValues, ...data };
    setIsLoading(true);
    data["adicional_maximo_parametro"] = FormatFields.desformatarNumeros(
      data["adicional_maximo_parametro"]
    );
    data["desconto_maximo_parametro"] = FormatFields.desformatarNumeros(
      data["desconto_maximo_parametro"]
    );
    data["reajuste_rsi_parametro"] = FormatFields.desformatarNumeros(
      data["reajuste_rsi_parametro"]
    );
    data["margem_depreciacao_parametro"] = FormatFields.desformatarNumeros(
      data["margem_depreciacao_parametro"]
    );
    data["margem_geracao_parametro"] = FormatFields.desformatarNumeros(
      data["margem_geracao_parametro"]
    );
    data["potencia_base_parametro"] = FormatFields.desformatarNumeros(
      data["potencia_base_parametro"]
    );

    const filteredData: any = {};

    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        filteredData[key] = data[key];
      }
    }

    editarParametros(filteredData).finally(() => {
      setIsLoading(false);
      if (data["adicional_maximo_parametro"]) {
        data["adicional_maximo_parametro"] = FormatFields.formatarNumero(
          data["adicional_maximo_parametro"]
        );
      }
      if (data["desconto_maximo_parametro"]) {
        data["desconto_maximo_parametro"] = FormatFields.formatarNumero(
          data["desconto_maximo_parametro"]
        );
      }
      if (data["reajuste_rsi_parametro"]) {
        data["reajuste_rsi_parametro"] = FormatFields.formatarNumero(
          data["reajuste_rsi_parametro"]
        );
      }
      if (data["margem_depreciacao_parametro"]) {
        data["margem_depreciacao_parametro"] = FormatFields.formatarNumero(
          data["margem_depreciacao_parametro"]
        );
      }
      if (data["margem_geracao_parametro"]) {
        data["margem_geracao_parametro"] = FormatFields.formatarNumero(
          data["margem_geracao_parametro"]
        );
      }
      if (data["potencia_base_parametro"]) {
        data["potencia_base_parametro"] = FormatFields.formatarNumero(
          data["potencia_base_parametro"]
        );
      }
      atualizarParametros();
    });
  };

  return defaultValues ? (
    <FormProposta
      onSubmitFunction={onSubmitFunction}
      defaultValues={defaultValues}
    >
      <div className="flex justify-center">
        <Button loading={isLoading}>Salvar</Button>
      </div>
    </FormProposta>
  ) : (
    <div className="w-full h-[500px] flex flex-col justify-center items-center">
      <LoaderSun />
    </div>
  );
};

export default FormPropostaComponent;
