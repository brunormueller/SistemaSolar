import { LinksunBackend } from "@/services/api";

export async function listarIrradiacoesOrientacoes() {
    const nomeDaFuncao = listarIrradiacoesOrientacoes.name;
    const response = await LinksunBackend.get(`?action=${nomeDaFuncao}&class=IrradiacaoOrientacao`).then((res) => res.body);
    return response;
}
