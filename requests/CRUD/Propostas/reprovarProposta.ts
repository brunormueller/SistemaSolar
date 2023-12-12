import { LinksunBackend } from "@/services/api";

export async function reprovarProposta(data: any) {
    const nomeDaFuncao = reprovarProposta.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Propostas`,
        data
    );
    return response;
}
