import { LinksunBackend } from "@/services/api";

export async function enviarArquivo(data: FormData) {
  const nomeDaFuncao = enviarArquivo.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data,
    {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }
  ).then((response) => response.body);
  return response;
}
