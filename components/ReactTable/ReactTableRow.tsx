import { flexRender } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { MdEdit, MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";
import Button from "../Forms/Button";
import ModalReact from "../Modal/ModalReact";

const ReactTableRow = ({
  row,
  canEdit,
  canDesactive,
  canRefresh,
  isActiveCol,
  idCol,
  editFunction,
  listFunction,
  refreshFunction,
  Form,
  setData,
  disabledFields,
  pageName,
  modalWidth,
}: any) => {
  // const isActive = Boolean(+row.original[isActiveCol]);
  const isActive = row.original[isActiveCol] == "Ativo";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModalEdiStatus, setOpenModalEdiStatus] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<any>({});
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(false);
  }, [isActive]);

  function openEdit(oldData: any) {
    setDefaultValues(oldData);
    setOpenModalEdit(true);
  }

  const openEdiStatus = (oldData: any) => {
    setDefaultValues(oldData);
    setOpenModalEdiStatus(true);
  };
  const refresh = (data: any) => {
    refreshFunction(data);
  };

  const onSubmitFunction = (newData: any) => {
    setIsLoading(true);
    editFunction({ ...defaultValues, ...newData })
      .then(() => {
        listFunction().then((res: any) => {
          localStorage.setItem("tableList", JSON.stringify(res));
          setData(res);
          setOpenModalEdit(false);
          setOpenModalEdiStatus(false);
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {Form && (
        <ModalReact
          title={` Edição de ${pageName} (ID: ${row.original[idCol]})`}
          open={openModalEdit}
          onClose={() => setOpenModalEdit(false)}
          className={modalWidth || "w-[80%]"}
        >
          <Form
            onSubmitFunction={onSubmitFunction}
            defaultValues={defaultValues}
            disabledFields={disabledFields}
            className="p-4"
          >
            <div className="flex flex-row-reverse gap-1 border-t border-gray-950 pt-4">
              <Button loading={isLoading}>Salvar</Button>
              <Button
                type="button"
                className="bg-body"
                onClick={() => setOpenModalEdit(false)}
              >
                Fechar
              </Button>
            </div>
          </Form>
        </ModalReact>
      )}
      <ModalReact
        open={openModalEdiStatus}
        onClose={() => setOpenModalEdiStatus(false)}
      >
        <div className="border-b p-4 flex items-center justify-center">
          <h1>
            Tem certeza que deseja{" "}
            <span className={`underline decoration-1`}>
              {isActive ? "Desativar" : "Ativar"}
            </span>{" "}
            o registro: {row.original[idCol]}?
          </h1>
        </div>
        <div className="flex w-full gap-1 p-4">
          <Button
            type="button"
            className="bg-body"
            onClick={() => setOpenModalEdiStatus(false)}
          >
            Cancelar
          </Button>
          <Button loading={isLoading} onClick={() => onSubmitFunction({})}>
            Confirmar
          </Button>
        </div>
      </ModalReact>
      <tr>
        <td>
          <div className="flex justify-around gap-1">
            {canEdit && (
              <button
                className="navButton buttonWarning"
                title="Editar"
                onClick={() => {
                  let localData = localStorage.getItem("tableList");
                  if (localData != null) {
                    localData = JSON.parse(localData);
                  }
                  let data: any = [];
                  if (localData != null) {
                    data = localData;
                  }
                  openEdit(
                    data.find((e: any) => e[idCol] == row.original[idCol])
                  );
                }}
              >
                <MdEdit />
              </button>
            )}
            {canDesactive && (
              <button
                disabled={isLoading}
                className={`navButton ${
                  isActive ? "buttonDanger" : "buttonSuccess"
                }`}
                title={isActive ? "Desativar" : "Ativar"}
                onClick={() => {
                  // setIsLoading(true);
                  const rowData: any = row.original;
                  const newData: any = {};
                  newData[isActiveCol] = !isActive;
                  newData[idCol] = rowData[idCol];
                  openEdiStatus(newData);
                }}
              >
                {isActive ? <MdOutlineToggleOn /> : <MdOutlineToggleOff />}
              </button>
            )}
            {canRefresh && (
              <button
                disabled={isLoading}
                className={"navButton buttonWarning"}
                title={"Redefinir"}
                onClick={() => {
                  const rowData: any = row.original;
                  const newData: any = {};

                  newData["email_usuario"] = rowData["email_usuario"];
                  newData[idCol] = rowData[idCol];
                  refresh(newData);
                  console.log(newData);
                }}
              >
                <IoMdRefresh />
              </button>
            )}
          </div>
        </td>
        {row.getVisibleCells().map((cell: any) => (
          <td
            key={cell.id}
            {...{
              style: {
                width: cell.column.getSize(),
                color:
                  cell.column.id != isActiveCol
                    ? "inherit"
                    : isActive
                    ? "#1F9254"
                    : "#A30D11",
                fontWeight: cell.column.id == isActiveCol ? "700" : "400",
                textAlign: "center",
              },
            }}
          >
            {cell.column.id != isActiveCol ? (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            ) : (
              <div
                className={`flex ${
                  isActive
                    ? " bg-[#a1fcc8] border border-[#4ed18b]"
                    : "bg-[#fa6f74] border border-[#e05357]"
                } rounded-xl px-2 justify-center text-sm`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            )}
          </td>
        ))}
      </tr>
    </>
  );
};

export default ReactTableRow;
