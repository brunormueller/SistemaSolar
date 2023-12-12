import { LinksunBackend } from "@/services/api";

export async function cadastrarRegional(data: any) {
  const nomeDaFuncao = cadastrarRegional.name;
  const response = await LinksunBackend.post(
    `/index.php?action=${nomeDaFuncao}&class=Regionais`,
    data
  );
  return response;
}
