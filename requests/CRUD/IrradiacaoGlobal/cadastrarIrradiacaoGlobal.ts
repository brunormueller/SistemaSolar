import { LinksunBackend } from "@/services/api";

export async function cadastrarIrradiacaoGlobal(data: any) {
    const nomeDaFuncao = cadastrarIrradiacaoGlobal.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=IrradiacaoGlobal`,
        data
    );
    return response;
}
