import { LinksunBackend } from "@/services/api";

export async function resetarSenhaUsuario(data: any) {
    const nomeDaFuncao = resetarSenhaUsuario.name;
    const res = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Usuario`,
        data
    ).then((response) => response.body);
    return res;
}
