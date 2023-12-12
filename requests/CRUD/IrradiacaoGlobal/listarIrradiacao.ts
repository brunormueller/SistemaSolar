import { LinksunBackend } from "@/services/api";

export async function listarIrradiacao() {
    const nomeDaFuncao = listarIrradiacao.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=IrradiacaoGlobal`
    ).then((response) => response.body);
    return res;
}
