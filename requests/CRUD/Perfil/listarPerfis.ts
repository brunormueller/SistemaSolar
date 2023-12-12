import { LinksunBackend } from "@/services/api";

export async function listarPerfis() {
    const nomeDaFuncao = listarPerfis.name;
    const res = await LinksunBackend.get(`?action=${nomeDaFuncao}&class=Perfil`).then((response) => response.body);
    return res;
}
