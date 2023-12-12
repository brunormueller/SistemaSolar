import { LinksunBackend } from "../../../services/api";

export async function cadastrarKit(data: any) {
    const nomeDaFuncao = cadastrarKit.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=KitManual`,
        data
    );
    return response;
}

// export async function listarPotenciaModulos() {
//   const parametro = { listarPotenciaModulos: true };
//   const { data } = await LinksunBackend.post(
//     "/classes/RequisicoesGerais.php",
//     parametro
//   );

//   return data;
// // }
export async function listarPotenciaModulos() {
    const nomeDaFuncao = listarPotenciaModulos.name;
    const tipos = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=RequisicoesGerais`
    );
    return tipos;
}
export async function listarInversores() {
    const nomeDaFuncao = listarInversores.name;
    const tipos = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=RequisicoesGerais`
    );
    return tipos;
}
