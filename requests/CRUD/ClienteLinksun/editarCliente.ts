import { LinksunBackend } from "@/services/api";

export async function editarCliente(data: any) {
    const nomeDaFuncao = editarCliente.name;
    const orientacoes = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=ClienteLinksun`,
        data
    ).then((response) => response.body);
    return orientacoes;
}
