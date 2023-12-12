import { Button } from "@material-tailwind/react";
import { AiOutlinePlus } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import Container from "../../components/Forms/Container";
import Divider from "../../components/Forms/Divider";
import InputGroup from "../../components/Forms/InputGroup";
import InputSelectComponent from "../../components/Forms/InputSelect";

import { TiposTelhadoProps } from "@/requests/CRUD/CategoriasTelhado/categoriaTelhadoType";
import { listarCategoriasTelhados } from "@/requests/CRUD/CategoriasTelhado/listarCategoriaTelhado";
import { listarEstruturas } from "@/requests/CRUD/EstruturaFixacao/listarEstruturaFixacao";
import { IValueLabel } from "@/types/formInterfaces";
import { Alert, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import Input from "../../components/Forms/Input";

const TiposTelhado = ({ form, imgTelhados }: any) => {
  const [estruturas, setEstruturas] = useState(["Estrutura 1"]);
  const [optionsEstruturas, setOptionEstruturas] = useState<IValueLabel[]>([]);
  const [estruturaAtual, setEstruturaAtual] = useState(0);
  const [moduloExcedido, setModuloExcedido] = useState(false);
  const [telhados, setTelhados] = useState<TiposTelhadoProps[]>([]);
  const [telhadoSelecionado, setTelhadoSelecionado] = useState(-1);
  const [modulosPorLinha, setModulosPorLinha] = useState(
    Array(estruturas.length).fill("")
  );
  const { modulosNecessarios, telhadoEscolhido } = form.control._formValues;
  const [modulosAlert, setModulosAlert] = useState(false);
  const setValue = form.setValue;
  const [camposEstruturas, setCamposEstruturas] = useState([
    { suporte: "", numeroLinhas: "", modulosPorLinha: "" },
  ]);
  const [numeroEstruturas, setNumeroEstruturas] = useState(1);

  const handleSelectTelhado = (index: number) => {
    if (telhadoSelecionado === index) {
      setTelhadoSelecionado(-1);
    } else {
      setValue("telhadoEscolhido", index);
      setTelhadoSelecionado(index);
    }
  };

  useEffect(() => {
    setValue("telhadoEscolhido", 1);
    setTelhadoSelecionado(1);

    if (telhadoEscolhido) {
      setTelhadoSelecionado(telhadoEscolhido);
    }
    console.log(imgTelhados);

    listarCategoriasTelhados().then((res) => {
      setTelhados(res);
    });
    listarEstruturas().then((arr) => {
      setOptionEstruturas(
        arr.map((estrutura: any) => ({
          label: `${estrutura.nome_estrutura}`,
          value: `${estrutura.id_estrutura}`,
        }))
      );
    });

    const valueModulos = () => {
      const totalEstruturas = form.control._formValues.estruturas.length;
      let soma = 0;

      for (let i = 0; i < totalEstruturas; i++) {
        const { estruturas } = form.control._formValues;
        const numeroLinhas = estruturas[i].numeroLinhas;
        const modulosLinha = estruturas[i].modulosPorLinha;
        soma += Number(modulosLinha) * numeroLinhas;
      }
      if (soma >= modulosNecessarios) {
        setModuloExcedido(true);
      }
    };
    valueModulos();
  }, []);

  const ValidaModulos = (valorAtual: string, indexEstrutura: number) => {
    const novoEstado = [...modulosPorLinha];
    const { estruturas } = form.control._formValues;
    const valor = estruturas[indexEstrutura].numeroLinhas;
    novoEstado[indexEstrutura] = Number(valorAtual) * valor;

    setModulosPorLinha(novoEstado);
    const soma = novoEstado.reduce(
      (acumulador, valorAtual) => acumulador + valorAtual,
      0
    );

    if (soma >= modulosNecessarios) {
      setModuloExcedido(true);
      if (soma > modulosNecessarios) {
        setValue(`estruturas[${indexEstrutura}].modulosPorLinha`, "");
        const novoEstado = [...modulosPorLinha];
        novoEstado[indexEstrutura] = "";
        setModulosPorLinha(novoEstado);

        setModulosAlert(true);
        const timeout = setTimeout(() => {
          setModulosAlert(false);
        }, 4000);
        return () => {
          clearTimeout(timeout);
        };
      }
    } else {
      setModulosAlert(false);
      setModuloExcedido(false);
    }
  };

  const handleAddEstrutura = () => {
    if (!moduloExcedido) {
      const novaEstrutura = `Estrutura ${numeroEstruturas + 1}`;
      setEstruturas([...estruturas, novaEstrutura]);
      setCamposEstruturas([
        ...camposEstruturas,
        { suporte: "", numeroLinhas: "", modulosPorLinha: "" },
      ]);
      setNumeroEstruturas(numeroEstruturas + 1);
      setEstruturaAtual(estruturas.length);
    }
  };
  const handleRemoveEstrutua = (index: number) => {
    const novosCamposEstruturas = [...camposEstruturas];
    novosCamposEstruturas.splice(index, 1);

    form.control._formValues.estruturas.splice(index, 1);
    const novasEstruturas = [...estruturas];
    novasEstruturas.splice(index, 1);

    setEstruturas(novasEstruturas);
    setCamposEstruturas(novosCamposEstruturas);

    setNumeroEstruturas(numeroEstruturas - 1);
    if (index === estruturaAtual && estruturas.length > 0) {
      setEstruturaAtual(index - 1);
    }
  };

  return (
    <>
      <div className="grid gap-2 mt-3">
        <p className="text-lg">
          Tipos de <span className="font-bold">Telhados</span>
        </p>
        <Container>
          <div className="grid md:flex gap-3  text-center">
            {telhados &&
              telhados.map((telhado, index) => {
                const Image = imgTelhados[index + 1];
                return (
                  <div
                    onClick={() =>
                      handleSelectTelhado(telhado.id_categoria_telhado)
                    }
                    key={index}
                    className={`h-12 relative bg-white flex items-center border-[1px] cursor-pointer ${
                      telhadoSelecionado === telhado.id_categoria_telhado ||
                      telhadoEscolhido === telhado.id_categoria_telhado
                        ? "border-success"
                        : "hover:border-success border-stroke"
                    }  py-4 gap-4 px-4 rounded-md`}
                  >
                    <span
                      className={`absolute  top-0 right-0 transform translate-x-[30%]  -translate-y-1/3 text-success text-xl bg-white rounded-xl p-[2px]`}
                    >
                      {telhadoSelecionado === telhado.id_categoria_telhado && (
                        <BsPatchCheckFill size={23} />
                      )}
                    </span>
                    <img src={Image} className="w-14" alt="" />
                    {telhado.nome_categoria_telhado}
                  </div>
                );
              })}
          </div>
        </Container>
        <Divider />
        <div className="flex items-center justify-between">
          <p className="text-lg">
            Tipos de <span className="font-bold">Estrutura</span>
          </p>
          <InputGroup align="end">
            <Tooltip
              title={`${
                moduloExcedido
                  ? "O limite de módulos atingido"
                  : "Adiciona mais estruturas"
              }`}
            >
              <Button
                onClick={handleAddEstrutura}
                disabled={moduloExcedido}
                className="bg-success flex items-center gap-1"
              >
                <AiOutlinePlus />
                Adicionar Estrutura
              </Button>
            </Tooltip>
          </InputGroup>
        </div>
        <Container className="w-full">
          <div className="flex justify-between">
            <div className="grid-cols-2 grid md:flex gap-3 mb-9">
              {estruturas &&
                estruturas.map((estrutura, index) => {
                  return (
                    <div className="w-fit" key={index}>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setEstruturaAtual(index)}
                          className="bg-black text-white p-1 px-4 rounded-lg"
                        >
                          {estrutura}
                        </button>
                        {index != 0 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveEstrutua(index)}
                            className="absolute -top-1 -right-1 bg-danger text-xs text-white w-4 h-4 rounded-full flex items-center justify-center"
                          >
                            <GrFormClose />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="grid  justify-end">
              <span>Módulos necessários: {modulosNecessarios}</span>
              {/* <span>Qtd de módulos digitada: {modulosDigitados}</span> */}
            </div>
          </div>

          {estruturas &&
            estruturas.map((_, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: index === estruturaAtual ? "block" : "none", // Show only the current structure
                  }}
                >
                  {modulosAlert && (
                    <Alert variant="outlined" severity="error">
                      A quantidade de módulos não deve ultrapassar a quantidade
                      de módulos necessários.
                    </Alert>
                  )}
                  <InputGroup>
                    <InputSelectComponent
                      label="Suporte da Estrutura"
                      width=""
                      name={`estruturas[${index}].suporte`}
                      options={optionsEstruturas}
                      formulario={form}
                    />
                    <Input
                      formulario={form}
                      name={`estruturas[${index}].numeroLinhas`}
                      label="Número de Linhas"
                      defaultValue="1"
                    />
                    <Input
                      formulario={form}
                      mascara="numerico"
                      onKeyUp={(e) =>
                        ValidaModulos(e.currentTarget.value, index)
                      }
                      name={`estruturas[${index}].modulosPorLinha`}
                      label="Módulos por Linha"
                    />
                  </InputGroup>
                </div>
              );
            })}
        </Container>
      </div>
    </>
  );
};

export default TiposTelhado;
