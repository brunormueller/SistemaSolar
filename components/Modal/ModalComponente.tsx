import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import React, { Fragment } from "react";
import { GrFormClose } from "react-icons/gr";
import { twMerge } from "tailwind-merge";
interface ModalProps {
  children: React.ReactNode;
  opened?: boolean;
  onClose?: () => void;
  onDeny?: () => void | undefined;
  saved?: any;
  size?: Size;
  hasSaveButton?: boolean;
  hasDenyButton?: boolean;
  hasCloseBtn?: boolean;
  hasForm?: boolean;
  denyButtonText?: string;
  className?: string;
  header?: string;
  typeButton?: string;
  defaultW?: any;
}

type Size = "xs" | "sm" | "md" | "lg" | "xl" | undefined;

export default function ModalComponente({
  onClose,
  onDeny,
  opened = false,
  children,
  saved,
  size,
  header,
  hasCloseBtn = true,
  hasForm = true,
  typeButton = "button",
  hasSaveButton = true,
  hasDenyButton = false,
  denyButtonText,
  className,
  defaultW = "w-96",
  ...props
}: ModalProps) {
  let sizeModal = "";

  switch (size) {
    case "xs":
      sizeModal = "w-48";
      break;
    case "sm":
      sizeModal = "w-95";
      break;
    case "md":
      sizeModal = "w-130";
      break;
    case "lg":
      sizeModal = "w-230";
      break;
    case "xl":
      sizeModal = "w-[1200px]";
      break;
    default:
      sizeModal = defaultW; // Deixei esse como default, mas pode ser alterado
      break;
  }
  const claasBoxModal = twMerge(
    `absolute dark:bg-black bg-white  ${
      sizeModal != "w-96"
        ? sizeModal
        : "lg:w-[90%] sm:w-[80%] max-[390px]:w-[90%] xs:w-[30%]"
    }  top-1/2 left-1/2 max-h-[90%] overflow-auto  -translate-x-2/4 -translate-y-2/4 pt-8 px-8 rounded-md`,
    className
  );
  return (
    <Fragment>
      <Modal
        {...props}
        style={{ zIndex: 9999 }}
        open={opened}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={claasBoxModal}>
          <div className="absolute  w-full flex  justify-between mb-9 top-0 right-0">
            {header ? (
              <p className="p-2 pl-5 text-black font-medium text-lg">
                {header}
              </p>
            ) : (
              <div></div>
            )}
            {hasCloseBtn && (
              <Button onClick={onClose}>
                <GrFormClose size={20} />
              </Button>
            )}
          </div>
          {hasForm ? (
            <form className="py-5">{children}</form>
          ) : (
            <div>{children}</div>
          )}
          <footer className="bottom-2 mt-3 sticky w-full">
            <div className="flex justify-end gap-1">
              {hasDenyButton && (
                <button
                  className="bg-body text-white rounded-md text-sm py-2 px-4"
                  onClick={onDeny}
                  type="button"
                >
                  {denyButtonText}
                </button>
              )}
              {hasSaveButton && (
                <button
                  className="bg-success text-white rounded-md text-sm py-2 px-4"
                  onClick={() => saved()}
                  type="button"
                >
                  Salvar mudanças
                </button>
              )}
            </div>
          </footer>
        </Box>
      </Modal>
    </Fragment>
  );
}
