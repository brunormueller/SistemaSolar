import { LinksunBackend } from "@/services/api";
export async function editarAliquota(data: any) {
    const nomeDaFuncao = editarAliquota.name;
    const res = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Aliquota`,
        data
    ).then((response) => response.body);
    return res;
}
