import Input from "@/components/Forms/Input";
import {
    cloneDeep,
    downloadJsonFile,
    generatePDF,
    getFontsData,
    getLabelsBR,
    getPlugins,
    getTemplate,
    handleLoadTemplate,
    readFile,
} from "@/utils/pdfme/helper";
import { Template, checkTemplate } from "@pdfme/common";
import { Designer } from "@pdfme/ui";
import { PDFDocument } from "pdf-lib";
import { useEffect, useRef, useState } from "react";
import {
    GrDocument,
    GrDocumentDownload,
    GrDocumentMissing,
    GrDocumentPdf,
    GrDocumentThreat,
    GrDocumentTransfer,
    GrDocumentUpdate,
    GrDocumentUpload,
    GrDocumentVerified,
    GrNext,
} from "react-icons/gr";
import { toast } from "react-toastify";
import * as yup from "yup";
import { FormatFields, GetForm } from "../../../utils";
import RelacionamentosTable from "./RelacionamentosTable";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { FaCheck } from "react-icons/fa";

import Button from "@/components/Forms/Button";
import ModalReact from "@/components/Modal/ModalReact";
import { useContractContext } from "@/src/contexts/ContractProvider";
import { Tooltip } from "@mui/material";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IoMdInformationCircleOutline } from "react-icons/io";

const headerHeight = 65;

