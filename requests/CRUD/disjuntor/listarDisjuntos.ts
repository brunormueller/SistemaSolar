import { LinksunBackend } from "@/services/api";

export async function listarDisjuntor() {
    const nomeDaFuncao = listarDisjuntor.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=Disjuntor`
    ).then((response) => response.body);
    return res;
}
