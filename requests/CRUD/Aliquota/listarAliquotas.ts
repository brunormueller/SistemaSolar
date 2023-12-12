import { LinksunBackend } from "@/services/api";

export async function listarAliquotas() {
    const nomeDaFuncao = listarAliquotas.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=Aliquota`
    ).then((response) => response.body);
    return res;
}
