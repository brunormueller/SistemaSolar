import { LinksunBackend } from "@/services/api";

export async function editarEstruturaFixacao(data: any) {
    const nomeDaFuncao = editarEstruturaFixacao.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=EstruturaFixacao`,
        data
    ).then((response) => response.body);
    return response;
}
