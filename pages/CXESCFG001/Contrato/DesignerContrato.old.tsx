// import Input from "@/components/Forms/Input";
// import ModalReact from "@/components/Modal/ModalReact";
// import {
//     cloneDeep,
//     downloadJsonFile,
//     generatePDF,
//     getFontsData,
//     getPlugins,
//     getTemplate,
//     handleLoadTemplate,
//     readFile,
// } from "@/utils/pdfme/helper";
// import { Template, checkTemplate } from "@pdfme/common";
// import { Designer } from "@pdfme/ui";
// import { PDFDocument } from "pdf-lib";
// import { useEffect, useRef, useState } from "react";
// import {
//     GrDocument,
//     GrDocumentDownload,
//     GrDocumentMissing,
//     GrDocumentPdf,
//     GrDocumentText,
//     GrDocumentThreat,
//     GrDocumentTransfer,
//     GrDocumentUpdate,
//     GrDocumentUpload,
//     GrDocumentVerified,
// } from "react-icons/gr";
// import { toast } from "react-toastify";
// import * as yup from "yup";
// import { FormatFields, GetForm } from "../../../utils";
// import RelacionamentosTable from "./RelacionamentosTable";

// const headerHeight = 65;

// function DesignerContrato() {
//     const designerRef = useRef<HTMLDivElement | null>(null);
//     const designer = useRef<Designer | null>(null);
//     // const [lang, setLang] = useState<Lang>("en");
//     const [isRelationsOpen, setIsRelationsOpen] = useState(false);
//     const [yupDeleteSchema, setYupDeleteSchema] = useState<
//         yup.ObjectSchema<{}, yup.AnyObject, {}, "">
//     >(yup.object().shape({}));
//     const [sampleData, setSampleData] = useState<any>({});

//     const { ...formDeleteValue } = GetForm(yupDeleteSchema, setYupDeleteSchema);

//     useEffect(() => {
//         let template: Template = getTemplate();
//         try {
//             const templateString = localStorage.getItem("template");
//             const templateJson = templateString
//                 ? JSON.parse(templateString)
//                 : getTemplate();
//             checkTemplate(templateJson);
//             template = templateJson as Template;
//         } catch {
//             localStorage.removeItem("template");
//         }

//         getFontsData().then((font: any) => {
//             if (designerRef.current) {
//                 designer.current = new Designer({
//                     domContainer: designerRef.current,
//                     template,
//                     options: {
//                         font,
//                         // lang,
//                         labels: {
//                             addNewField: "Adicionar Novo Campo!", // Update existing labels
//                             clear: "🗑️", // Add custom labels to consume them in your own plugins
//                         },
//                         theme: {
//                             token: {
//                                 colorPrimary: "#25c2a0",
//                             },
//                         },
//                     },
//                     plugins: getPlugins(),
//                 });
//                 designer.current.onSaveTemplate(onSaveTemplate);
//             }
//         });
//         // return () => {
//         //     if (designer.current) {
//         //         designer.current.destroy();
//         //     }
//         // };
//     }, [designerRef]);

//     const onChangeBasePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target && e.target.files) {
//             readFile(e.target.files[0], "dataURL").then(
//                 async (basePdf: any) => {
//                     if (designer.current) {
//                         designer.current.updateTemplate(
//                             Object.assign(
//                                 cloneDeep(designer.current.getTemplate()),
//                                 {
//                                     basePdf,
//                                 }
//                             )
//                         );
//                     }
//                 }
//             );
//         }
//     };

//     const onDownloadTemplate = () => {
//         if (designer.current) {
//             if (!repeatedNameFields()) {
//                 downloadJsonFile(designer.current.getTemplate(), "template");
//                 toast.success("Download Iniciado!");
//             }
//         }
//     };

