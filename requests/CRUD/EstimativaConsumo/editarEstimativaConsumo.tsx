// import { IResponse } from "../types/responseInterface";
import { LinksunBackend } from "@/services/api";

export async function editarEstimativaConsumoDireto(data: any) {
    const nomeDaFuncao = editarEstimativaConsumoDireto.name;
    const orientacoes = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=EstimativaConsumo`,
        data
    ).then((response) => response.body);
    return orientacoes;
}
