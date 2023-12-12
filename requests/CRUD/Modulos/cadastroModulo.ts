import { LinksunBackend } from "../../../services/api";


export async function cadastrarModulo(data: any) {
    const nomeDaFuncao = cadastrarModulo.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Modulos`,
        data
    );
    return response;
}