//     const onSaveTemplate = (template?: Template) => {
//         if (designer.current) {
//             if (!repeatedNameFields()) {
//                 localStorage.setItem(
//                     "template",
//                     JSON.stringify(template || designer.current.getTemplate())
//                 );
//                 toast.success("Salvo");
//             }
//         }
//     };

//     function splitBase64(base64: string) {
//         const match = base64.match(/data:application\/pdf;base64,(.*)/);

//         if (match) {
//             return match[1];
//         } else {
//             return null;
//         }
//     }

//     const onNewPage = async () => {
//         if (designer.current) {
//             const templateAtual = designer.current.getTemplate();
//             const pdfBase64data: any = templateAtual.basePdf;

//             const pdfBase64 = splitBase64(pdfBase64data);

//             if (pdfBase64 == null) {
//                 return toast.error("Falha ao ler o pdf base");
//             }

//             const pdfDoc = await PDFDocument.load(
//                 Buffer.from(pdfBase64, "base64")
//             );

//             const blankPage = pdfDoc.addPage();
//             // blankPage.setSize(612, 792);

//             const pages = pdfDoc.getPages();
//             pages.push(blankPage);
//             const schemas = templateAtual.schemas;
//             schemas.push({});

//             const newPdf = await pdfDoc.save();
//             const newPdfBase64 = Buffer.from(newPdf).toString("base64");

//             designer.current.updateTemplate(
//                 Object.assign(cloneDeep(designer.current.getTemplate()), {
//                     basePdf: `data:application/pdf;base64,${newPdfBase64}`,
//                     schemas,
//                 })
//             );
//         }
//     };

//     const onResetTemplate = () => {
//         if (designer.current) {
//             designer.current.updateTemplate(getTemplate());
//             localStorage.removeItem("template");
//         }
//     };

//     async function onDeletePage(pageNumber: number) {
//         const pageIndex = pageNumber - 1;
//         if (designer.current) {
//             const templateAtual = designer.current.getTemplate();
//             const pdfBase64data: any = templateAtual.basePdf;

//             const pdfBase64 = splitBase64(pdfBase64data);

//             if (pdfBase64 != null) {
//                 const pdfDoc = await PDFDocument.load(
//                     Buffer.from(pdfBase64, "base64")
//                 );

//                 const pages = pdfDoc.getPages();
//                 if (pages.length == 1 && pageNumber == 1) {
//                     return toast.error("Não é possível remover todas páginas");
//                 }

//                 if (pages.length == pageNumber) {
//                     formDeleteValue.setValue(
//                         "deleteValue" as never,
//                         String(pages.length - 1) as never
//                     );
//                 }

//                 // Remove a página da lista de páginas
//                 pdfDoc.removePage(pageIndex);

//                 // Além é necessário remover da lista de colunas e inputs
//                 const schemas = templateAtual.schemas;
//                 schemas.splice(pageIndex, 1);

//                 // Salva o novo PDF
//                 const newPdf = await pdfDoc.save();
//                 const newPdfBase64 = Buffer.from(newPdf).toString("base64");

//                 // Atualiza o template do designer
//                 designer.current.updateTemplate(
//                     Object.assign(cloneDeep(designer.current.getTemplate()), {
//                         basePdf: `data:application/pdf;base64,${newPdfBase64}`,
//                         schemas,
//                     })
//                 );
//             }
//         }
//     }

//     const validarDeleteValue = async (e: any) => {
//         const valor = FormatFields.formatarNumerico(e.target.value);

//         if (designer.current != null) {
//             const pdfBase64data: any = designer.current.getTemplate().basePdf;

//             const pdfBase64 = splitBase64(pdfBase64data);

//             if (pdfBase64 != null) {
//                 const pdfDoc = await PDFDocument.load(
//                     Buffer.from(pdfBase64, "base64")
//                 );

//                 const pages = pdfDoc.getPages();
//                 if (+valor > pages.length) {
//                     e.target.value = String(pages.length);
//                 } else if (+valor < 1) {
//                     e.target.value = "1";
//                 } else {
//                     e.target.value = valor;
//                 }
//             }
//         }
//     };

