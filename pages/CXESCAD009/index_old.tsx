"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import { cadastrarEstrutura } from "@/requests/CRUD/EstruturaFixacao/cadastrarEstruturaFixacao";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormEstruturaFixacao from "./FormEstruturaFixacao";

const CadastroEstrutraFixacao = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitFunction = async (data: FieldValues) => {
    data.preventDefault();
    setIsLoading(true);
    cadastrarEstrutura(data).finally(() => setIsLoading(false));
  };

  return (
    <>
      <Breadcrumb pageName="Cadastro de Estrutura de Fixação" />
      <Container>
        <FormEstruturaFixacao onSubmit={onSubmitFunction}>
          <Button loading={isLoading}>Salvar</Button>
        </FormEstruturaFixacao>
      </Container>
    </>
  );
};

export default CadastroEstrutraFixacao;
