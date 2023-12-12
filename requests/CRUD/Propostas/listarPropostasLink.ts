import { LinksunBackend } from "@/services/api";

export async function listarPropostasLink(token: any) {
    const nomeDaFuncao = listarPropostasLink.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=Propostas&Token=${token}`
    ).then((response) => response.body);
    return res;
}
