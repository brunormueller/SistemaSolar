import { PopoverCadastroCliente } from "@/components/Kanban/popoverCadastroCliente";
import { verificaTelefone } from "@/requests/CRUD/ColetaDados/cadastroColetaDados";
import { cadastrarCliente } from "@/requests/CRUD/Cliente/cadastroCliente";
import { valuesLocalStorage } from "@/services/auth";
import { Fragment, useEffect, useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import Button from "../../components/Forms/Button";
import Container from "../../components/Forms/Container";
import Divider from "../../components/Forms/Divider";
import Input from "../../components/Forms/Input";
import InputGroup from "../../components/Forms/InputGroup";
import InputSelectComponent from "../../components/Forms/InputSelect";
import { FieldValues } from "react-hook-form";

const DadosGerais = ({ form, updateDadosGerados, inCard, cidades }: any) => {
  const { handleSubmit } = form.control;
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const [isFocusedArray, setIsFocusedArray] = useState(
    Array(meses.length).fill(false)
  );
  const [isFilled, setIsFilled] = useState(Array(meses.length).fill(false));
  const [mediaConsumoCampo, setMediaConsumoCampo] = useState(false);
  const [clienteNovo, setClienteNovo] = useState(false);
  const [openPopoverCadastro, setOpenPopoverCadastro] = useState(false);
  const [openPopoverCidade, setOpenPopoverCidade] = useState(false);
  const [nomeKeyUp, setNomeKeyUp] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [mouseOn, setMouseOn] = useState(false);
  const { id_usuario } = valuesLocalStorage();
  const [clienteSelecionado, setClienteSelecionado] = useState({} as any);
  const [haErros, setHaErros] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState("Média");
  const { mediaConsumo } = form.control._formValues;
  const arrayTipo = [
    { value: "1", label: "Monofásico" },
    { value: "2", label: "Bifásico" },
    { value: "3", label: "Trifásico" },
  ];
  const arrayConcessionaria = [
    { value: "1", label: "Padrão" },
    { value: "2", label: "CELESC" },
  ];
  const arrayOrigem = [
    { value: "1", label: "Redes Sociais" },
    { value: "2", label: "Site" },
  ];
  const arrayTipoFatura = [
    { value: "1", label: "Residencial" },
    { value: "2", label: "Industrial" },
    { value: "3", label: "Rural" },
  ];
  useEffect(() => {
    updateDadosGerados(false);
    if (mediaConsumo != "") {
      setMediaConsumoCampo(true);
    }
  }, []);

  const margemGeracaoPadrao = 10;
  const margemDepreciacaoPadrao = 20;
  const handleCalcular = async (data: FieldValues) => {
    console.log(data);

    const { porcentagemGeracao, porcentagemDepreciacao, mediaConsumo } =
      form.control._formValues;
    const geracaoAdicional = mediaConsumo * (porcentagemGeracao / 100);
    const potenciaConsumo = mediaConsumo + geracaoAdicional;
    const potenciaDepreciada = potenciaConsumo * (porcentagemDepreciacao / 100);
    const potenciaKwp = potenciaConsumo - potenciaDepreciada;
    // ((Consumo / 12) + X% (margem de geração [Padrão 10%])
    // + X% de aumento de consumo (configurado na coleta) = X kW de consumo)
    //  - % de perda (Padrão: 20%)
    const modulosNecessarios = Math.ceil(potenciaKwp / 55);
    const setValue = form.setValue;
    console.log(modulosNecessarios);

    setValue("modulosNecessarios", modulosNecessarios);
    setValue("idUsuario", id_usuario);
    prosseguirEtapa();
  };

  const prosseguirEtapa = () => {
    const haErrosForm = Object.keys(form.errors).length > 0;
    console.log(haErrosForm);

    if (!haErrosForm) {
      if (clienteNovo) {
        handleSaveNovoCliente();
      }
      updateDadosGerados(true);
    }
  };
  const handleMediaConsumo = (e: any) => {
    if (e.target.value != "") {
      setMediaConsumoCampo(true);
    } else {
      setMediaConsumoCampo(false);
    }
  };
  const handleValidaTelefone = (e: any) => {
    const { id_cliente } = form.control._formValues;
    console.log(id_cliente);
    if (e.target.value != "") {
      verificaTelefone(e.target.value).then((res: any) => {
        if (res.body) {
          setHaErros(true);
          console.log("caiu aquiiiii nevermoree");

          // form.control.setError("telefone");
          form.control.setError("telefone", {
            type: "required",
            message: "Telefone já cadastrado",
          });
        } else {
          setHaErros(false);
          console.log("caiu aquiiiii");

          form.clearErrors("telefone");
        }
      });
    }
  };

  const handleSaveNovoCliente = () => {
    const { nome, telefone, cidade } = form.control._formValues;
    const data = { nome, telefone, cidade, id_usuario };
    cadastrarCliente(data).then((res) => {
      if (res.status) {
        const idCliente = res.body;
        const setValue = form.setValue;
        setValue("idCliente", idCliente);
        setClienteNovo(false);
      }
    });
  };
  const handlePopoverCliente = (value: any) => {
    setClienteSelecionado(value);
    setOpenPopoverCadastro(!openPopoverCadastro);
    if (value != undefined) {
      if (
        value.nome_cliente != undefined ||
        value.cidade_cliente != undefined ||
        value.telefone1_cliente != undefined
      ) {
        const nome_cliente = value.nome_cliente;
        const id_cliente = value.id_cliente;
        const cidade_cliente = value.cidade_cliente;
        const estado_cliente = value.estado_cliente;
        const telefone1_cliente = value.telefone1_cliente;
        form.setValue("nome", nome_cliente);
        form.setValue("idCliente", id_cliente);

        form.setValue("telefone", telefone1_cliente);
        cidades.map((cidade: any) => {
          if (cidade.label == `${cidade_cliente} - ${estado_cliente}`) {
            setCidadeSelecionada(cidade.value);
            form.setValue("cidade", cidade);
          }
        });
      }
    }
  };
  const medias = ["Média", "Mensal"];
  const handleCadastroCliente = () => {
    setOpenPopoverCadastro(!openPopoverCadastro);
  };
  const handleCadastroNovoCliente = () => {
    setClienteNovo(true);
    setOpenPopoverCadastro(!openPopoverCadastro);
  };

  const handleStyleConsumo = (index: number) => {
    const updatedFocusArray = [...isFocusedArray];
    updatedFocusArray[index] = false;
    setIsFocusedArray(updatedFocusArray);

    const updatedFilledArray = [...isFilled];
    const inputValue = form.control._formValues[`valorMes${index}`];
    updatedFilledArray[index] = !!inputValue.trim();
    setIsFilled(updatedFilledArray);
  };

  const classConsumo = `flex cursor-pointer relative dark:text-white rounded-md text-black border-primary text-lg border-[1px] py-1 px-4`;
  const classSelecionada = `bg-primary ${classConsumo} text-white`;

  return (
    <Container>
      <div>
        <form>
          {!inCard && (
            <>
              <p className="text-lg text-boxdark mb-5">Dados do Cliente</p>
              <Divider />
              <InputGroup>
                <div className="grid w-full">
                  <Input
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      setNomeKeyUp(e.currentTarget.value)
                    }
                    onFocus={handleCadastroCliente}
                    autoComplete="off"
                    formulario={form}
                    required
                    error="Digite o nome"
                    name="nome"
                    label="Nome do Cliente"
                    onMouseLeave={() => setMouseOn(false)}
                    onMouseEnter={() => setMouseOn(true)}
                  />
                  <PopoverCadastroCliente
                    nomeDigitado={nomeKeyUp}
                    clienteNovo={handleCadastroNovoCliente}
                    clienteSelecionado={(e: any) => handlePopoverCliente(e)}
                    open={openPopoverCadastro}
                  />
                </div>
                <InputSelectComponent
                  // onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  //   setCidadeKeyUp(e.currentTarget.value)
                  // }
                  formulario={form}
                  required
                  onFocus={() => setOpenPopoverCidade(!openPopoverCidade)}
                  error="Selecione a cidade"
                  name="cidade"
                  label="Cidade - Estado"
                  options={cidades}
                />
                {/* <PopoverCidadeCliente
                  nomeDigitado={cidadeKeyUp}
                  clienteNovo={setClienteNovo}
                  clienteSelecionado={(e: any) => handleTest(e)}
                  open={openPopoverCidade}
                /> */}
                <Input
                  autoComplete="off"
                  formulario={form}
                  mascara="telefone"
                  defaultValue={clienteSelecionado.telefone1_cliente}
                  required
                  onBlur={handleValidaTelefone}
                  error="Digite o telefone"
                  label="Telefone do Cliente"
                  name="telefone"
                />
                {clienteNovo && (
                  <InputSelectComponent
                    formulario={form}
                    required
                    error="Selecione a origem"
                    name="origem"
                    label="Origem"
                    options={arrayOrigem}
                  />
                )}
              </InputGroup>
              {/* {clienteNovo && (
                <div className="flex w-44 text-sm">
                  <Button onClick={handleSaveNovoCliente} type="button">
                    Salvar Contato
                  </Button>
                </div>
              )} */}
            </>
          )}

          <p className={`text-lg text-boxdark mb-5 ${inCard ? "" : "mt-18"}`}>
            Dados da Estrutura
          </p>
          <Divider />
          <InputGroup>
            <InputSelectComponent
              formulario={form}
              name="tipoLigacao"
              label="Tipo de Ligação"
              options={arrayTipo}
            />
            <InputSelectComponent
              formulario={form}
              name="concessionaria"
              label="Concessionária"
              options={arrayConcessionaria}
            />
            <InputSelectComponent
              formulario={form}
              name="tipoRede"
              label="Classificação"
              options={arrayTipoFatura}
            />
          </InputGroup>
          <InputGroup>
            <Input
              formulario={form}
              defaultValue={`${margemGeracaoPadrao}`}
              name="porcentagemGeracao"
              label="Margem de Geração (%)"
              required
              placeholder="Digite a Geração"
            />
            <Input
              formulario={form}
              defaultValue={`${margemDepreciacaoPadrao}`}
              name="porcentagemDepreciacao"
              label="Margem de Depreciação (%)"
              placeholder="Digite a Depreciação"
            />
          </InputGroup>
          <InputGroup className="justify-center gap-9 my-12">
            {medias.map((media, index) => (
              <div
                key={index}
                onClick={() => setSelectedMedia(media)}
                className={
                  selectedMedia === media ? classSelecionada : classConsumo
                }
              >
                <span
                  className={`absolute top-0 right-0 transform translate-x-[30%] -translate-y-1/2 text-[#1e2661] text-xl bg-white rounded-xl p-[1px]`}
                >
                  {selectedMedia === media && <BsPatchCheckFill size={23} />}
                </span>
                {media === "Média" ? "Média de Consumo" : "Consumo Mensal"}
              </div>
            ))}
          </InputGroup>
          {selectedMedia === "Mensal" ? (
            <Fragment>
              <div className="flex justify-center my-4">
                <p className="text-lg font-medium uppercase">Consumo Mensal </p>
              </div>
              <InputGroup className="items-center grid justify-center md:grid-cols-3">
                {meses.map((mes, index) => (
                  <div
                    key={index}
                    className={`relative border-[1px] ${
                      isFilled[index] ? "border-success border-opacity-100" : ""
                    } border-opacity-25 m-3 ${
                      isFocusedArray[index] ? "border-opacity-100" : ""
                    } border-primary rounded-md p-4`}
                  >
                    <span
                      className={`absolute top-0 left-0 transform translate-x-[20%] -translate-y-1/2 px-1  ${
                        isFilled[index] ? "text-success border-opacity-100" : ""
                      }  bg-white dark:bg-boxdark ${
                        isFocusedArray[index] ? "text-primary" : ""
                      }`}
                    >
                      {" "}
                      {mes}
                    </span>
                    <Input
                      onFocus={() => {
                        const updatedFocusArray = [...isFocusedArray];
                        updatedFocusArray[index] = true;
                        setIsFocusedArray(updatedFocusArray);
                      }}
                      onBlur={() => handleStyleConsumo(index)}
                      key={index}
                      formulario={form}
                      name={`valorMes${index}`}
                      width="px-6"
                    />
                  </div>
                ))}
              </InputGroup>
            </Fragment>
          ) : (
            <InputGroup className="justify-center">
              <div
                className={`relative border-[1px]  m-3 ${
                  mediaConsumoCampo
                    ? "border-success border-opacity-100"
                    : "border-primary border-opacity-25"
                }  rounded-md p-4`}
              >
                <span
                  className={`absolute top-0 left-0 transform translate-x-[20%] ${
                    mediaConsumoCampo ? "text-success" : ""
                  } -translate-y-1/2 px-1 bg-white dark:bg-boxdark `}
                >
                  {" "}
                  Média Consumo
                </span>
                <Input
                  formulario={form}
                  required
                  error="Digite o Consumo Médio"
                  onBlur={handleMediaConsumo}
                  onChange={handleMediaConsumo}
                  name="mediaConsumo"
                  width="px-6"
                />
              </div>
            </InputGroup>
          )}
          <InputGroup align="center">
            <Button
              className="w-1/4"
              onClick={handleSubmit(handleCalcular)}
              type="button"
            >
              Solicitar
            </Button>
          </InputGroup>
        </form>
      </div>
    </Container>
  );
};

export default DadosGerais;
