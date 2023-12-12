import { LinksunBackend } from "@/services/api";

export async function listarClientes() {
    const nomeDaFuncao = listarClientes.name;
    const response = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=ClienteLinksun`
    ).then((response) => response.body);
    return response;
}