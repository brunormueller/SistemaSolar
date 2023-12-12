import { LinksunBackend } from "@/services/api";

export interface IRegiaoVenda {
    id_regiao_venda: string;
    nome_regiao_venda: string;
    tabCustoInst_regiao_venda: string;
    status_regiao_venda: string;
}

export async function editarRegiaoVenda(data: any) {
    const nomeDaFuncao = editarRegiaoVenda.name;
    const res = await LinksunBackend.post(`?action=${nomeDaFuncao}&class=RegiaoVenda`, data).then((response) => response.body);
    return res;
}
