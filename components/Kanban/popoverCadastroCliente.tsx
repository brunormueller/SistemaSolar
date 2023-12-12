import { listarClientes } from "@/requests/CRUD/Cliente/listarClientes";

import { Search, UserPlus } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import LoaderSun from "../common/Loader/LoaderSun";
import { listarCidadesPorNome } from "@/requests/common/EstadosCidades/estadosCidades";

const PopoverCadastroCliente = ({
  open,
  nomeDigitado,
  clienteSelecionado,
  clienteNovo,
}: any) => {
  const [clientes, setClientes] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setClientes([]);
    if (nomeDigitado.length >= 3) {
      setIsLoading(true);
      listarClientes(nomeDigitado).then((res) => {
        setIsLoading(false);
        setClientes(res);
      });
    }
  }, [nomeDigitado]);

  const handleSelectCliente = (index: any) => {
    clienteSelecionado(clientes[index]);
  };
  return (
    <Fragment>
      {open ? (
        <div
          className={`grid max-h-64 overflow-auto mt-2 rounded-md z-999999 bg-white absolute shadow-xl border-2 translate-y-19 transition-all ease-linear duration-200 w-3/4 md:w-1/3 open-state ${
            open ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
          }}`}
        >
          {isLoading && (
            <div className="flex justify-center h-18 my-5">
              <LoaderSun />
            </div>
          )}
          {nomeDigitado.length >= 3 ? (
            <>
              {!isLoading && (
                <p
                  onClick={() => clienteNovo(true)}
                  className="text-sm items-center flex font-semibold justify-center text-[#5788fd] cursor-pointer hover:bg-stroke gap-1 px-4 h-13"
                >
                  <UserPlus size={16} />
                  Cadastrar {nomeDigitado}
                </p>
              )}
              {clientes.length > 0 &&
                clientes.map((cliente: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => handleSelectCliente(index)}
                    className="grid my-1 px-3 h-15 cursor-pointer  hover:bg-stroke"
                  >
                    <p
                      onClick={handleSelectCliente}
                      className="text-sm items-center flex font-semibold  "
                    >
                      {cliente.nome_cliente}
                    </p>
                    <span className="text-sm">{cliente.telefone1_cliente}</span>
                  </div>
                ))}
            </>
          ) : (
            <p className="text-sm items-center flex font-semibold justify-center gap-1 px-4 h-13">
              <div className="bg-stroke p-2 rounded-md">
                <Search size={17} />
              </div>
              Digite ao menos 3 letras
            </p>
          )}
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

const PopoverCidadeCliente = ({
  open,
  nomeDigitado,
  clienteSelecionado,
  clienteNovo,
}: any) => {
  const [cidades, setCidades] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setCidades([]);
    if (nomeDigitado.length >= 3) {
      setIsLoading(true);
      console.log(nomeDigitado);

      listarCidadesPorNome(nomeDigitado).then((res) => {
        setIsLoading(false);
        setCidades(res);
      });
    }
  }, [nomeDigitado]);

  const handleSelectCliente = (index: any) => {
    clienteSelecionado(cidades[index]);
  };
  return (
    <Fragment>
      {open ? (
        <div
          className={`flex flex-col justify-center max-h-64 overflow-auto mt-2 rounded-md z-999999 bg-white absolute shadow-xl border-2 translate-y-19 transition-all ease-linear duration-200 w-3/4 md:w-1/3 open-state ${
            open ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
          }}`}
        >
          {isLoading && (
            <div className="flex justify-center h-18 my-5">
              <LoaderSun />
            </div>
          )}
          {nomeDigitado.length >= 3 ? (
            cidades.length > 0 &&
            cidades.map((cidade: any, index: number) => (
              <div
                key={index}
                onClick={() => handleSelectCliente(index)}
                className="grid my-1 px-3 h-15 cursor-pointer  hover:bg-stroke"
              >
                <p
                  onClick={handleSelectCliente}
                  className="text-sm items-center flex font-semibold  "
                >
                  {cidade.nome_cidade} - {cidade.uf_estado}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm items-center flex font-semibold justify-center gap-1 px-4 h-13">
              <div className="bg-stroke p-2 rounded-md">
                <Search size={17} />
              </div>
              Digite ao menos 3 letras
            </p>
          )}
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export { PopoverCadastroCliente, PopoverCidadeCliente };