function DesignerContrato() {
    const designerRef = useRef<HTMLDivElement | null>(null);
    const designer = useRef<Designer | null>(null);
    // const [lang, setLang] = useState<Lang>("en");
    const [yupDeleteSchema, setYupDeleteSchema] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));
    const [showRelationsAccordion, setShowRelationsAccordion] = useState(true);
    const [openRelationsAccordion, setOpenRelationsAccordion] = useState(false);
    const [pageRemove, setPageRemove] = useState(1);
    const [showModalRemovePage, setShowModalRemovePage] = useState(false);
    const [showModalResetTemplate, setShowModalResetTemplate] = useState(false);
    const [showModalChangeBaseTemplate, setShowModalChangeBaseTemplate] =
        useState(false);
    const [showModalChangeBasePdf, setShowModalChangeBasePdf] = useState(false);

    const { ...formDeleteValue } = GetForm(yupDeleteSchema, setYupDeleteSchema);
    const { relacionamentos } = useContractContext();

    useEffect(() => {
        let template: Template = getTemplate();
        try {
            const templateString = localStorage.getItem("template");
            const templateJson = templateString
                ? JSON.parse(templateString)
                : getTemplate();
            checkTemplate(templateJson);
            template = templateJson as Template;
        } catch {
            localStorage.removeItem("template");
        }

        getFontsData().then((font: any) => {
            if (designerRef.current) {
                designer.current = new Designer({
                    domContainer: designerRef.current,
                    template,
                    options: {
                        font,
                        // lang,
                        labels: getLabelsBR(),
                        theme: {
                            token: {
                                colorPrimary: "#25c2a0",
                            },
                        },
                    },
                    plugins: getPlugins(),
                });
                designer.current.onSaveTemplate(onSaveTemplate);
            }
        });
        // return () => {
        //     if (designer.current) {
        //         designer.current.destroy();
        //     }
        // };
    }, [designerRef]);

    const onChangeBasePDF = async (e: React.ChangeEvent<HTMLInputElement>) => {
        await scrollDocumentTop();
        if (e.target && e.target.files) {
            readFile(e.target.files[0], "dataURL").then(
                async (basePdf: any) => {
                    if (designer.current) {
                        designer.current.updateTemplate(
                            Object.assign(
                                cloneDeep(designer.current.getTemplate()),
                                {
                                    basePdf,
                                }
                            )
                        );
                        toast.success("PDF Base Alterado!");
                        setShowModalChangeBasePdf(false);
                    }
                }
            );
        }
    };

    const onDownloadTemplate = () => {
        if (designer.current) {
            if (!repeatedNameFields()) {
                downloadJsonFile(designer.current.getTemplate(), "template");
                toast.success("Download Iniciado!");
            }
        }
    };

    const onSaveTemplate = (template?: Template) => {
        if (designer.current) {
            if (!repeatedNameFields()) {
                localStorage.setItem(
                    "template",
                    JSON.stringify(template || designer.current.getTemplate())
                );
                toast.success("Salvo");
            }
        }
    };

    function splitBase64(base64: string) {
        const match = base64.match(/data:application\/pdf;base64,(.*)/);

        if (match) {
            return match[1];
        } else {
            return null;
        }
    }

    const onNewPage = async () => {
        if (designer.current) {
            const templateAtual = designer.current.getTemplate();
            const pdfBase64data: any = templateAtual.basePdf;

            const pdfBase64 = splitBase64(pdfBase64data);

            if (pdfBase64 == null) {
                return toast.error("Falha ao ler o pdf base");
            }

            const pdfDoc = await PDFDocument.load(
                Buffer.from(pdfBase64, "base64")
            );

            const blankPage = pdfDoc.addPage();
            // blankPage.setSize(612, 792);

            const pages = pdfDoc.getPages();
            pages.push(blankPage);
            const schemas = templateAtual.schemas;
            schemas.push({});

            const newPdf = await pdfDoc.save();
            const newPdfBase64 = Buffer.from(newPdf).toString("base64");

            designer.current.updateTemplate(
                Object.assign(cloneDeep(designer.current.getTemplate()), {
                    basePdf: `data:application/pdf;base64,${newPdfBase64}`,
                    schemas,
                })
            );
        }
    };

    // const onAddPageFromFile = async (e: React.FormEvent<HTMLInputElement>) => {
    const onAddPageFromFile = async (e: any) => {
        if (e.target && e.target.files) {
            readFile(e.target.files[0], "dataURL").then(
                async (newPagePdfdata: any) => {
                    if (designer.current) {
                        const templateAtual = designer.current.getTemplate();
                        const pdfBase64data: any = templateAtual.basePdf;

                        const pdfBase64 = splitBase64(pdfBase64data);
                        const newPagePdf = splitBase64(newPagePdfdata);

                        if (pdfBase64 == null || newPagePdf == null) {
                            return toast.error("Falha ao ler o pdf base");
                        }
                        //
                        const pdfDoc = await PDFDocument.load(
                            Buffer.from(pdfBase64, "base64")
                        );
                        const newDoc = await PDFDocument.load(
                            Buffer.from(newPagePdf, "base64")
                        );

                        const pages = pdfDoc.getPages();
                        const newPages = newDoc.getPages();

                        const schemas = templateAtual.schemas;

                        for (let i = 0; i < newPages.length; i++) {
                            const [existingPage] = await pdfDoc.copyPages(
                                newDoc,
                                [i]
                            );
                            pdfDoc.addPage(existingPage);
                            pages.push(newPages[i]);
                            schemas.push({});
                        }

                        // pages.push(...newPages);
                        // const schemas = templateAtual.schemas;
                        // newPages.map(() => {
                        //     schemas.push({});
                        // });

                        const newPdf = await pdfDoc.save();
                        const newPdfBase64 =
                            Buffer.from(newPdf).toString("base64");

                        designer.current.updateTemplate(
                            Object.assign(
                                cloneDeep(designer.current.getTemplate()),
                                {
                                    basePdf: `data:application/pdf;base64,${newPdfBase64}`,
                                    schemas,
                                }
                            )
                        );
                    }
                }
            );
        }
    };

    const onResetTemplate = async () => {
        await scrollDocumentTop();
        if (designer.current) {
            designer.current.updateTemplate(getTemplate());
            localStorage.removeItem("template");
        }
    };

    async function onDeletePage(pageNumber: number) {
        await scrollDocumentTop();

        const pageIndex = pageNumber - 1;
        if (designer.current) {
            const templateAtual = designer.current.getTemplate();
            const pdfBase64data: any = templateAtual.basePdf;

            const pdfBase64 = splitBase64(pdfBase64data);

            if (pdfBase64 != null) {
                const pdfDoc = await PDFDocument.load(
                    Buffer.from(pdfBase64, "base64")
                );

                const pages = pdfDoc.getPages();
                if (pages.length == 1 && pageNumber == 1) {
                    throw toast.error("Não é possível remover todas páginas");
                }

                if (pages.length == pageNumber) {
                    formDeleteValue.setValue(
                        "deleteValue" as never,
                        String(pages.length - 1) as never
                    );
                }

                // Remove a página da lista de páginas
                pdfDoc.removePage(pageIndex);

                // Além é necessário remover da lista de colunas e inputs
                const schemas = templateAtual.schemas;
                schemas.splice(pageIndex, 1);

                // Salva o novo PDF
                const newPdf = await pdfDoc.save();
                const newPdfBase64 = Buffer.from(newPdf).toString("base64");

                // Atualiza o template do designer
                return designer.current.updateTemplate(
                    Object.assign(cloneDeep(designer.current.getTemplate()), {
                        basePdf: `data:application/pdf;base64,${newPdfBase64}`,
                        schemas,
                    })
                );
            }
        }
    }

    const validarDeleteValue = async (e: any) => {
        const valor = FormatFields.formatarNumerico(e.target.value);

        if (designer.current != null) {
            const pdfBase64data: any = designer.current.getTemplate().basePdf;

            const pdfBase64 = splitBase64(pdfBase64data);

            if (pdfBase64 != null) {
                const pdfDoc = await PDFDocument.load(
                    Buffer.from(pdfBase64, "base64")
                );

                const pages = pdfDoc.getPages();
                if (+valor > pages.length) {
                    e.target.value = String(pages.length);
                } else if (+valor < 1) {
                    e.target.value = "1";
                } else {
                    e.target.value = valor;
                }
            }
        }
    };

    const submitDeleteValue = (data: any) => {
        // onDeletePage(+data["deleteValue"]);
        setPageRemove(+data["deleteValue"]);
        setShowModalRemovePage(true);
    };

    function repeatedNameFields() {
        if (designer.current) {
            const templateAtual = designer.current.getTemplate();
            if (templateAtual?.columns) {
                const colunas = templateAtual.columns;
                if (colunas) {
                    const repetidos: string[] = stringsRepetidas(colunas);
                    repetidos.map((repetido) => {
                        const paginaRepetidos = verificaChaveRepetida(
                            templateAtual.schemas,
                            repetido
                        );
                        toast.error(
                            `Não é possível salvar pois "${repetido}" se repete ${
                                paginaRepetidos.length > 1
                                    ? "nas páginas"
                                    : "na página"
                            } ${paginaRepetidos.join(", ")}`
                        );
                    });
                    if (repetidos[0] != undefined) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function stringsRepetidas(arr: string[]) {
        const contagem: any = {};
        const repetidas = [];

        // Conta a ocorrência de cada string no array
        arr.forEach((string) => {
            contagem[string] = (contagem[string] || 0) + 1;
        });

        // Adiciona as strings repetidas à lista 'repetidas'
        for (const string in contagem) {
            if (contagem.hasOwnProperty(string) && contagem[string] > 1) {
                repetidas.push(string);
            }
        }

        return repetidas;
    }

    function verificaChaveRepetida(arrayObjetos: any[], chave: string) {
        const indices = [];
        for (let i = 0; i < arrayObjetos.length; i++) {
            if (arrayObjetos[i].hasOwnProperty(chave)) {
                indices.push(i + 1);
            }
        }
        return indices;
    }

    function addAttachment() {
        //docDefinition
        const dd: any = {
            content: [
                { text: "Anexo I", style: "header", alignment: "center" },
                {
                    table: {
                        headerRows: 2,
                        widths: ["auto", "auto", "*"],
                        body: [
                            [
                                {
                                    text: "Header 1",
                                    style: "tableHeader",
                                    fillColor: "#45B5DD",
                                    colSpan: 3,
                                    alignment: "center",
                                },
                                {},
                                {},
                            ],
                            [
                                {
                                    text: "Header 1",
                                    style: "tableHeader",
                                    fillColor: "#F07F00",
                                },
                                {
                                    text: "Header 2",
                                    style: "tableHeader",
                                    fillColor: "#F07F00",
                                },
                                {
                                    text: "Header 3",
                                    style: "tableHeader",
                                    fillColor: "#F07F00",
                                },
                            ],
                            ["Data1", "Data2", "Data3"],
                            ["Data12", "Data22", "Data23"],
                            ["Data31", "Data32", "Data33"],
                            ["Data41", "Data42", "Data43"],
                            ["Data51", "Data52", "Data53"],
                            ["Data51", "Data52", "Data53"],
                            ["Data51", "Data52", "Data53"],
                            ["Data51", "Data52", "Data53"],
                            ["Data51", "Data52", "Data53"],
                            ["Data51", "Data52", "Data53"],
                        ],
                    },
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: "white",
                },
            },
        };

        pdfMake.tableLayouts = {
            lightLayout: {
                hLineColor: function (i) {
                    return "#fff";
                },
                vLineColor: function (i) {
                    return "#eeeeee";
                },
                fillColor: function (
                    rowIndex: any,
                    node: any,
                    columnIndex: any
                ) {
                    return rowIndex % 2 === 1 ? "#black" : null;
                },
            },
        };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(dd).getBase64(async (newPagePdfdata: any) => {
            if (designer.current) {
                const templateAtual = designer.current.getTemplate();
                const pdfBase64data: any = templateAtual.basePdf;

                const pdfBase64 = splitBase64(pdfBase64data);
                const newPagePdf = newPagePdfdata;

                if (pdfBase64 == null || newPagePdf == null) {
                    return toast.error("Falha ao ler o pdf base");
                }
                //
                const pdfDoc = await PDFDocument.load(
                    Buffer.from(pdfBase64, "base64")
                );
                const newDoc = await PDFDocument.load(
                    Buffer.from(newPagePdf, "base64")
                );

                const pages = pdfDoc.getPages();
                const newPages = newDoc.getPages();

                const schemas = templateAtual.schemas;

                for (let i = 0; i < newPages.length; i++) {
                    const [existingPage] = await pdfDoc.copyPages(newDoc, [i]);
                    pdfDoc.addPage(existingPage);
                    pages.push(newPages[i]);
                    schemas.push({});
                }

                // pages.push(...newPages);
                // const schemas = templateAtual.schemas;
                // newPages.map(() => {
                //     schemas.push({});
                // });

                const newPdf = await pdfDoc.save();
                const newPdfBase64 = Buffer.from(newPdf).toString("base64");

                designer.current.updateTemplate(
                    Object.assign(cloneDeep(designer.current.getTemplate()), {
                        basePdf: `data:application/pdf;base64,${newPdfBase64}`,
                        schemas,
                    })
                );
            }
        });
    }

    async function scrollDocumentTop() {
        let pdfDocumentArea = document.querySelector(
            "#__next > div.dark\\:bg-boxdark-2.dark\\:text-bodydark > div > div > main > div > div.gap-9.sm\\:grid-cols-2 > div > div > div > section > div > div:nth-child(2) > div > div > div:nth-child(3)"
        ) as Element;

        if (pdfDocumentArea) pdfDocumentArea.scrollTop = 0;
    }

    return (
        <div className="relative flex flex-col gap-2">
            <header
                style={{
                    display: "flex",
                    // alignItems: "center",
                    justifyContent: "space-between",
                    // marginRight: 120,
                    flexDirection: "column",
                    gap: "3px",
                }}
            >
                <strong>Editor</strong>

                <input
                    id="loadTemplate"
                    type="file"
                    accept="application/json"
                    onInput={(e) =>
                        handleLoadTemplate(e, designer.current).then(() => {
                            setShowModalChangeBaseTemplate(false);
                            toast.success("Template Carregado com sucesso!");
                        })
                    }
                    className="hidden"
                />
                <input
                    id="newPageFromBase"
                    type="file"
                    accept="application/pdf"
                    onInput={(e) => onAddPageFromFile(e)}
                    className="hidden"
                />
                <input
                    id="changeBasePdf"
                    type="file"
                    accept="application/pdf"
                    onInput={onChangeBasePDF}
                    className="hidden"
                />

                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer hover:bg-black-2 hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-5">
                            Arquivo
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem onClick={onNewPage}>
                                <div className="pr-2">
                                    <GrDocument />
                                </div>
                                Nova página em branco
                            </MenubarItem>
                            <MenubarItem>
                                <div className="pr-2">
                                    <GrDocumentTransfer />
                                </div>
                                <label
                                    htmlFor="newPageFromBase"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Nova Página do PDF
                                </label>
                            </MenubarItem>

                            <MenubarSeparator />
                            <MenubarItem>
                                <form
                                    onSubmit={formDeleteValue.handleSubmit(
                                        submitDeleteValue
                                    )}
                                    className="flex flex-col"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex flex-row flex-nowrap items-center justify-between pb-2">
                                        <div className="flex flex-row flex-nowrap items-center">
                                            <div className="pr-2">
                                                <GrDocumentMissing />
                                            </div>
                                            <button>Remover página</button>
                                        </div>
                                    </div>
                                    <Input
                                        name="deleteValue"
                                        type="number"
                                        formulario={formDeleteValue}
                                        onChange={validarDeleteValue}
                                        defaultValue={"1"}
                                    />
                                </form>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer hover:bg-black-2 hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-5">
                            Template
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem onClick={() => onSaveTemplate()}>
                                <div className="pr-2">
                                    <GrDocumentVerified />
                                </div>
                                Salvar Template
                                <MenubarShortcut className="flex flex-row flex-nowrap items-center gap-1">
                                    Ctrl S
                                </MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem onClick={onDownloadTemplate}>
                                <div className="pr-2">
                                    <GrDocumentDownload />
                                </div>
                                Baixar Template
                            </MenubarItem>
                            <MenubarItem
                                onClick={() => setShowModalResetTemplate(true)}
                            >
                                <div className="pr-2">
                                    <GrDocumentThreat />
                                </div>
                                Resetar Template
                            </MenubarItem>
                            <MenubarItem
                                onClick={() =>
                                    setShowModalChangeBaseTemplate(true)
                                }
                            >
                                <div className="pr-2">
                                    <GrDocumentUpload />
                                </div>
                                <div>Carregar Template</div>
                                {/* <label
                                    htmlFor="loadTemplate"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Carregar Template
                                </label> */}
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer hover:bg-black-2 hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-5">
                            Pdf
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem
                                onClick={() => generatePDF(designer.current)}
                            >
                                <div className="pr-2">
                                    <GrDocumentPdf />
                                </div>
                                Gerar PDF
                            </MenubarItem>
                            <MenubarItem
                                onClick={() => setShowModalChangeBasePdf(true)}
                            >
                                <div className="pr-2">
                                    <GrDocumentUpdate />
                                </div>
                                <div
                                // onClick={(e) => {

                                //     e.stopPropagation();
                                // }}
                                >
                                    Mudar PDF Base
                                </div>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <button
                        className="flex flex-row flex-nowrap items-center bg-success rounded px-2 py-1 text-white"
                        onClick={() => onSaveTemplate()}
                    >
                        <div className="pr-2">
                            <GrDocumentVerified />
                        </div>
                        Salvar Template
                    </button>
                    <button
                        onClick={() =>
                            setShowRelationsAccordion(!showRelationsAccordion)
                        }
                        className="flex flex-row gap-2 flex-nowrap items-center hover:bg-black-2 hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-5 rounded-sm px-3 py-1.5 text-sm font-medium outline-none"
                    >
                        <div className="w-[20px]">
                            {showRelationsAccordion && <FaCheck />}
                        </div>
                        <div>Relacionamentos Rápidos</div>
                    </button>
                    <Tooltip
                        title={`A tabela do kit (Anexo I) aparecerá ao gerar contrato`}
                    >
                        <button>
                            <IoMdInformationCircleOutline />
                        </button>
                    </Tooltip>
                </Menubar>
            </header>
            <div
                ref={designerRef}
                style={{
                    width: "100%",
                    height: `calc(100vh - ${headerHeight}px)`,
                    // zIndex: "0",
                }}
            />
            <div
                className={`bg-black-2 fixed top-[15%] right-3 w-[30px] h-[40px] z-0 ${
                    showRelationsAccordion
                        ? "opacity-40 hover:opacity-100"
                        : "opacity-0 scale-[500%] -left-15"
                } duration-300 cursor-pointer rounded-l-lg`}
                onMouseOver={() => setOpenRelationsAccordion(true)}
                onMouseOut={() => setOpenRelationsAccordion(false)}
            >
                <div
                    // onClick={() =>
                    //     setOpenRelationsAccordion(
                    //         !openRelationsAccordion
                    //     )
                    // }
                    className={`${
                        openRelationsAccordion && "rotate-180"
                    } duration-300 w-[30px] h-[40px] flex flex-col items-center justify-center text-white`}
                >
                    <GrNext />
                </div>
            </div>
            <div
                className={`bg-white border dark:bg-black-2 text-sm fixed top-[15%] z-2 opacity-30 hover:opacity-100 rounded-l-lg duration-300 shadow-md ${
                    openRelationsAccordion ? "right-0" : "-right-230"
                }`}
                onMouseOver={() => setOpenRelationsAccordion(true)}
                onMouseOut={() => setOpenRelationsAccordion(false)}
            >
                <div className="flex flex-col p-4">
                    <table className="border-spacing-px">
                        <thead>
                            <tr className="bg-black-2 bg-opacity-[.1] dark:bg-white dark:bg-opacity-10">
                                <th className="font-bold border-b">Sintaxe</th>
                                <th className="font-bold border-b">
                                    Descrição
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {relacionamentos.map((relacionamento, index) => (
                                <RelacionamentosTable
                                    relacionamento={relacionamento}
                                    key={index}
                                    index={index}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalReact
                open={showModalRemovePage}
                title="Remoção da Página"
                onClose={() => setShowModalRemovePage(false)}
            >
                <div className="p-3">
                    <div className="pb-2">
                        Tem certeza que deseja remover a página {pageRemove}?
                    </div>
                    <div className="flex flex-row flex-nowrap gap-2 justify-center">
                        <Button
                            className="bg-error"
                            onClick={() => setShowModalRemovePage(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => {
                                onDeletePage(pageRemove).then(() => {
                                    toast.success("Página removida!");
                                    setShowModalRemovePage(false);
                                });
                            }}
                        >
                            Confirmar
                        </Button>
                    </div>
                </div>
            </ModalReact>
            <ModalReact
                open={showModalResetTemplate}
                title="Resetar Template"
                onClose={() => setShowModalResetTemplate(false)}
            >
                <div className="p-3">
                    <div className="pb-2">
                        Tem certeza que deseja resetar o template?
                    </div>
                    <div className="flex flex-row flex-nowrap gap-2 justify-center">
                        <Button
                            className="bg-error"
                            onClick={() => setShowModalResetTemplate(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => {
                                onResetTemplate().then(() => {
                                    toast.success("Template Resetado!");
                                    setShowModalResetTemplate(false);
                                });
                            }}
                        >
                            Confirmar
                        </Button>
                    </div>
                </div>
            </ModalReact>
            <ModalReact
                open={showModalChangeBaseTemplate}
                title="Mudar Template Base"
                onClose={() => setShowModalChangeBaseTemplate(false)}
            >
                <div className="p-3">
                    <div className="pb-2">
                        Tem certeza que deseja mudar o template base?
                    </div>
                    <div className="flex flex-row flex-nowrap gap-2 justify-center">
                        <Button
                            className="bg-error"
                            onClick={() =>
                                setShowModalChangeBaseTemplate(false)
                            }
                        >
                            Cancelar
                        </Button>
                        <label
                            htmlFor="loadTemplate"
                            className="flex w-fit justify-center items-end rounded bg-success p-2 px-4 font-medium text-gray"
                        >
                            Mudar Template Base
                        </label>
                    </div>
                </div>
            </ModalReact>
            <ModalReact
                open={showModalChangeBasePdf}
                title="Mudar PDF Base"
                onClose={() => setShowModalChangeBasePdf(false)}
            >
                <div className="p-3">
                    <div className="pb-2">
                        Tem certeza que deseja mudar o PDF base?
                    </div>
                    <div className="flex flex-row flex-nowrap gap-2 justify-center">
                        <Button
                            className="bg-error"
                            onClick={() => setShowModalChangeBasePdf(false)}
                        >
                            Cancelar
                        </Button>
                        <label
                            htmlFor="changeBasePdf"
                            className="flex w-fit justify-center items-end rounded bg-success p-2 px-4 font-medium text-gray"
                        >
                            Mudar PDF Base
                        </label>
                    </div>
                </div>
            </ModalReact>
        </div>
    );
}

export default DesignerContrato;
