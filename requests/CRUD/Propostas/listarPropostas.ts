import { LinksunBackend } from "@/services/api";

export async function listarPropostas(idColeta: any) {
  const nomeDaFuncao = listarPropostas.name;
  const res = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Propostas&idCliente=${idColeta}`
  ).then((response) => response.body);
  return res;
}
