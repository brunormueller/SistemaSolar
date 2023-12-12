import { LinksunBackend } from "@/services/api";

export async function listarEmpresas() {
    const nomeDaFuncao = listarEmpresas.name;
    const res = await LinksunBackend.get(`?action=${nomeDaFuncao}&class=Empresa`).then((response) => response.body);
    return res;
}
