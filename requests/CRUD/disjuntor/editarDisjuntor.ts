import { LinksunBackend } from "@/services/api";
export async function editarDisjuntor(data: any) {
    const nomeDaFuncao = editarDisjuntor.name;
    const res = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Disjuntor`,
        data
    ).then((response) => response.body);
    return res;
}