//     const submitDeleteValue = (data: any) => {
//         onDeletePage(+data["deleteValue"]);
//     };

//     function repeatedNameFields() {
//         if (designer.current) {
//             const templateAtual = designer.current.getTemplate();
//             if (templateAtual?.columns) {
//                 const colunas = templateAtual.columns;
//                 if (colunas) {
//                     const repetidos: string[] = stringsRepetidas(colunas);
//                     repetidos.map((repetido) => {
//                         const paginaRepetidos = verificaChaveRepetida(
//                             templateAtual.schemas,
//                             repetido
//                         );
//                         toast.error(
//                             `Não é possível salvar pois "${repetido}" se repete ${
//                                 paginaRepetidos.length > 1
//                                     ? "nas páginas"
//                                     : "na página"
//                             } ${paginaRepetidos.join(", ")}`
//                         );
//                     });
//                     if (repetidos[0] != undefined) {
//                         return true;
//                     }
//                 }
//             }
//         }
//         return false;
//     }

//     function stringsRepetidas(arr: string[]) {
//         const contagem: any = {};
//         const repetidas = [];

//         // Conta a ocorrência de cada string no array
//         arr.forEach((string) => {
//             contagem[string] = (contagem[string] || 0) + 1;
//         });

//         // Adiciona as strings repetidas à lista 'repetidas'
//         for (const string in contagem) {
//             if (contagem.hasOwnProperty(string) && contagem[string] > 1) {
//                 repetidas.push(string);
//             }
//         }

//         return repetidas;
//     }

//     function verificaChaveRepetida(arrayObjetos: any[], chave: string) {
//         const indices = [];
//         for (let i = 0; i < arrayObjetos.length; i++) {
//             if (arrayObjetos[i].hasOwnProperty(chave)) {
//                 indices.push(i + 1);
//             }
//         }
//         return indices;
//     }

