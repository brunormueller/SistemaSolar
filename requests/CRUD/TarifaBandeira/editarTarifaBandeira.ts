import { LinksunBackend } from "@/services/api";

export async function editarTarifaBandeira(data: any) {
    const nomeDaFuncao = editarTarifaBandeira.name;
    const res = await LinksunBackend.post(`?action=${nomeDaFuncao}&class=TarifaBandeira`, data).then((response) => response.body);
    return res;
}
