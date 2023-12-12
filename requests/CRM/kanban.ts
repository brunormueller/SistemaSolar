import { LinksunBackend } from "@/services/api";

export async function listarKanban(data: any) {
  const nomeDaFuncao = listarKanban.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban&request_body=${data}`
  ).then((response) => response.body);
  return response;
}
export async function listarDadosFunil(data: any) {
  const nomeDaFuncao = listarDadosFunil.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban&id_kanban=${data}`
  ).then((response) => response.body);
  return response;
}
export async function listarConfiguracoesAnexos() {
  const nomeDaFuncao = listarConfiguracoesAnexos.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban`
  ).then((response) => response.body);
  return response;
}
export async function novaLista(data: any) {
  const nomeDaFuncao = novaLista.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
  return response;
}
export async function atualizarDadosKanban(data: any) {
  const nomeDaFuncao = atualizarDadosKanban.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
}
export async function cadastroNovoCard(data: any) {
  const nomeDaFuncao = cadastroNovoCard.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
  return response;
}
export async function listarTodosKanbans() {
  const nomeDaFuncao = listarTodosKanbans.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban`
  ).then((response) => response.body);
  return response;
}
export async function criarNovoKanban(data: any) {
  const nomeDaFuncao = criarNovoKanban.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
  return response;
}
export async function excluirLista(data: any) {
  const nomeDaFuncao = excluirLista.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
  return response;
}
export async function listarEtiquetas() {
  const nomeDaFuncao = listarEtiquetas.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban`
  ).then((response) => response.body);
  return response;
}
export async function listarEtiquetasCard(data: any) {
  const nomeDaFuncao = listarEtiquetasCard.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban&request_body=${data}`
  ).then((response) => response.body);
  return response;
}
export async function cadastroEtiquetas(data: any) {
  const nomeDaFuncao = cadastroEtiquetas.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
  return response;
}
export async function cadastrarEtiquetasCard(data: any) {
  const nomeDaFuncao = cadastrarEtiquetasCard.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
  return response;
}
export async function listarDadosCard(id_card: any, id_cliente: any) {
  const nomeDaFuncao = listarDadosCard.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban&id_card=${id_card}&id_cliente=${id_cliente}`
  ).then((response) => response.body);
  return response;
}
export async function atualizarListasKanbans(data: any) {
  const nomeDaFuncao = atualizarListasKanbans.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
  return response;
}


export async function listarAutomatizacoes() {
  const nomeDaFuncao = listarAutomatizacoes.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=AutomatizacaoKanban`
  ).then(res=> res.body);
  return response;
}

export async function cadastrarAutomatizacao(data: any) {
  const nomeDaFuncao = cadastrarAutomatizacao.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=AutomatizacaoKanban`,
    data
  ).then(res=> res.body);
  return response;
}

export async function editarAutomatizacao(data: any) {
  const nomeDaFuncao = editarAutomatizacao.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=AutomatizacaoKanban`,
    data
  ).then(res=> res.body);
  return response;
}

export async function deletarAutomatizacao(data: any) {
  const nomeDaFuncao = deletarAutomatizacao.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=AutomatizacaoKanban`,
    data
  ).then(res=> res.body);
  return response;
}

export async function alterarListaDadosKanban(data: any) {
  const nomeDaFuncao = alterarListaDadosKanban.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  ).then(res=> res.body);
  return response;
}
