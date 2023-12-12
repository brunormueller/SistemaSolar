import { LinksunBackend } from "@/services/api";

export async function listarMotivoNegocioPerdido() {
    const nomeDaFuncao = listarMotivoNegocioPerdido.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=Propostas`
    ).then((response) => response.body);
    return res;
}
