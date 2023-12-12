import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Forms/Button";
import Container from "@/components/Forms/Container";
import ModalComponente from "@/components/Modal/ModalComponente";
import ReactTable from "@/components/ReactTable/ReactTable";
import NewContactScheduler from "@/components/SpeedDial/modalNewContactScheduler";
import { cadastrarNovoContato } from "@/requests/CRUD/Cliente/cadastroCliente";
import { editarCliente } from "@/requests/CRUD/Cliente/editarCliente";
import { listarContatos } from "@/requests/CRUD/Cliente/listarClientes";
import { listarUsuarios } from "@/requests/CRUD/Usuario/listarUsuarios";
import { FormatFields } from "@/utils";
import { Plus } from "lucide-react";
import { useState } from "react";

const ConsultaContato = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [tableKey, setTableKey] = useState(0); // Chave única para forçar a reconstrução do componente

  const rebuildComponent = () => {
    setTableKey((prevKey) => prevKey + 1); // Incrementa a chave para reconstruir o componente
  };

  const handleContact = (data: any) => {
    cadastrarNovoContato(data).then(() => {
      rebuildComponent();
      setOpenModal(false);
    });
  };

  const columns = [
    {
      header: "ID",
      accessorKey: "id_cliente",
    },
    {
      header: "Representante",
      accessorKey: "responsavel_cliente",
    },
    {
      header: "Status",
      accessorKey: "status_cliente",
    },
    {
      header: "Nome",
      accessorKey: "nome_cliente",
    },
    {
      header: "Telefone",
      accessorKey: "telefone1_cliente",
    },
    {
      header: "Email",
      accessorKey: "email_cliente",
    },
    {
      header: "Cidade",
      accessorKey: "cidade_cliente",
    },
    {
      header: "Estado",
      accessorKey: "estado_cliente",
    },
  ];

  const sendEditarContato = async (data: any) => {
    data["nome_cliente"] = FormatFields.desformatarNumeros(
      data["nome_cliente"]
    );
    data["email_cliente"] = FormatFields.desformatarNumeros(
      data["email_cliente"]
    );
    return editarCliente(data);
  };
  const formatedView = async (arr: any) => {
    let usuariosData: any[] = [];

    if (usuarios[0] == undefined) {
      await listarUsuarios().then((res) => {
        setUsuarios(res);
        usuariosData = res;
      });
    } else {
      usuariosData = usuarios;
    }

    return arr.map((e: any) => {
      e["responsavel_cliente"] = usuariosData.find(
        (usuario) => usuario.id_usuario == e["responsavel_cliente"]
      )?.nome_usuario;

      return e;
    });
  };
  return (
    <>
      <Breadcrumb pageName="Consulta de Contatos" />
      <Container>
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() => setOpenModal(true)}
            className="w-50 flex justify-end  bg-primary font-medium items-center gap-2 h-fit rounded-xl mb-5"
          >
            <Plus size={20} />
            Adicionar Contatos
          </Button>
        </div>
        <ReactTable
          key={tableKey} // A chave única que controla a reconstrução do componente
          columns={columns}
          // formatFunction={sendEditarContato}
          listFunction={listarContatos}
          idCol="id_cliente"
          isActiveCol="status_cliente"
          canEdit
          modalWidth={"w-180"}
          formatFunction={formatedView}
          editFunction={sendEditarContato}
          canDesactive
          createFunction={cadastrarNovoContato}
          Form={NewContactScheduler}
          canNotCreate={true}
          pageName="Contato"
        />
        <ModalComponente
          size="md"
          hasForm={false}
          // saved={formContact.handleSubmit(handleContact)}
          header="Cadastrar Novo Contato"
          opened={openModal}
          onClose={() => setOpenModal(false)}
          hasSaveButton={false}
        >
          <NewContactScheduler
            hasGerarProposta={true}
            onSubmitFunction={handleContact}
          >
            <Button>Salvar</Button>
          </NewContactScheduler>
        </ModalComponente>
      </Container>
    </>
  );
};

export default ConsultaContato;
