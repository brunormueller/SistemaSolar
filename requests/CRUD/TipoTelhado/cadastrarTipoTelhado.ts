import { LinksunBackend } from "@/services/api";

export async function cadastrarTipoTelhado(data: any) {
    const nomeDaFuncao = cadastrarTipoTelhado.name;
    const response = await LinksunBackend.post(`/index.php?action=${nomeDaFuncao}&class=TipoTelhado`, data);
    return response;
}

