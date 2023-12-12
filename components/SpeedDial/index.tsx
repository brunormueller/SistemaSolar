import { cadastrarAgendamento } from "@/requests/CRM/agenda";

import { GetForm } from "@/utils";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { CalendarPlus, EditIcon, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from "yup";
import NewDateScheduler from "../../pages/CXESCRM003/modalNewDateScheduler";
import ModalComponente from "../Modal/ModalComponente";
import NewContactScheduler from "./modalNewContactScheduler";
import Button from "../Forms/Button";
import { cadastrarNovoContato } from "@/requests/CRUD/Cliente/cadastroCliente";

const actions = [
  {
    icon: <UserPlus size={20} />,
    name: "Novo Contato",
  },
  { icon: <CalendarPlus />, name: "Novo Agendamento" },
];

export default function OpenIconSpeedDial({ opened }: any) {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const [eventSchema, setEventSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const { ...formEvent } = GetForm(eventSchema, setEventSchema);

  const [contactSchema, setContactSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const { ...formContact } = GetForm(contactSchema, setContactSchema);

  const handleOpenModal = (info: any) => {
    setModalType(info);
    setOpenModal(true);
  };

  const handleContact = (data: any) => {
    cadastrarNovoContato(data);
  };

  const handleEvent = (data: any) => {
    cadastrarAgendamento(data);
  };

  return (
    <Box
      sx={{
        height: "fit-content",
        width: "fit-content",
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        bottom: 10,
        right: 30,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{
          bottom: 16,
          right: -10,
          zIndex: "999999999999999999",
          color: "#43b4db",
        }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={() => handleOpenModal(action.name)}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>

      {modalType === "Novo Agendamento" && (
        <ModalComponente
          size="md"
          saved={formEvent.handleSubmit(handleEvent)}
          opened={openModal}
          onClose={() => setOpenModal(false)}
          header="Novo Agendamento"
        >
          <NewDateScheduler form={formEvent} />
        </ModalComponente>
      )}

      {modalType === "Novo Contato" && (
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
      )}
    </Box>
  );
}
