import { LinksunBackend } from "@/services/api";

export async function cadastrarInversor(data: any) {
    const nomeDaFuncao = cadastrarInversor.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Inversor`,
        data
    );
    return response;
}
