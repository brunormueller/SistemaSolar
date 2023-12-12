"use client";

import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import { GetForm } from "@/utils";
import { useState } from "react";
import * as yup from "yup";

const FormInstituicao = ({
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

  const arrayTaxas = [6, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120];
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
        <InputGroup>
          <Input
            label="Código"
            width="xl:w-1/6"
            name="codigo_inst"
            formulario={form}
            error={"Preencha o Código"}
            mascara="numerico"
            required
            defaultValue={defaultValues && defaultValues["codigo_inst"]}
            disabled={disabledFields?.some(
              (field: string) => field == "codigo_inst"
            )}
          />
          <Input
            label="Nome"
            width="xl:w-1/2"
            name="nome_inst"
            formulario={form}
            error={"Preencha o Nome"}
            required
            defaultValue={defaultValues && defaultValues["nome_inst"]}
            disabled={disabledFields?.some(
              (field: string) => field == "nome_inst"
            )}
          />
          <Input
            label="IOF(%)"
            width="xl:w-1/3"
            name="iof_inst"
            formulario={form}
            error={"Preencha o IOF"}
            required
            defaultValue={defaultValues && defaultValues["iof_inst"]}
            disabled={disabledFields?.some(
              (field: string) => field == "iof_inst"
            )}
            mascara="numero"
          />
        </InputGroup>
        <br />
        <h3 style={{ textAlign: "center", color: "black" }}>
          <b>TAXA DE JUROS (PESSOA FÍSICA)</b>
        </h3>
        <br />
        <InputGroup wrap="wrap" align="center">
          {arrayTaxas.map((element, index) => (
            <Input
              key={index}
              label={element + "x(%)"}
              width="xl:w-1/6"
              name={`jurosPF${element}_inst`}
              formulario={form}
              error={`Preencha o ${element}x`}
              required
              defaultValue={
                defaultValues && defaultValues[`jurosPF${element}_inst`]
              }
              disabled={disabledFields?.some(
                (field: string) => field == `jurosPF${element}_inst`
              )}
              mascara="numero"
            />
          ))}
        </InputGroup>
        <br />
        <h3 style={{ textAlign: "center", color: "black" }}>
          <b>TAXA DE JUROS (PESSOA JURÍDICA)</b>
        </h3>
        <br />
        <InputGroup wrap="wrap" align="center">
          {arrayTaxas.map((element, index) => (
            <Input
              key={index}
              label={element + "x(%)"}
              width="xl:w-1/6"
              name={`jurosPJ${element}_inst`}
              formulario={form}
              error={`Preencha o ${element}x`}
              required
              defaultValue={
                defaultValues && defaultValues[`jurosPJ${element}_inst`]
              }
              disabled={disabledFields?.some(
                (field: string) => field == `jurosPJ${element}_inst`
              )}
              mascara="numero"
            />
          ))}
        </InputGroup>
        {children}
      </form>
    </>
  );
};

export default FormInstituicao;
