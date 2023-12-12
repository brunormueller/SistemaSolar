
import { LinksunBackend } from "@/services/api";



export async function cadastrarCliente(data: any) {
    const nomeDaFuncao = cadastrarCliente.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Clientes`,
        data
    );
    return response;
}

export async function cadastrarNovoContato(data: any) {
    const nomeDaFuncao = cadastrarNovoContato.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Clientes`,
        data
    );
    return response;
}

export async function listarOrigemCliente() {
    const nomeDaFuncao = listarOrigemCliente.name;
    const tipos = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=Clientes`
    ).then(res => res.body);
    return tipos;
}

export async function listarResponsavel() {
    const nomeDaFuncao = listarResponsavel.name;
    const tipos = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=Clientes`
    ).then(res => res.body);
    return tipos;
}
