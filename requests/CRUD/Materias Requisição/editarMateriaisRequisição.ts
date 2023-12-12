import { LinksunBackend } from "@/services/api";

export async function editarMaterialRequisicao(data: any) {
    const nomeDaFuncao = editarMaterialRequisicao.name;
    const res = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=MaterialRequisicao`,
        data
    ).then((response) => response.body);
    return res;
}
