import { LinksunBackend } from "@/services/api";

export async function cadastrarInstituicaoFinanceira(data: any) {
    const nomeDaFuncao = cadastrarInstituicaoFinanceira.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=InstituicaoFinanceira`,
        data
    );
    return response;
}
