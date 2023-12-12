import { LinksunBackend } from "@/services/api";

export async function editarSubestacao(data: any) {
  const nomeDaFuncao = editarSubestacao.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Subestacoes`,
    data
  );
  return response;
}
