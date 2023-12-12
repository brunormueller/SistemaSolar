import { LinksunBackend } from "@/services/api";

export async function listarTarifasBandeiras() {
    const nomeDaFuncao = listarTarifasBandeiras.name;
    const res = await LinksunBackend.get(`?action=${nomeDaFuncao}&class=TarifaBandeira`).then((response) => response.body);
    return res;
}
