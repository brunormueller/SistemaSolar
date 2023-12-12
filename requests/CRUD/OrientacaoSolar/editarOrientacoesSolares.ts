import { LinksunBackend } from "@/services/api";

export async function editarOrientacoesSolares(data: any) {
    const nomeDaFuncao = editarOrientacoesSolares.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=OrientacoesSolar`,
        data
    ).then((response) => response.body);
    return response;
}
