import { LinksunBackend } from "../../../services/api";

export async function cadastrarBancoRecebedor(data: any) {
    const nomeDaFuncao = cadastrarBancoRecebedor.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=BancoRecebedor`,
        data
    );
    return response;
}