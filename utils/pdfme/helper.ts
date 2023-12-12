import { Font, Template, checkTemplate } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import { barcodes, image, text } from "@pdfme/schemas";
import { Designer, Form, Viewer } from "@pdfme/ui";
import { toast } from "react-toastify";
import template from "./baseTemplate";
import plugins from "./plugins";

const fontObjList = [
    {
        fallback: true,
        label: "Roboto",
        url: "/fonts/Roboto-Regular.ttf",
    },
    {
        fallback: false,
        label: "Roboto-Bold",
        url: "/fonts/Roboto-Bold.ttf",
    },
];

export const getFontsData = async () => {
    const fontDataList = await Promise.all(
        fontObjList.map(async (font) => ({
            ...font,
            data: await fetch(font.url).then((res) => res.arrayBuffer()),
        }))
    );

    return fontDataList.reduce(
        (acc, font) => ({ ...acc, [font.label]: font }),
        {} as Font
    );
};

export const readFile = (
    file: File | null,
    type: "text" | "dataURL" | "arrayBuffer"
) => {
    return new Promise<string | ArrayBuffer>((r) => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", (e) => {
            if (e && e.target && e.target.result && file !== null) {
                r(e.target.result);
            }
        });
        if (file !== null) {
            try {
                if (type === "text") {
                    fileReader.readAsText(file);
                } else if (type === "dataURL") {
                    fileReader.readAsDataURL(file);
                } else if (type === "arrayBuffer") {
                    fileReader.readAsArrayBuffer(file);
                }
            } catch (error) {
                return;
            }
        }
    });
};

export const cloneDeep = (obj: any) => JSON.parse(JSON.stringify(obj));

const getTemplateFromJsonFile = (file: File) => {
    return readFile(file, "text").then((jsonStr) => {
        const template: Template = JSON.parse(jsonStr as string);
        try {
            checkTemplate(template);
            return template;
        } catch (e) {
            throw e;
        }
    });
};

export const downloadJsonFile = (json: any, title: string) => {
    if (typeof window !== "undefined") {
        const blob = new Blob([JSON.stringify(json)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
};

export const handleLoadTemplate = async (
    e: any,
    currentRef: Designer | Form | Viewer | null
) => {
    if (e.target && e.target.files) {
        getTemplateFromJsonFile(e.target.files[0])
            .then((t) => {
                if (!currentRef) return;
                currentRef.updateTemplate(t);
            })
            .catch((e) => {
                // alert(`Invalid template file.
                //     --------------------------
                //     ${e}`);
                throw toast.error("Template inválido");
            });
    }
};

export const getPlugins = () => {
    return {
        Texto: text,
        Assinatura: plugins.signature,
        QR: barcodes.qrcode,
        Imagem: image,
    };
};

export const getLabelsBR = () => ({
    addNewField: "Adicionar Novo Campo!", // Update existing labels
    clear: "🗑️", // Add custom labels to consume them in your own plugins
    fieldsList: "Lista de Campos",
    bulkUpdateFieldName: "Atualizar Todos Campos",
    cancel: "Cancelar",
    commitBulkUpdateFieldName: "Confirmar Atualização",
    //
    // cancel: "",
    field: "Campo",
    fieldName: "Nome do Campo",
    align: "Alinhar",
    width: "Largura",
    height: "Altura",
    rotate: "Rotação",
    edit: "Editar",
    // plsInputName: "",
    fieldMustUniq: "Campos Precisam ser únicos",
    notUniq: "Não é único",
    noKeyName: "Não possui nome",
    // fieldsList: "",
    // addNewField: "",
    editField: "Editar Campo",
    type: "Tipo",
    errorOccurred: "Ocorreu Algum Erro",
    errorBulkUpdateFieldName: "Erro ao atualizar todos campos",
    // commitBulkUpdateFieldName: "",
    // bulkUpdateFieldName: "",
    "schemas.textColor": "Cor do Texto",
    "schemas.bgColor": "Cor de Fundo",
    // "schemas.horizontal": "",
    // "schemas.vertical": "",
    "schemas.left": "Esquerda",
    "schemas.center": "Centro",
    "schemas.right": "Direita",
    "schemas.top": "Cima",
    "schemas.middle": "Meio",
    "schemas.bottom": "Baixo",
    "schemas.text.fontName": "Nome da Fonte",
    "schemas.text.size": "Tamanho",
    "schemas.text.spacing": "Espaçamento",
    "schemas.text.textAlign": "Alinhamento do Texto",
    "schemas.text.verticalAlign": "Alinhamento Vertical",
    "schemas.text.lineHeight": "Tamanho da Linha",
    "schemas.text.min": "Mínimo Texto",
    "schemas.text.max": "Máximo Texto",
    "schemas.text.fit": "Encaixar texto",
    "schemas.text.dynamicFontSize": "Tamanho Dinâmico",
    "schemas.barcodes.barColor": "Cor da Barra",
    //
});

export const generatePDF = async (
    currentRef: Designer | Form | Viewer | null
) => {
    if (!currentRef) return;
    const template = currentRef.getTemplate();
    const inputs =
        typeof (currentRef as Viewer | Form).getInputs === "function"
            ? (currentRef as Viewer | Form).getInputs()
            : template.sampledata ?? [];
    const font = await getFontsData();

    const pdf = await generate({
        template,
        inputs,
        options: { font, title: "pdfme" },
        plugins: getPlugins(),
    });

    const blob = new Blob([pdf.buffer], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob));
};

export const isJsonString = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export const getTemplate = () => template;
