import { LinksunBackend } from "@/services/api";
import { IResponse } from "@/types/responseInterface";

export async function listarResultadosPesquisa(data: any) {
  const nomeDaFuncao = listarResultadosPesquisa.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=PesquisaSistema&search=${data}`
  ).then((response) => response.body);
  return response;
}
