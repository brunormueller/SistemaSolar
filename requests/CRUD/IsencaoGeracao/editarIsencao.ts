import { LinksunBackend } from "@/services/api";

export async function editarIsencao(data: any) {
    const nomeDaFuncao = editarIsencao.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=IsencaoGeracao`,
        data
    ).then((response) => response.body);
    return response;
}
