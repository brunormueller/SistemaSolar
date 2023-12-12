import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";

const NewCardKanban = ({ form }: any) => {
  const classUrgencias =
    "p-1 px-6 gap-2 cursor-pointer bg-stroke rounded-md flex items-center";
  const flagUrgencia = "p-1 h-1 bg-danger rounded-[2px]";
  return (
    <div>
      <h1>Novo Card</h1>
      <Input formulario={form} label="Titulo" name="titulo" />
      <InputGroup className="mt-1">
        <div className="grid">
          <label>Urgência</label>
          <div className="flex gap-2 h-10 mt-3 max-w-fit">
            <span className={classUrgencias}>
              <div className={`bg-danger ${flagUrgencia}`}></div>Alta
            </span>
            <span className={classUrgencias}>
              <div className={`bg-warning ${flagUrgencia}`}></div>Média
            </span>
            <span className={classUrgencias}>
              <div className={`bg-primary ${flagUrgencia}`}></div>Baixa
            </span>
          </div>
        </div>
      </InputGroup>
      <Input formulario={form} label="Tipo" name="tipo" />
      <Input formulario={form} label="Observação" name="observacao" />
    </div>
  );
};

export default NewCardKanban;
