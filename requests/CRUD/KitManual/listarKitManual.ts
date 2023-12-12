import { LinksunBackend } from "@/services/api";

export async function listarKitsManual() {
    const nomeDaFuncao = listarKitsManual.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=KitManual`
    ).then((response) => response.body);
    console.log(res)
    return res;
}
