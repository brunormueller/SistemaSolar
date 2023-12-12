import { LinksunBackend } from "@/services/api";

export async function enviarLinkProposta(data: any) {
    const nomeDaFuncao = enviarLinkProposta.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Propostas`,
        data,
        { noToast: true }
    ).then((res) => res.body);
    return response;
}
