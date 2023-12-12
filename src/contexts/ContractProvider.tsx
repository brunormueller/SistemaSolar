import { capitalizeMonth, getDateTimeBrasil } from "@/utils";
import { ReactNode, createContext, useContext } from "react";

interface IProviderProps {
  children: ReactNode;
}

interface IContractProviderData {
  relacionamentos: {
    name: string;
    text: string;
    relacionamento: any;
  }[];
  relacionar: (str: string, dadosCliente: any) => string;
}

const ContractContext = createContext({} as IContractProviderData);

// const card = {
//     "id": "29",
//     "index_card": 1,
//     "content": "João Vitor Marcelino",
//     "labels": [
//         null
//     ],
//     "responsaveis": "66",
//     "id_cliente": "36",
//     "nome_cliente": "João Vitor Marcelino",
//     "id_coleta_cliente": null,
//     "cidade_cliente": "Laranjal do Jari",
//     "estado_cliente": "AP",
//     "telefone1_cliente": "(47) 99267-3757",
//     "descricao": null,
//     "mostraValor": 0,
//     "urgencia": null,
//     "etiquetas": [],
//     "datahora": "2023-11-17 11:42:24"
// }

const cliente = {
  id_cliente: "36",
  pessoa_cliente: "",
  razaosocial_cliente: "",
  fantasia_cliente: null,
  inscestadual_cliente: "",
  nome_cliente: "João Vitor Marcelino",
  cpfcnpj_cliente: null,
  rg_cliente: null,
  nasc_abertura_cliente: null,
  responsavel_cliente: "66",
  cep_cliente: "",
  rua_cliente: "",
  bairro_cliente: "",
  nro_cliente: "",
  comp_cliente: "",
  cidade_cliente: "Laranjal do Jari",
  estado_cliente: "AP",
  telefone1_cliente: "(47) 99267-3757",
  telefone2_cliente: "",
  email_cliente: null,
  pasta_cliente: "",
  origem_cliente: "2",
  representante_cliente: "0",
  status_cliente: "1",
  is_contato_cliente: null,
};

export const ContractProvider = ({ children }: IProviderProps) => {
  const relacionamentos = [
    {
      name: "contratante",
      text: "Nome do cliente do contrato",
      relacionamento: "nome_cliente",
    },
    {
      name: "fiador",
      text: "Nome do fiador",
      relacionamento: "nome_cliente",
    },
    {
      name: "contratante_cpf",
      text: "CPF do cliente do contrato",
      relacionamento: "cpfcnpj_cliente",
    },
    {
      name: "fiador_cpf",
      text: "CPF do fiador",
      relacionamento: "nome_cliente",
    },
    {
      name: "numero_contrato",
      text: "Número do contrato",
      relacionamento: "nome_cliente",
    },
    {
      name: "revisao_contrato",
      text: "Revisão do contrato",
      relacionamento: "nome_cliente",
    },
    {
      name: "empresa",
      text: "Nome da empresa contratante",
      relacionamento: "nome_cliente",
    },
    {
      name: "data_atual",
      text: "Data atual",
      relacionamento: capitalizeMonth(
        getDateTimeBrasil({
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: undefined, // Define a hora como undefined para excluí-la
          minute: undefined, // Define os minutos como undefined para excluí-los
          second: undefined, // Define os segundos como undefined para excluí-los
        })
      ),
    },
    {
      name: "dia_numero",
      text: "Numero do dia atual",
      relacionamento: "nome_cliente",
    },
    {
      name: "mes_numero",
      text: "Numero do mês atual",
      relacionamento: "nome_cliente",
    },
    {
      name: "mes_extenso",
      text: "Mês atual escrito por extenso",
      relacionamento: "nome_cliente",
    },
    {
      name: "ano_numero",
      text: "Numero do ano atual",
      relacionamento: "nome_cliente",
    },
    {
      name: "equipamento",
      text: "Equipamento fornecido",
      relacionamento: "nome_cliente",
    },
    {
      name: "valor_entrada_pagamento",
      text: "Valor de entrada",
      relacionamento: "nome_cliente",
    },
    {
      name: "saldo_pagamento",
      text: "Valor de entrada",
      relacionamento: "nome_cliente",
    },
  ];

  function relacionar(str: string, dadosCliente: any): string {
    relacionamentos.map((relacionamento) => {
      let dadoRelacional = dadosCliente[relacionamento.relacionamento];
      dadoRelacional = dadoRelacional
        ? dadoRelacional
        : relacionamento.relacionamento;
      str = str.replaceAll(`{${relacionamento.name}}`, dadoRelacional);
    });
    return str;
  }

  return (
    <ContractContext.Provider value={{ relacionamentos, relacionar }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => {
  return useContext(ContractContext);
};
