import { LinksunBackend } from "@/services/api";

export async function editarIrradiacao(data: any) {
    const nomeDaFuncao = editarIrradiacao.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=IrradiacaoGlobal`,
        data
    ).then((response) => response.body);
    return response;
}
