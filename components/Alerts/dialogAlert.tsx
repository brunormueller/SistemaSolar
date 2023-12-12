import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "../ui/button";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

type Tipo = "success" | "error" | "warning" | "info" | undefined;

interface IDialogAlertProps {
  open: boolean;
  onSave?: () => void;
  onClose?: () => void;
  onCreateProposta?: () => void;

  title: string;
  tipo: Tipo;
  message?: string;
}

const DialogAlert = ({
  open,
  onSave,
  onClose,
  onCreateProposta,
  title,
  tipo,
  message,
}: IDialogAlertProps) => {
  let icon = null;
  if (tipo === "success") {
    icon = <CheckCircle2 size={64} color="#00a854" />;
  } else if (tipo === "info") {
    icon = <Info size={64} color="#1890ff" />;
  } else if (tipo === "error") {
    icon = <XCircle size={64} color="#f04134" />;
  } else if (tipo === "warning") {
    icon = <AlertTriangle size={64} color="#fccf03" />;
  }

  return (
    <Modal
      style={{ zIndex: 9999 }}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className={`absolute dark:bg-black bg-white top-1/2 left-1/2 max-h-[90%]  -translate-x-2/4 -translate-y-2/4 p-5 px-7 rounded-md w-96`}
      >
        <form>
          <header>
            <div className="flex justify-center">
              <div className="grid justify-items-center	">
                {icon}
                <p className="font-medium text-title-sm mt-2 dark:text-stroke text-black">
                  {title}
                </p>
              </div>
            </div>
          </header>
          <div className="my-7 px-4 dark:text-stroke">{message}</div>
          <footer>
            <div className="flex justify-end gap-1">
              <button
                className="bg-body text-white rounded-md text-sm py-2 px-4"
                onClick={onClose}
                type="button"
              >
                Cancelar
              </button>
              <button
                className="bg-success text-white rounded-md text-sm py-2 px-4"
                onClick={onSave}
                type="button"
              >
                Salvar
              </button>

              {/* {onCreateProposta && (
                <button
                  className="bg-primary text-white rounded-md text-sm py-2 px-4"
                  onClick={onCreateProposta}
                  type="button"
                >
                  Criar Proposta
                </button>
              )} */}
            </div>
          </footer>
        </form>
      </Box>
    </Modal>
  );
};

export default DialogAlert;
