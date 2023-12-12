import { LinksunBackend } from "@/services/api";

export async function cadastrarRegiaoVenda(data: any) {
    const nomeDaFuncao = cadastrarRegiaoVenda.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=RegiaoVenda`,
        data
    );
    return response;
}
