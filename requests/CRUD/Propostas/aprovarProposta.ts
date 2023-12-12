import { LinksunBackend } from "@/services/api";

export async function aprovarProposta(data: any) {
    const nomeDaFuncao = aprovarProposta.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Propostas`,
        data
    );
    return response;
}
