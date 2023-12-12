import { LinksunBackend } from "@/services/api";

export async function editarRegional(data: any) {
  const nomeDaFuncao = editarRegional.name;
  const response = await LinksunBackend.post(
    `/index.php?action=${nomeDaFuncao}&class=Regionais`,
    data
  );
  return response;
}
