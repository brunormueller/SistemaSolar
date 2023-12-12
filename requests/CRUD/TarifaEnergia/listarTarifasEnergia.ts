import { LinksunBackend } from "@/services/api";

export async function listarTarifasEnergia() {
    const nomeDaFuncao = listarTarifasEnergia.name;
    const res = await LinksunBackend.get(`?action=${nomeDaFuncao}&class=TarifasEnergia`).then((response) => response.body);
    return res;
}