import { LinksunBackend } from "@/services/api";

export async function listarBanco() {
    const nomeDaFuncao = listarBanco.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=BancoRecebedor`
    ).then((response) => response.body);
    return res;
}
