import { LinksunBackend } from "@/services/api";

export async function listarSubestacoes() {
    const nomeDaFuncao = listarSubestacoes.name;
    const response = await LinksunBackend.get(`?action=${nomeDaFuncao}&class=Subestacoes`).then((res) => res.body);
    return response;
}
