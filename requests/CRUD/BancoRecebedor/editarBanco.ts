import { LinksunBackend } from "@/services/api";
export async function editarBanco(data: any) {
    const nomeDaFuncao = editarBanco.name;
    const res = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=BancoRecebedor`,
        data
    ).then((response) => response.body);
    return res;
}
