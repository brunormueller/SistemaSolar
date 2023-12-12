import { LinksunBackend } from "@/services/api";

export async function editarUsuario(data: any) {
    const nomeDaFuncao = editarUsuario.name;
    const res = await LinksunBackend.post(`?action=${nomeDaFuncao}&class=Usuario`, data).then((response) => response.body);
    return res;
}
