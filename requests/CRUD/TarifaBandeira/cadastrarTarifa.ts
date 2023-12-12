import { LinksunBackend } from "@/services/api";

export async function cadastrarTarifaBandeira(data: any) {
  const nomeDaFuncao = cadastrarTarifaBandeira.name;
  const response = await LinksunBackend.post(
    `/index.php?action=${nomeDaFuncao}&class=TarifaBandeira`,
    data
  );
  return response;
}
