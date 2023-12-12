import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { downloadPDF } from "@/lib/jspdf";
import { downloadToExcel } from "@/lib/xlsx";
import {
  ColumnResizeMode,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
  MdNorth,
  MdOutlineFileCopy,
} from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";
import Button from "../Forms/Button";
import ModalReact from "../Modal/ModalReact";
import LoaderSun from "../common/Loader/LoaderSun";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ReactTableRow from "./ReactTableRow";

// let datas: any[] = [];

const ReactTable = (props: any) => {
  const [sorting, setSorting] = useState<any[]>([]);
  const [columnResizeMode, setColumnResizeMode] =
    useState<ColumnResizeMode>("onChange");
  const [filtering, setFiltering] = useState("");
  const [renderedData, setRenderedData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const onSubmitFunction = (newData: any) => {
    setIsLoading(true);
    props
      .createFunction(newData)
      .then(() => {
        props.listFunction().then((res: any) => {
          localStorage.setItem("tableList", JSON.stringify(res));
          setData(res);
          setOpenModalCreate(false);
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    props.listFunction().then((res: any) => {
      localStorage.setItem("tableList", JSON.stringify(res));
      setData(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function formatRenderedData() {
      const newData = data.map((row: any) => {
        row[props.isActiveCol] = Boolean(+row[props.isActiveCol])
          ? "Ativo"
          : "Inativo";
        return row;
      });
      const newFormatedData = await (props.formatFunction
        ? await props.formatFunction(newData)
        : newData);
      setRenderedData(newFormatedData);
      if (data[0]) setIsLoaded(true);
    }
    formatRenderedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const table = useReactTable({
    data: renderedData,
    columns: props.columns,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting: sorting,
      globalFilter: filtering,
      columnVisibility,
    },
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
      <div className="w-full tableSection flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <div className="flex flex-col sm:flex-row align-middle gap-2">
            <label className="flex flex-col justify-center">Pesquisar</label>
            <Input
              className="focus:border-none "
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            {props.canNotCreate ? (
              <></>
            ) : (
              <Button
                type="button"
                onClick={() => setOpenModalCreate(true)}
                className="bg-primary font-medium items-center gap-2 h-fit rounded-xl"
              >
                <Plus size={15} />
                Adicionar {props.pageName}
              </Button>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <div
                  className="popover-hover:block p-1  hover:bg-stroke react-icons__bs__BsThreeDotsVertical
                  dark:bg-black   rounded-md cursor-pointer"
                >
                  <BsThreeDotsVertical className="react-icons__bs__BsThreeDotsVertical" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="popover w-fit h-fit p-1">
                <div className="flex flex-row rounded-md overflow-hidden justify-between bg-bodydark2 dark:bg-black opacity-80">
                  <button
                    className="rounded-none text-white bg-bodydark2 dark:bg-black p-2 hover:bg-graydark dark:hover:bg-form-strokedark"
                    title="Copiar Tabela"
                    onClick={() =>
                      downloadPDF({
                        data: renderedData,
                        columns: props.columns,
                        name: props.pageName,
                        method: "copy",
                      })
                    }
                  >
                    <MdOutlineFileCopy />
                  </button>

                  <button
                    className="rounded-none text-white bg-bodydark2 dark:bg-black p-2 hover:bg-graydark dark:hover:bg-form-strokedark"
                    title="Exportar para o Excel"
                    onClick={() =>
                      downloadToExcel({
                        data: renderedData,
                        columns: props.columns,
                        name: props.pageName,
                      })
                    }
                  >
                    <RiFileExcel2Line />
                  </button>

                  <button
                    className="rounded-none text-white bg-bodydark2 dark:bg-black p-2 hover:bg-graydark dark:hover:bg-form-strokedark"
                    title="Baixar PDF"
                    onClick={() =>
                      downloadPDF({
                        data: renderedData,
                        columns: props.columns,
                        name: props.pageName,
                        method: "download",
                      })
                    }
                  >
                    <AiOutlineFilePdf />
                  </button>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="rounded-none text-white bg-bodydark2 dark:bg-black p-2 hover:bg-graydark dark:hover:bg-form-strokedark"
                      title="Colunas"
                    >
                      <FaList />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())

                        .map((column) => {
                          const header: any = column.columnDef.header;
                          return (
                            <DropdownMenuCheckboxItem
                              key={column.id}
                              className={"capitalize"}
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                              }
                            >
                              {header}
                            </DropdownMenuCheckboxItem>
                          );
                        })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="w-full overflow-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((group) => (
                <tr key={group.id}>
                  <th>Ações</th>
                  {group.headers.map((header) => (
                    <th
                      className="w-fit border-none"
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      {...{
                        colSpan: header.colSpan,
                        style: {
                          width: header.getSize(),
                        },
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          <span className="flex text-black dark:text-white flex-row items-center font-medium justify-center whitespace-nowrap	">
                            {header.column.getIsSorted() != false && (
                              <MdNorth
                                style={{
                                  rotate:
                                    header.column.getIsSorted() == "asc"
                                      ? "0deg"
                                      : "180deg",
                                  transition: "0.2s",
                                }}
                              />
                            )}

                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                        </div>
                      )}
                      <div
                        {...{
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${
                            header.column.getIsResizing() ? "isResizing" : ""
                          }`,
                          style: {
                            transform:
                              columnResizeMode === "onEnd" &&
                              header.column.getIsResizing()
                                ? `translateX(${
                                    table.getState().columnSizingInfo
                                      .deltaOffset
                                  }px)`
                                : "",
                          },
                        }}
                      />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {!isLoaded ? (
                <tr>
                  <td
                    colSpan={props.columns.length + 1}
                    className="text-center "
                  >
                    <div className="flex justify-center h-[400px]">
                      <LoaderSun />
                    </div>
                  </td>
                </tr>
              ) : (
                table
                  .getRowModel()
                  .rows.map((row) => (
                    <ReactTableRow
                      key={row.id}
                      row={row}
                      setData={setData}
                      data={data}
                      {...props}
                    />
                  ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row-reverse items-center gap-2">
          <div className="flex flex-row">
            <button
              className="navButton"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.setPageIndex(0)}
            >
              <MdFirstPage />
            </button>
            <button
              className="navButton"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <MdNavigateBefore />
            </button>
            <button
              className="navButton"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <MdNavigateNext />
            </button>
            <button
              className="navButton"
              disabled={!table.getCanNextPage()}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              <MdLastPage />
            </button>
          </div>
          <div className="flex flex-row gap-1">
            <div>Página</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </strong>
          </div>
          <div className="flex items-center flex-row gap-2">
            <p>Linhas por Página</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {props.Form && (
        <ModalReact
          title={`Criação de ${props.pageName}`}
          open={openModalCreate}
          onClose={() => setOpenModalCreate(false)}
          className={props.modalWidth || "w-[80%]"}
        >
          <props.Form
            onSubmitFunction={onSubmitFunction}
            defaultValues={table.getAllColumns().map((col: any) => {
              const obj: any = {};
              obj[col.id] = "";
              return obj;
            })}
            className="p-4"
          >
            <div className="flex flex-row-reverse gap-1 border-t border-gray-950 pt-4">
              <Button loading={isLoading}>Salvar</Button>
              <Button
                type="button"
                className="bg-body"
                onClick={() => setOpenModalCreate(false)}
              >
                Fechar
              </Button>
            </div>
          </props.Form>
        </ModalReact>
      )}

      {/* {(props.FormCadastro || props.Form) && (
        <ModalReact
          title={`Criação de ${props.pageName}`}
          open={openModalCreate}
          onClose={() => setOpenModalCreate(false)}
          className={props.modalWidth || "w-[80%]"}
        >
          {props.FormCadastro ? (
            <props.FormCadastro
              onSubmitFunction={onSubmitFunction}
              defaultValues={table.getAllColumns().map((col: any) => {
                const obj: any = {};
                obj[col.id] = "";
                return obj;
              })}
              className="p-4"
            >
              <div className="flex flex-row-reverse gap-1 border-t border-gray-950 pt-4">
                <Button loading={isLoading}>Salvar</Button>
                <Button
                  type="button"
                  className="bg-body"
                  onClick={() => setOpenModalCreate(false)}
                >
                  Fechar
                </Button>
              </div>
            </props.FormCadastro>
          ) : (
            <props.Form
              onSubmitFunction={onSubmitFunction}
              defaultValues={table.getAllColumns().map((col: any) => {
                const obj: any = {};
                obj[col.id] = "";
                return obj;
              })}
              className="p-4"
            >
              <div className="flex flex-row-reverse gap-1 border-t border-gray-950 pt-4">
                <Button loading={isLoading}>Salvar</Button>
                <Button
                  type="button"
                  className="bg-body"
                  onClick={() => setOpenModalCreate(false)}
                >
                  Fechar
                </Button>
              </div>
            </props.Form>
          )}
        </ModalReact>
      )} */}
    </>
  );
};

export default ReactTable;
