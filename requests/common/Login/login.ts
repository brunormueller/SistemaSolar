import { LinksunBackend } from "@/services/api";

export async function login(data: any) {
    const nomeDaFuncao = login.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Login`,
        data
    ).then((response) => response.body);
    return response;
}

export async function enviarEmail(data: any) {
    const nomeDaFuncao = enviarEmail.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=RecuperarSenha`,
        data
    ).then((response) => response.body);
    return response;
}
export async function verificaCodigoEmail(data: any) {
    const nomeDaFuncao = verificaCodigoEmail.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=RecuperarSenha`,
        data
    ).then((response) => response.body);
    return response;
}
export async function criarNovaSenha(data: any) {
    const nomeDaFuncao = criarNovaSenha.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=RecuperarSenha`,
        data
    ).then((response) => response.body);
    return response;
}
