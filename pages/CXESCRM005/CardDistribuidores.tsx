import photovoltaic from "@/public/images/cover/photovoltaic2.jpg";
import { listarKitsDistribuidores } from "@/requests/CRUD/ColetaDados/cadastroColetaDados";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsLightningChargeFill } from "react-icons/bs";
import { IoReturnUpBackOutline } from "react-icons/io5";
import LoaderSun from "../../components/common/Loader/LoaderSun";
import Combobox from "../CXESCRM002/kanbanProjeto/propostas/combobox";
// import { Combobox } from "../CXESCRM002/kanbanProjeto/propostas/combobox";

const Distribuidores = ({
  componentesKit,
  form,
}: {
  componentesKit: any[];
  // componentesKit: ComponenteItem[];
  form: any;
}) => {
  const [mouseOn, setMouseOn] = useState(false);
  const [kitSelecionado, setKitSelecionado] = useState(-1);
  const [visualizaInfo, setvisualizaInfo] = useState(-1);
  const [kitDistribuidores, setKitDistribuidores] = useState<any[]>([]);
  const [potenciaFiltro, setPotenciaFiltro] = useState<any[]>([]);
  const { modulosNecessarios, kitEscolhido } = form.control._formValues;
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [potenciaEscolhida, setPotenciaEscolhida] = useState(0);
  const [filteredDistribuidores, setFilteredDistribuidores] = useState<any[]>(
    []
  );
  useEffect(() => {
    setIsLoading(true);
    const getKitDistribuidores = async (modulos: any) => {
      listarKitsDistribuidores(modulos).then((res) => {
        setIsLoading(false);
        if (res?.componentes) {
          setKitDistribuidores(res.componentes);
          setPotenciaFiltro(
            Array.from(
              new Set(
                res.componentes.map(
                  (modulo: any) => modulo.potencia_kit_distribuidor
                )
              )
            ).map((uniqueValue) => ({
              value: uniqueValue,
              label: uniqueValue,
            }))
          );
        } else {
          setMsg(`Nennhum Kit`);
        }
      });
    };
    getKitDistribuidores(modulosNecessarios);
  }, []);
  const optionFrom = [
    { value: 1, label: "Distribuidores" },
    { value: 2, label: "Kit Manual" },
  ];
  const optionDistribuidor = [{ value: 1, label: "Bold" }];
  const handleSelectKit = (index: number) => {
    if (kitSelecionado === index) {
      setKitSelecionado(-1);
    } else {
      const setValue = form.setValue;
      console.log(kitDistribuidores[index]);

      setValue("kitEscolhido", [kitDistribuidores[index]]);
      setKitSelecionado(index);
    }
  };

  const handleFlip = (index: number) => {
    if (kitSelecionado === index) {
      setvisualizaInfo(-1);
    } else {
      setvisualizaInfo(index);
    }
  };
  const handleChangePotencia = (potencia: any) => {
    setPotenciaEscolhida(potencia);

    if (potenciaEscolhida === potencia) {
      potencia = "";
    }

    setFilteredDistribuidores(
      potencia !== ""
        ? kitDistribuidores.filter(
            (componente) => componente.potencia_kit_distribuidor === potencia
          )
        : kitDistribuidores
    );
  };
  const handleChangeDistribuidor = () => {};

  return (
    <Fragment>
      {isLoading ? (
        <div className="flex justify-center w-full ">
          <LoaderSun />
        </div>
      ) : (
        <>
          <div className="flex w-full gap-2 bg-white mb-3 rounded-sm p-2">
            <Combobox
              handleChange={handleChangePotencia}
              placeholder="Selecione uma potência"
              options={potenciaFiltro}
            />
            <Combobox
              //   handleChange={handleChange}
              placeholder="Distribuidor"
              options={optionFrom}
            />
            <Combobox
              handleChange={handleChangeDistribuidor}
              placeholder="Distribuidor"
              options={optionDistribuidor}
            />
          </div>
          {msg != "" && <p>{msg}</p>}
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
            {kitDistribuidores &&
              (filteredDistribuidores.length != 0
                ? filteredDistribuidores
                : kitDistribuidores
              ).map((item, index) => {
                return (
                  <div key={index} className="flex flex-col gap-9">
                    <div className="group">
                      <div
                        onClick={() => handleSelectKit(index)}
                        className={`rounded-md 
                        ${
                          !mouseOn && kitSelecionado === -1
                            ? "hover:border-meta-3 dark:hover:border-meta-3 border-white dark:border-strokedark dark:bg-boxdark"
                            : kitSelecionado === index
                            ? "border-meta-3"
                            : "border-stroke dark:border-strokedark dark:bg-boxdark"
                        }
                            [transform-style:preserve-3d] transition-all duration-500 relative ${
                              visualizaInfo === index &&
                              "[transform:rotateY(180deg)]"
                            }  cursor-pointer  border-2  bg-white shadow-default`}
                      >
                        <div className="inset-0">
                          <div className="relative">
                            <Image
                              alt="Modulo"
                              className="h-20"
                              src={photovoltaic}
                            />
                            <button
                              type="button"
                              onMouseLeave={() => setMouseOn(false)}
                              onMouseOver={() => setMouseOn(true)}
                              onClick={() => handleFlip(index)}
                              className="absolute top-0 border-bodydark hover:bg-bodydark1 right-0 rounded-e-md-md rounded-bl-md p-2 bg-white"
                            >
                              <AiOutlineInfoCircle />
                            </button>
                          </div>
                          <div className="grid p-3">
                            <span className="font-bold">Descrição do Kit:</span>
                            <div className="flex items-center">
                              <span>{item.descricao_kit_distribuidor}</span>
                              <div className="self-center rounded-lg mr-2 p-1 flex items-center border-bodydark text-white text-xs ml-17 bg-success">
                                <BsLightningChargeFill />
                                {item.potencia_kit_distribuidor}Wp
                              </div>
                            </div>
                          </div>
                          <div className="grid p-3">
                            <span className="font-bold">Componentes:</span>
                            <div className="flex items-center">
                              <div className="self-center rounded-lg mr-2 p-1   dark:text-boxdark-2">
                                {item.observacoes_kit_distribuidor}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 h-full w-full rounded-xl [transform:rotateY(180deg)] bg-white text-center text-slate-200 [backface-visibility:hidden] ">
                          <div className="flex gap-1 items-center">
                            <button
                              type="button"
                              className="hover:bg-bodydark1 p-2 rounded-br-md"
                              onMouseLeave={() => setMouseOn(false)}
                              onMouseOver={() => setMouseOn(true)}
                              onClick={() => handleFlip(index)}
                            >
                              <IoReturnUpBackOutline />
                            </button>
                            <p className="text-center flex-grow">
                              Componentes do Kit
                            </p>
                          </div>
                          <div className="p-2">
                            <div className="px-2 text-left w-full overflow-auto h-50">
                              {/*
                                {componentesKit && componentesKit.componentes.map((item, index) => {
                                    return (<p key={index}>· {item.descritivo_adicional}</p>)
                                })} */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Distribuidores;
