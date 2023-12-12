import { LinksunBackend } from "@/services/api";

export async function editarPerdasMedias(data: any) {
    const nomeDaFuncao = editarPerdasMedias.name;
    const res = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=PerdasMedias`,
        data
    ).then((response) => response.body);
    return res;
}
