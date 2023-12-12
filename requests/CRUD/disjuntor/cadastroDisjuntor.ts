import { LinksunBackend } from "../../../services/api";


export async function cadastrarDisjuntor(data: any) {
    const nomeDaFuncao = cadastrarDisjuntor.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Disjuntor`,
        data
    );
    return response;
}

export async function listarTipoFornecedor() {
    const nomeDaFuncao = listarTipoFornecedor.name;
    const tipos = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=Disjuntor`
    );
    return tipos;
}