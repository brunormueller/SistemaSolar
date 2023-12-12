import { LinksunBackend } from "@/services/api";

export async function cadastrarPerfil(data: any) {
    const nomeDaFuncao = cadastrarPerfil.name;
    const res = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Perfil`,
        data
    ).then((response) => response.body);
    return res;
}
