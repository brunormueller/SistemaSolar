import { LinksunBackend } from "@/services/api";

export async function listarRegioesVenda() {
    const nomeDaFuncao = listarRegioesVenda.name;
    const res = await LinksunBackend.get(`?action=${nomeDaFuncao}&class=RegiaoVenda`).then((response) => response.body);
    return res;
}
