import { LinksunBackend } from "@/services/api";

export async function listarEstruturas() {
    const nomeDaFuncao = listarEstruturas.name;
    const response = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=EstruturaFixacao&teste=true`
    ).then((response) => response.body);
    return response;
}
