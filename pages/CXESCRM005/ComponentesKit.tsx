import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Tooltip,
} from "@material-tailwind/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { HiOutlineDownload } from "react-icons/hi";
import { useEffect, useState } from "react";
import { ComponenteItem } from "@/types/coleta";
import { BsTrash3 } from "react-icons/bs";
import Input from "../../components/Forms/Input";
import { listarComponentesKit } from "@/requests/CRUD/ColetaDados/cadastroColetaDados";
import LoaderSun from "@/components/common/Loader/LoaderSun";
const kitFechado = 1;

const TABLE_HEAD = kitFechado
  ? ["Componente", , "Descrição", "Quantidade"]
  : ["Componente", "Preço", "Quantidade", "Total", ""];
interface ValorTotalComponente {
  [key: string]: number;
}
const ComponentesKit = ({
  componentesKit,
  form,
}: {
  componentesKit: ComponenteItem[];
  form: any;
}) => {
  const { kitEscolhido } = form.control._formValues;
  const [downloadableContent, setDownloadableContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [componentesKitDistribuidor, setComponentesKitDistribuidor] = useState<
    any[]
  >([]);
  const [valorTotalComponente, setValorTotalComponente] =
    useState<ValorTotalComponente>({});
  const [valorFinal, setValorFinal] = useState(0);
  const setValue = form.setValue;

  useEffect(() => {
    setLoading(true);
    listarComponentesKit(kitEscolhido[0].codItem_kit_distribuidor).then(
      (res) => {
        setLoading(false);

        setComponentesKitDistribuidor(res.componentesKit);
      }
    );
    const calcularSomaTotal = () => {
      let total = 0;

      for (const chave in valorTotalComponente) {
        if (valorTotalComponente.hasOwnProperty(chave)) {
          total += valorTotalComponente[chave];
        }
      }
      setValorFinal(total);
      const valorFormatado = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      setValue("valorFinalComponentes", valorFormatado);
    };

    calcularSomaTotal();
  }, [valorTotalComponente]);

  // const generateCSV = (componentes: ComponenteItem[]) => {
  //   const header = "Componente,Preço,Quantidade\n";
  //   const rows = componentes
  //     .map(
  //       ({
  //         descritivo_adicional,
  //         preco_venda_adicional,
  //         quantidade_adicional,
  //       }) => {
  //         return `${descritivo_adicional},${preco_venda_adicional},${quantidade_adicional}`;
  //       }
  //     )
  //     .join("\n");
  //   return header + rows;
  // };
  const handleDownload = () => {
    const blob = new Blob([downloadableContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "componentes.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center">
          <LoaderSun />
        </div>
      ) : (
        <Card className="h-full w-full px-2 md:px-0 rounded-none">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8  px-4 flex  items-center justify-between">
              <div className="w-35 md:w-full">
                <Typography variant="h5" color="blue-gray">
                  Componentes do Kit
                </Typography>
                <Typography
                  color="gray"
                  className="mt-1 font-normal text-xs md:text-base"
                >
                  Os componentes são referentes ao distribuidor selecionado
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col w-29 md:w-auto gap-2 sm:flex-row">
                <Button
                  variant="outlined"
                  className="text-xs text-meta-5 md:text-md"
                  size="sm"
                >
                  {kitEscolhido[0].nome_distribuidor}
                </Button>
                <Button
                  className="flex items-center gap-3 text-white text-xs md:text-md bg-black-2"
                  onClick={handleDownload}
                  size="sm"
                >
                  <HiOutlineDownload strokeWidth={2} className="h-4 w-4" />{" "}
                  Baixar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll md:overflow-hidden  px-3">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}{" "}
                        {index !== TABLE_HEAD.length - 1 && (
                          <ChevronUpDownIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {componentesKitDistribuidor &&
                  componentesKitDistribuidor
                    .filter((res) => res.qtd != null && res.qtd != 0)
                    .map((componente: any, index) => {
                      {
                        setValue(
                          `componente`,
                          componentesKitDistribuidor.filter(
                            (res) => res.qtd != null && res.qtd != 0
                          )
                        );
                      }

                      const isLast =
                        index === componentesKitDistribuidor.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {componente.nome}
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                                  {componente.categoria}
                                </Typography>
                              </div>
                            </div>
                          </td>

                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {setValue(
                                    `componente`,
                                    componentesKitDistribuidor
                                  )}
                                  {componente.descricao != null
                                    ? componente.descricao
                                    : "Sem descrição"}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {componente.qtd}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          {!kitFechado && (
                            <>
                              <td className={classes}>
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {Number(
                                      componente.preco_venda_adicional
                                    ).toLocaleString("pt-BR", {
                                      style: "currency",
                                      currency: "BRL",
                                    })}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    <Input
                                      formulario={form}
                                      onKeyUp={(e) => {
                                        const newValue = parseFloat(
                                          (e.target as HTMLInputElement).value
                                        );
                                        const total =
                                          componente.preco_venda_adicional *
                                          newValue;

                                        setValorTotalComponente(
                                          (prevState) => ({
                                            ...prevState,
                                            [componente.id_adicional]: total,
                                          })
                                        );
                                      }}
                                      className="h-9 text-center w-26 border-[1px] rounded-md"
                                      name={`componente[${componente.id_adicional}].qtd_componente`}
                                      defaultValue={`${componente.qtd}`}
                                      type="text"
                                    />
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {/* {valorTotalComponente[
      componente.id_adicional
    ].toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })} */}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <Tooltip content="Remover Componente">
                                  <button className="bg-danger rounded-md hover:drop-shadow-md text-sm gap-1 hover:bg-meta-1 p-1 flex items-center text-white">
                                    <BsTrash3 />
                                    Apagar
                                  </button>
                                </Tooltip>
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}
    </>
  );
};
export default ComponentesKit;
