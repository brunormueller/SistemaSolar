import { LinksunBackend } from "@/services/api";

export async function listarPrecoProjeto() {
    const nomeDaFuncao = listarPrecoProjeto.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=PrecosProjeto`
    ).then((response) => response.body);
    return res;
}
