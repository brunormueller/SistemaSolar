import { LinksunBackend } from "@/services/api";

export async function loginCliente(data: any) {
    const nomeDaFuncao = loginCliente.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Propostas`,
        data
    );
    return response;
}
