import { LinksunBackend } from "@/services/api";

export async function listarMaterial() {
    const nomeDaFuncao = listarMaterial.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=MaterialAdicional`
    ).then((response) => response.body);
    return res;
}
