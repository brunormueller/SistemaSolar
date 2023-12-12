import { LinksunBackend } from "@/services/api";

export async function editarKitManual(data: any) {
    const nomeDaFuncao = editarKitManual.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=KitManual`,
        data
    ).then((response) => response.body);
    return response;
}
