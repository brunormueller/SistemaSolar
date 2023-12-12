import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { Fragment } from "react";

const EdicaoClienteCard = ({ form, dadosCliente }: any) => {
  return (
    <Fragment>
      <InputGroup>
        <Input
          formulario={form}
          name="cpf"
          label="CPF"
          mascara="cpf"
          defaultValue={dadosCliente.cpfcnpj_cliente}
        />
        <Input
          formulario={form}
          name="email"
          label="E-mail"
          type="email"
          defaultValue={dadosCliente.email_cliente}
        />
      </InputGroup>
      <InputGroup>
        <InputSelectComponent
          formulario={form}
          name="origem"
          label="Origem"
          options={[]}
          defaultValue={dadosCliente.origem_cliente}
        />
        <InputSelectComponent
          formulario={form}
          name="cidade"
          label="Cidade"
          options={[]}
          defaultValue={
            dadosCliente.cidade_cliente + "-" + dadosCliente.estado_cliente
          }
        />
      </InputGroup>
      <InputGroup>
        <Input
          formulario={form}
          name="endereco"
          label="Endereço"
          defaultValue={dadosCliente.rua_cliente}
        />
      </InputGroup>
    </Fragment>
  );
};

export default EdicaoClienteCard;
