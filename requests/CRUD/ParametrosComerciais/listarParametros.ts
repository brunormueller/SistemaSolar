import { LinksunBackend } from "@/services/api";

export async function listarParametros() {
    const nomeDaFuncao = listarParametros.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=ParametrosComerciais`
    ).then((response) => response.body);
    return res;
}
