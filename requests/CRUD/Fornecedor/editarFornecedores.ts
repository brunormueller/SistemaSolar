import { LinksunBackend } from "@/services/api";

export async function editarFornecedores(data: any) {
    const fornecedores = await LinksunBackend.post(
        "?action=editarFornecedores&class=Fornecedores",
        data
    ).then((response) => response.body);
    return fornecedores;
}
