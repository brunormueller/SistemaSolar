import { LinksunBackend } from "@/services/api";

export async function editarModulos(data: any) {
    const nomeDaFuncao = editarModulos.name;
    const res = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Modulos`,
        data
    ).then((response) => response.body);
    return res;
}
