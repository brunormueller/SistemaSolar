import { LinksunBackend } from "@/services/api";

export async function cadastrarPerdasMedias(data: any) {
    const nomeDaFuncao = cadastrarPerdasMedias.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=PerdasMedias`,
        data
    );
    return response;
}