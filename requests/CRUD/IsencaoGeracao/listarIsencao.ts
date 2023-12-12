import { LinksunBackend } from "@/services/api";

export async function listarIsencao() {
    const nomeDaFuncao = listarIsencao.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=IsencaoGeracao`
    ).then((response) => response.body);
    return res;
}
