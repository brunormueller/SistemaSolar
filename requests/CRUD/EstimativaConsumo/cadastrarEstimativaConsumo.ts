import { LinksunBackend } from "../../../services/api";

export async function cadastrarEstimativaConsumo(data: any) {
    const nomeDaFuncao = cadastrarEstimativaConsumo.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=EstimativaConsumo`,
        data
    );
    return response;
}


