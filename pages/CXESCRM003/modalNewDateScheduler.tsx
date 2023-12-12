import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarClientesConsulta } from "@/requests/CRUD/Cliente/listarClientes";
import { format } from "date-fns";
import { useEffect, useState } from "react";
const NewDateScheduler = ({
  taskSelecionada,
  selectedDateTime,
  haTask,
  form,
}: any) => {
  // const [isDiaTodo, setIsDiaTodo] = useState(false);
  const [cliente, setCliente] = useState([]);
  let teste = "";
  let time = "";
  const dataHj = new Date("dd/mm/yyyy");
  console.log(dataHj);

  const arrayOrigem = [
    { value: "1", label: "Baixa" },
    { value: "2", label: "Média" },
    { value: "3", label: "Alta" },
  ];

  useEffect(() => {
    const buscarCliente = async () => {
      try {
        const response = await listarClientesConsulta();
        const clientesNumerico = response.map((cliente: any) => ({
          value: cliente.id_cliente,
          label: cliente.nome_cliente,
        }));
        setCliente(clientesNumerico);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    buscarCliente();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 ">
        <InputGroup>
          <InputSelectComponent
            formulario={form}
            name="urgencia"
            label="Urgência"
            error="Preencha a Urgência"
            width="xl:w-1/1"
            options={arrayOrigem}
            required
          />

          <InputSelectComponent
            formulario={form}
            name="id_cliente"
            label="Cliente"
            error="Preencha o Cliente"
            width="xl:w-1/1"
            options={cliente}
            required
          />
        </InputGroup>

        <InputGroup className="items-center">
          {/* {selectedDateTime && ( */}
          <Input
            formulario={form}
            label="Data Inicio"
            mascara="data"
            name="diaAtividade"
            error="Preencha a data"
            defaultValue={
              selectedDateTime ? format(selectedDateTime, "dd/MM/yyyy") : ""
            }
            required
          />
          {/* )} */}

          <Input
            formulario={form}
            label="Hora Inicio"
            type="time"
            name="horaAtividade"
            error="Preencha a hora"
            defaultValue={
              selectedDateTime ? format(selectedDateTime, "HH:mm:ss") : ""
            }
            required
          />
        </InputGroup>

        <InputGroup className="items-center ">
          <>
            <Input
              formulario={form}
              name="datafim"
              label="Data Fim"
              error="Preencha a data"
              width="xl:w-1/1"
              mascara="data"
              required
            />

            <Input
              formulario={form}
              name="horafim"
              type="time"
              label="Hora Fim"
              // error="Preencha a hora"
              width="xl:w-1/1"
              defaultValue={
                selectedDateTime ? format(selectedDateTime, "HH:mm:ss") : ""
              }
              // required
            />
          </>
        </InputGroup>
        <Input
          formulario={form}
          type="textarea"
          label="Descrição"
          name="tipoAtv"
          error="Preencha a Descrição"
          required
        />
      </div>
    </>
  );
};

export default NewDateScheduler;
