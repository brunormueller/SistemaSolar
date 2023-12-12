import { LinksunBackend } from "@/services/api";

export async function cadastrarSubestacao(data: any) {
  const nomeDaFuncao = cadastrarSubestacao.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Subestacoes`,
    data
  );
  return response;
}
