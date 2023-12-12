import { LinksunBackend } from "@/services/api";

export async function editarMaterial(data:any) {
    const nomeDaFuncao = editarMaterial.name;
    const res = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=MaterialAdicional`,data
    ).then((response) => response.body);
    return res;
}
