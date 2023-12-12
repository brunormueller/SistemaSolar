import { LinksunBackend } from "@/services/api";

export async function cadastrarMateriaisRequisicao(data: any) {
    const nomeDaFuncao = cadastrarMateriaisRequisicao.name;
    const res = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=MaterialRequisicao`,
        data
    ).then((response) => response.body);
    return res;
}
