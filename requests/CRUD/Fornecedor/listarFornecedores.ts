import { LinksunBackend } from "@/services/api";

export interface IFornecedor {
    id_fornecedor: string;
    pessoa_fornecedor: string;
    razaosocial_fornecedor: string;
    inscestadual_fornecedor: string;
    nome_fornecedor: string;
    cpfcnpj_fornecedor: string;
    cep_fornecedor: string;
    rua_fornecedor: string;
    bairro_fornecedor: string;
    nro_fornecedor: string;
    comp_fornecedor: string;
    cidade_fornecedor: string;
    estado_fornecedor: string;
    telefone1_fornecedor: string;
    telefone2_fornecedor: string;
    email_fornecedor: string;
    status_fornecedor: string;
}

export async function listarFornecedores(): Promise<IFornecedor[]> {
    const fornecedores = await LinksunBackend.get(
        "?action=listarFornecedores&class=Fornecedores"
    ).then((response) => response.body);
    return fornecedores;
}