//     return (
//         <div>
//             <header
//                 style={{
//                     display: "flex",
//                     // alignItems: "center",
//                     justifyContent: "space-between",
//                     marginRight: 120,
//                     flexDirection: "column",
//                     gap: "3px",
//                 }}
//             >
//                 <strong>Editor</strong>
//                 <div className="flex flex-row gap-2 w-full">
//                     <label
//                         htmlFor="changeBasePdf"
//                         // style={{ width: 180 }}
//                         className="cursor-pointer gap-2 rounded p-2 flex flex-row items-center justify-center bg-body text-white"
//                     >
//                         Mudar PDF Base
//                         <GrDocumentUpdate />
//                     </label>
//                     <input
//                         id="changeBasePdf"
//                         type="file"
//                         accept="application/pdf"
//                         onChange={onChangeBasePDF}
//                         className="hidden"
//                     />
//                     <label
//                         htmlFor="loadTemplate"
//                         // style={{ width: 180 }}
//                         className="cursor-pointer gap-2 rounded p-2 flex flex-row items-center justify-center bg-body text-white"
//                     >
//                         Carregar Template
//                         <GrDocumentUpload />
//                     </label>
//                     <input
//                         id="loadTemplate"
//                         type="file"
//                         accept="application/json"
//                         onChange={(e) =>
//                             handleLoadTemplate(e, designer.current)
//                         }
//                         className="hidden"
//                     />
//                     <label
//                         htmlFor="newPageFromBase"
//                         // style={{ width: 180 }}
//                         className="cursor-pointer gap-2 rounded p-2 flex flex-row items-center justify-center bg-body text-white"
//                     >
//                         Nova Página do PDF
//                         <GrDocumentTransfer />
//                     </label>
//                     <input
//                         id="newPageFromBase"
//                         type="file"
//                         accept="application/json"
//                         // onChange={(e) =>
//                         //     handleLoadTemplate(e, designer.current)
//                         // }
//                         className="hidden"
//                     />
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     <button
//                         onClick={onDownloadTemplate}
//                         className="gap-2 rounded p-2 flex flex-row items-center justify-center bg-body text-white"
//                     >
//                         <GrDocumentDownload />
//                         Baixar Template
//                     </button>
//                     <button
//                         onClick={() => onSaveTemplate()}
//                         className="gap-2 rounded p-2 flex flex-row items-center justify-center bg-body text-white"
//                     >
//                         <GrDocumentVerified />
//                         Salvar Template
//                     </button>
//                     <button
//                         onClick={onResetTemplate}
//                         className="gap-2 rounded p-2 flex flex-row items-center justify-center bg-body text-white"
//                     >
//                         <GrDocumentThreat />
//                         Resetar Template
//                     </button>
//                     <button
//                         onClick={() => generatePDF(designer.current)}
//                         className="gap-2 rounded p-2 flex flex-row items-center justify-center bg-body text-white"
//                     >
//                         <GrDocumentPdf />
//                         Gerar PDF
//                     </button>
//                     <button
//                         onClick={onNewPage}
//                         className="gap-2 rounded p-2 flex flex-row items-center justify-center bg-body text-white"
//                     >
//                         <GrDocument />
//                         Nova página em branco
//                     </button>
//                     <form
//                         onSubmit={formDeleteValue.handleSubmit(
//                             submitDeleteValue
//                         )}
//                         className="flex flex-row items-center relative"
//                     >
//                         <Input
//                             name="deleteValue"
//                             type="number"
//                             formulario={formDeleteValue}
//                             onChange={validarDeleteValue}
//                             defaultValue={"1"}
//                         />
//                         <button className="gap-2 rounded p-2 flex flex-row items-center justify-center bg-body text-white">
//                             <GrDocumentMissing />
//                             Remover página
//                         </button>
//                     </form>
//                     <button
//                         type="button"
//                         onClick={() => {
//                             if (designer.current) {
//                                 const sample =
//                                     designer.current.getTemplate()?.sampledata;
//                                 if (sample && sample[0]) {
//                                     setSampleData(sample[0]);
//                                     setIsRelationsOpen(true);
//                                 }
//                             }
//                         }}
//                         className="gap-2 rounded p-2 flex flex-row items-center justify-center bg-body text-white"
//                     >
//                         <GrDocumentText />
//                         Visualizar Relações
//                     </button>
//                 </div>
//             </header>
//             <div
//                 ref={designerRef}
//                 style={{
//                     width: "100%",
//                     height: `calc(100vh - ${headerHeight}px)`,
//                     zIndex: "0",
//                 }}
//             />
//             <ModalReact
//                 title="Relacionamentos"
//                 open={isRelationsOpen}
//                 onClose={() => setIsRelationsOpen(false)}
//             >
//                 <div className="flex flex-col p-4">
//                     <table>
//                         <thead>
//                             <tr className="bg-black-2 bg-opacity-[.1] dark:bg-white dark:bg-opacity-10">
//                                 <th className="font-bold border-b">Sintaxe</th>
//                                 <th className="font-bold border-b">
//                                     Descrição
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <RelacionamentosTable />
//                             {/* <tr>
//                                 <td>{"{nome_cliente}"}</td>
//                                 <td>Nome do cliente do contrato</td>
//                             </tr> */}
//                             {/* {Object.keys(sampleData)
//                                 .filter(
//                                     (key) =>
//                                         !sampleData[key].includes("base64,")
//                                 )
//                                 .map((key: any) => (
//                                     <tr key={key}>
//                                         <td>{key}</td>
//                                         <td>{sampleData[key]}</td>
//                                     </tr>
//                                 ))} */}
//                         </tbody>
//                     </table>
//                 </div>
//             </ModalReact>
//         </div>
//     );
// }

// export default DesignerContrato;
