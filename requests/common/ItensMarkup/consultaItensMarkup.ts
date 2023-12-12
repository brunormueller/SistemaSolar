import { LinksunBackend } from "@/services/api";

export async function listarItensMarkup() {
    const nomeDaFuncao = listarItensMarkup.name;
    const response = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=ItensMarkup`
    );
    return response;
}
