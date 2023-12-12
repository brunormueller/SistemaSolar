import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarUsuarios } from "@/requests/CRUD/Usuario/listarUsuarios";
import { IValueLabel } from "@/types/formInterfaces";
import { valueLabel } from "@/utils";
import { Fragment, useEffect, useState } from "react";

const NovaAtividadeCard = ({ form }: any) => {
  const [usuarios, setUsuarios] = useState<IValueLabel[]>([]);

  useEffect(() => {
    listarUsuarios().then((res) => {
      return setUsuarios(valueLabel(res, "nome_usuario", "id_usuario"));
    });
  }, []);

  return (
    <Fragment>
      <InputGroup>
        <InputSelectComponent
          formulario={form}
          label="Tipo de Atividade"
          name="tipoAtv"
          options={[{ value: "string", label: "string" }]}
        />
      </InputGroup>
      <InputGroup>
        <InputSelectComponent
          formulario={form}
          label="Urgência"
          name="urgencia"
          defaultValue="1"
          options={[
            { value: "1", label: "Nenhuma" },
            { value: "2", label: "Baixa" },
            { value: "3", label: "Média" },
            { value: "4", label: "Alta" },
          ]}
        />
      </InputGroup>
      <InputGroup>
        <Input
          formulario={form}
          label="Dia"
          mascara="data"
          name="diaAtividade"
        />
        <Input
          formulario={form}
          type="time"
          label="Hora"
          name="horaAtividade"
        />
      </InputGroup>
      <InputGroup>
        <InputSelectComponent
          formulario={form}
          label="Responsável"
          name="responsavel"
          options={usuarios}
        />
      </InputGroup>
      <InputGroup>
        <Input
          formulario={form}
          name="obsNovaAtv"
          type="textarea"
          label="Observação"
        />
      </InputGroup>
    </Fragment>
  );
};

export default NovaAtividadeCard;
