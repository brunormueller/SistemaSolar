import { LinksunBackend } from "@/services/api";

export async function listarPrecosInstalacao() {
    const nomeDaFuncao = listarPrecosInstalacao.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=PrecosInstalacao`
    ).then((response) => response.body);
    return res;
}
