import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import { FormatFields } from "@/utils";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import FormDisjuntor from "./FormDisjuntor";
import { cadastrarDisjuntor } from "@/requests/CRUD/disjuntor/cadastroDisjuntor";

const CadastroDisjuntor = () => {
  const onSubmitFunction = (data: FieldValues) => {
    setIsloading(true);
    data["precovenda_disjuntor"] = FormatFields.desformatarNumeros(
      data["precovenda_disjuntor"]
    );
    data["correntenominal_disjuntor"] = FormatFields.desformatarNumeros(
      data["correntenominal_disjuntor"]
    );
    data["tensaovca_disjuntor"] = FormatFields.desformatarNumeros(
      data["tensaovca_disjuntor"]
    );
    data["tensaovcc_disjuntor"] = FormatFields.desformatarNumeros(
      data["tensaovcc_disjuntor"]
    );
    cadastrarDisjuntor(data).finally(() => setIsloading(false));
    console.log(data);
  };

  const [isloading, setIsloading] = useState(false);

  return (
    <>
      <Breadcrumb pageName="Cadastro de Disjuntor" />
      <Container>
        <FormDisjuntor onSubmitFunction={onSubmitFunction}>
          <Button loading={isloading}>Salvar</Button>
        </FormDisjuntor>
      </Container>
    </>
  );
};

export default CadastroDisjuntor;
