import { LinksunBackend } from "@/services/api";

export async function cadastrarUsuario(data: any) {
  const nomeDaFuncao = cadastrarUsuario.name;
  const response = await LinksunBackend.post(
    `/index.php?action=${nomeDaFuncao}&class=Usuario`,
    data
  );
  return response;
}

export async function cadastrarMenuFavorito(data: any, id_usuario: number) {
  const nomeDaFuncao = cadastrarMenuFavorito.name;
  const response = await LinksunBackend.post(
    `/index.php?action=${nomeDaFuncao}&class=Usuario&id_usuario=${id_usuario}`,
    data
  );
  return response;
}
