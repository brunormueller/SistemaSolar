import { LinksunBackend } from "@/services/api";

export async function listarOrientacoesSolares() {
    const nomeDaFuncao = listarOrientacoesSolares.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=OrientacoesSolar`
    ).then((response) => response.body);
    return res;
}
