import { LinksunBackend } from "@/services/api";

export async function listarInstituicao() {
    const nomeDaFuncao = listarInstituicao.name;
    const response = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=InstituicaoFinanceira`
    ).then((response) => response.body);
    return response;
}
