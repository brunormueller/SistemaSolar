import { LinksunBackend } from "@/services/api";

export interface IEstado {
  id_estado: string;
  nome_estado: string;
  uf_estado: string;
}

export async function listarEstados() {
  const nomeDaFuncao = listarEstados.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Estado`
  ).then((response) => response.body);
  return response;
}

export interface ICidade {
  id_cidade: string;
  nome_cidade: string;
  estado_cidade: string;
}

export async function listarCidades() {
  const nomeDaFuncao = listarCidades.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Cidade`
  ).then((response) => response.body);
  return response;
}
export async function listarCidadesPorNome(nome: any) {
  const nomeDaFuncao = listarCidadesPorNome.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Cidade&nome=${nome}`
  ).then((response) => response.body);
  return response;
}

export async function listarCidadesComEstado() {
  const nomeDaFuncao = listarCidadesComEstado.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Cidade`
  ).then((response) => response.body);
  return response;
}
