import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { Fragment } from "react";

const NewList = ({ form }: any) => {
  return (
    <Fragment>
      <InputGroup>
        <Input formulario={form} name="tituloLista" label="Título da lista" />
      </InputGroup>
      <InputGroup>
        <InputSelectComponent
          formulario={form}
          options={[
            { value: "true", label: "Sim" },
            { value: "false", label: "Não" },
          ]}
          name="selectCreatable"
          label="Lista cria tarefas?"
        />
      </InputGroup>
    </Fragment>
  );
};

export default NewList;
