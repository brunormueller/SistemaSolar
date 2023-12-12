import { LinksunBackend } from "@/services/api";

export async function baixarProposta(data: any) {
    const nomeDaFuncao = baixarProposta.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Propostas`,
        data,
        { noToast: true }
    );
    return response;
}
