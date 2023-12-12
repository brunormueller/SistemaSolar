import { LinksunBackend } from "@/services/api";

export async function cadastrarMaterialAdicional(data: any) {
    const nomeDaFuncao = cadastrarMaterialAdicional.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=MaterialAdicional`,
        data
    );
    return response;
}