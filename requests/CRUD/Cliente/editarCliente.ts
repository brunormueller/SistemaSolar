import { LinksunBackend } from "@/services/api";

export async function editarCliente(data: any) {
  const nomeDaFuncao = editarCliente.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Clientes`,
    data
  );
  return response;
}
