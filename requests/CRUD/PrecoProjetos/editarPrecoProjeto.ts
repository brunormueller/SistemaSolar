import { LinksunBackend } from "@/services/api";

export async function editarPrecoProjeto(data: any) {
    const nomeDaFuncao = editarPrecoProjeto.name;
    const res = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=PrecosProjeto`,
        data
    ).then((response) => response.body);
    return res;
}
