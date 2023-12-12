import { LinksunBackend } from "../../services/api";

export async function listarUsuario() {
  const nomeDaFuncao = listarUsuario.name;
  const tipos = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Agenda`
  ).then((response)=>response.body);
  return tipos;
}

export async function listarCliente() {
  const nomeDaFuncao = listarCliente.name;
  const tipos = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Agenda`
  ).then((response)=>response.body);
  return tipos;
}

export async function cadastrarAgendamento(data:any) {
  const nomeDaFuncao = cadastrarAgendamento.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Agenda`,
    data
  );
  return response;
}

export async function editarAgendamento(data:any) {
  const nomeDaFuncao = editarAgendamento.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Agenda`,
    data
  );
  return response;
}


export async function apagarAgendamento(data:any) {
  const nomeDaFuncao = apagarAgendamento.name;
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Agenda`,
    data
  );
  return response;
}

export async function listarAgendamentos(idUsuario: any) {
  const nomeDaFuncao = listarAgendamentos.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Agenda&idUsuario=${idUsuario}`
  ).then((response) => response.body);
  return response;
}

export async function listarAgendamentosUsuarios() {
  const nomeDaFuncao = listarAgendamentosUsuarios.name;
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Agenda`
  ).then((response) => response.body);
  return response;
}


// export async function GravaLogAgenda() {
//   const nomeDaFuncao = GravaLogAgenda.name;
//   const response = await LinksunBackend.get(
//     `?action=${nomeDaFuncao}&class=Agenda`
//   ).then((response) => response.body);
//   return response;
// }