
import { LinksunBackend } from "@/services/api";

export async function editarInversores(data: any) {
    const nomeDaFuncao = editarInversores.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Inversor`,
        data
    ).then((response) => response.body);
    return response;
}
