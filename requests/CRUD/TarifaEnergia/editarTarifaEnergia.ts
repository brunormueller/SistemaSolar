import { LinksunBackend } from "@/services/api";

export async function editarTarifaEnergia(data: any) {
    const nomeDaFuncao = editarTarifaEnergia.name;
    const res = await LinksunBackend.post(`?action=${nomeDaFuncao}&class=TarifasEnergia`, data).then((response) => response.body);
    return res;
}
