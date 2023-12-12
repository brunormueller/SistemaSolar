import { LinksunBackend } from "@/services/api";

export interface IDistribuidor {
  corrente_inversores1_kit_distribuidor: number;
  corrente_inversores2_kit_distribuidor: number;
  disjuntor_comercial_kit_distribuidor: number;
  id_kit_distribuidor: number;
  inversor1_kit_distribuidor: string;
  marca_inversor1_kit_distribuidor: string;
  modulos_kit_distribuidor: string;
  potencia_inversor_kit_distribuidor: number;
  potencia_modulo_kit_distribuidor: number;
  qtd_inversor1_kit_distribuidor: number;
  status_kit_distribuidor: number;
  valor_comercial_kit_distribuidor: number;
}

export async function listarKitDistribuidores(data: any) {
  const nomeDaFuncao = listarKitDistribuidores.name;

  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Distribuidor&request_body=${data}`
  );
  return response;
}

export async function cadastrarColetaDados(data: any) {
  const nomeDaFuncao = cadastrarColetaDados.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=ColetaDados`,
    data
  );
  return response;
}
export async function listarComponentes() {
  const nomeDaFuncao = listarComponentes.name;
  const orientacoes = await LinksunBackend.get(
    `/index.php?action=${nomeDaFuncao}&class=ComponentesKit`
  );
  return orientacoes;
}
export async function listarKitsDistribuidores(dados: any) {
  const nomeDaFuncao = listarKitsDistribuidores.name;
  const orientacoes = await LinksunBackend.get(
    `/index.php?action=${nomeDaFuncao}&class=ComponentesKit&qtdModulos=${dados}`
  ).then((res) => res.body);
  return orientacoes;
}
export async function listarComponentesKit(idKit: number) {
  const nomeDaFuncao = listarComponentesKit.name;
  const orientacoes = await LinksunBackend.get(
    `/index.php?action=${nomeDaFuncao}&class=ComponentesKit&idKit=${idKit}`
  ).then((res) => res.body);
  return orientacoes;
}
export async function camposPersonalizados(dados: any) {
  const response = await LinksunBackend.post("/classes/ColetaDados.php", dados);
  return response;
}

export async function verificaTelefone(data: any) {
  const nomeDaFuncao = verificaTelefone.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=ColetaDados&telefone=${data}`
  );
  return response;
}
