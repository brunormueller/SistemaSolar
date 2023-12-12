// import { IResponse } from "../types/responseInterface";
import { LinksunBackend } from "@/services/api";

export async function listarEstimativaConsumoDireto() {
    const nomeDaFuncao = listarEstimativaConsumoDireto.name;
    const orientacoes = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=EstimativaConsumo`
    ).then((response) => response.body);
    return orientacoes;
}
