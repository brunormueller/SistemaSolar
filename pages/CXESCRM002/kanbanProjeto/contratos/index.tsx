import { Template, checkTemplate } from "@pdfme/common";
import { Form, Viewer } from "@pdfme/ui";
import { useEffect, useRef, useState } from "react";

import Button from "@/components/Forms/Button";
import { useContractContext } from "@/src/contexts/ContractProvider";
import { capitalizeMonth, getDateTimeBrasil } from "@/utils";
import {
    generatePDF,
    getFontsData,
    getPlugins,
    getTemplate,
    handleLoadTemplate,
} from "@/utils/pdfme/helper";
import { toast } from "react-toastify";

type Mode = "form" | "viewer";

const FormContrato = ({ dadosCard, dadosCliente }: any) => {
    const uiRef = useRef<HTMLDivElement | null>(null);
    const ui = useRef<Form | Viewer | null>(null);

    const { relacionar } = useContractContext();

    const initTemplate = () => {
        let template: Template = getTemplate();
        try {
            const templateString = localStorage.getItem("template");

            const templateJson = templateString
                ? JSON.parse(relacionar(templateString, dadosCliente))
                : getTemplate();
            checkTemplate(templateJson);
            template = templateJson as Template;
        } catch {
            localStorage.removeItem("template");
        }
        return template;
    };

    const [mode, setMode] = useState<Mode>(
        (localStorage.getItem("mode") as Mode) ?? "form"
    );

    useEffect(() => {
        const template = initTemplate();
        let inputs = template.sampledata ?? [{}];
        try {
            const inputsString = localStorage.getItem("inputs");
            const inputsJson = inputsString
                ? JSON.parse(inputsString)
                : template.sampledata ?? [{}];
            inputs = inputsJson;
        } catch {
            localStorage.removeItem("inputs");
        }

        getFontsData().then((font) => {
            if (uiRef.current) {
                ui.current = new (mode === "form" ? Form : Viewer)({
                    domContainer: uiRef.current,
                    template,
                    inputs,
                    options: {
                        font,
                        labels: { clear: "消去" },
                        theme: {
                            token: {
                                colorPrimary: "#25c2a0",
                            },
                        },
                    },
                    plugins: getPlugins(),
                });
            }
        });

        // return () => {
        //     if (ui.current) {
        //         ui.current.destroy();
        //     }
        // };
    }, [uiRef, mode]);

    const onChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as Mode;
        setMode(value);
        localStorage.setItem("mode", value);
    };

    const onGetInputs = () => {
        if (ui.current) {
            const inputs = ui.current.getInputs();
            // alert(JSON.stringify(inputs, null, 2));
            // alert("Dumped as console.log");
            console.log(inputs);
        }
    };

    const onSetInputs = () => {
        // if (ui.current) {
        //     const prompt = window.prompt("Enter Inputs JSONString") || "";
        //     try {
        //         const json = isJsonString(prompt) ? JSON.parse(prompt) : [{}];
        //         ui.current.setInputs(json);
        //     } catch (e) {
        //         alert(e);
        //     }
        // }
    };

    const onSaveInputs = () => {
        if (ui.current) {
            const inputs = ui.current.getInputs();
            localStorage.setItem("inputs", JSON.stringify(inputs));
            toast.success("Salvo");
        }
    };

    const onResetInputs = () => {
        localStorage.removeItem("inputs");
        if (ui.current) {
            const template = initTemplate();
            ui.current.setInputs(template.sampledata ?? [{}]);
        }
    };

    return (
        <div>
            <header
                style={{
                    display: "flex",
                    // alignItems: "center",
                    justifyContent: "space-between",
                    // marginRight: 120,
                    flexDirection: "column",
                }}
            >
                <div>
                    <div>
                        <strong>
                            {mode == "form" ? "Formulário" : "Visualizar"}
                        </strong>
                        <span style={{ margin: "0 1rem" }}>:</span>
                        <input
                            type="radio"
                            onChange={onChangeMode}
                            id="form"
                            value="form"
                            checked={mode === "form"}
                        />
                        <label htmlFor="form">Formulário</label>
                        <input
                            type="radio"
                            onChange={onChangeMode}
                            id="viewer"
                            value="viewer"
                            checked={mode === "viewer"}
                        />
                        <label htmlFor="viewer">Visualizar</label>
                    </div>
                    <label style={{ width: 180 }}>
                        Carregar Template
                        <input
                            type="file"
                            accept="application/json"
                            onChange={(e) => handleLoadTemplate(e, ui.current)}
                        />
                    </label>
                </div>
                <div className="flex flex-row gap-2">
                    <Button type="button" onClick={onGetInputs}>
                        Obter Campos
                    </Button>
                    {/* <span style={{ margin: "0 1rem" }}>/</span> */}
                    <Button type="button" onClick={onSetInputs}>
                        Setar Campos
                    </Button>
                    {/* <span style={{ margin: "0 1rem" }}>/</span> */}
                    <Button type="button" onClick={onSaveInputs}>
                        Salvar Campos
                    </Button>
                    {/* <span style={{ margin: "0 1rem" }}>/</span> */}
                    <Button type="button" onClick={onResetInputs}>
                        Resetar Campos
                    </Button>
                    {/* <span style={{ margin: "0 1rem" }}>/</span> */}
                    <Button
                        type="button"
                        onClick={() => generatePDF(ui.current)}
                    >
                        Gerar PDF
                    </Button>
                </div>
            </header>
            <div
                ref={uiRef}
                style={{ width: "100%", height: `calc(100vh - ${65}px)` }}
            />
        </div>
    );
};

export default FormContrato;
