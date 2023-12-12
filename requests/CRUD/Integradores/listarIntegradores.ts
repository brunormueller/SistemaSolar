import { LinksunBackend } from "@/services/api";

export async function listarIntegradores() {
    const nomeDaFuncao = listarIntegradores.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=Integradores`
    ).then((response) => response.body);
    return res;
}
