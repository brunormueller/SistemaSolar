export async function listarTabelaCustoInstalacao() {
    // fazer a requisição para a api
    const retorno = await new Promise<any[]>((resolve, reject) => {
       resolve([
            { id: "1", name: "Tabela 1" },
            { id: "2", name: "Tabela 2" },
            { id: "3", name: "Tabela 3" },
            { id: "4", name: "Tabela 4" },
        ])
    })
    return retorno;
}
