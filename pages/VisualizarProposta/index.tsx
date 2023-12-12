import Button from "@/components/Forms/Button";
import Input from "@/components/Forms/Input";
import InputSelectComponent from "@/components/Forms/InputSelect";
import ModalComponente from "@/components/Modal/ModalComponente";
import { Skeleton } from "@/components/ui/skeleton";
import Logo from "@/public/images/logo/access-control-system-abstract-concept_335657-3180.jpg";
import { listarMotivoNegocioPerdido } from "@/requests/CRUD/NegociosPerdido/listarMotivoNegocioPerdido";
import { aprovarProposta } from "@/requests/CRUD/Propostas/aprovarProposta";
import { baixarProposta } from "@/requests/CRUD/Propostas/baixarProposta";
import { enviarEmailRepresentante } from "@/requests/CRUD/Propostas/enviarEmailRepresentante";
import { listarPropostasLink } from "@/requests/CRUD/Propostas/listarPropostasLink";
import { loginCliente } from "@/requests/CRUD/Propostas/loginclienteProposta";
import { reprovarProposta } from "@/requests/CRUD/Propostas/reprovarProposta";
import { useAuth } from "@/src/contexts/authContext";
import { GetForm } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { IoMdCheckmark, IoMdDownload } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import * as yup from "yup";

const VisualizarProposta = () => {
    const [openModal, setOpenModal] = useState(true);
    const [openModalRejeitar, setOpenModalRejeitar] = useState(false);
    const router = useRouter();
    const { query } = router;
    const parametroQuery = query.id;
    const { valuesSession } = useAuth();
    const { session } = valuesSession();
    const [isLoading, setIsLoading] = useState(false);
    const [guardaPdf, setGuardaPdf] = useState("");
    const [statusProposta, setStatusProposta] = useState("");
    const [nomeCliente, setNomeCliente] = useState("");
    const [emailRepresentante, setEmailRepresentante] = useState<any>();
    const [nomeRepresentante, setNomeRepresentante] = useState("");
    const [verConteudo, setVerConteudo] = useState(false);
    const [mensagemStatus, setMensagemStatus] = useState<ReactNode>("");
    const [idProposta, setIdProposta] = useState("");
    const [numeroCliente, setNumeroCliente] = useState("");
    const [caminhoAws, setCaminhoAws] = useState("");
    const [motivosReprovacao, setMotivosReprovacao] = useState<any[]>([]);
    const [motivoSelecionado, setMotivoSelecionado] = useState<string>(""); // Corrigir para string
    // const [caminhoAws, setCaminhoAws] = useState("");

    const [yupSchema, setYupSchema] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));

    const [yupSchemaReprovar, setYupSchemaReprovar] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);
    const { handleSubmit: handleReprovar, ...formReprovar } = GetForm(
        yupSchemaReprovar,
        setYupSchemaReprovar
    );

    const listarPropostas = async (parametroQuery: any) => {
        const res = await listarPropostasLink(parametroQuery);
        setGuardaPdf(res["awslink"]);
        setStatusProposta(res["status_proposta"]);
        setNomeCliente(res["nome_cliente"]);
        setNomeRepresentante(res["nome_representante"]);
        setIdProposta(res["id_proposta"]);
        setCaminhoAws(res["caminho_aws"]);
        setEmailRepresentante(res["email_usuario"]);
        setNumeroCliente(res["numero_cliente"]);
    };

    useEffect(() => {
        switch (statusProposta) {
            case "0" || 0:
                setMensagemStatus(
                    <span className="text-primary">Aguardando Aprovação</span>
                );
                break;
            case "1" || 1:
                setMensagemStatus(
                    <span className="text-success">Aprovado</span>
                );
                break;
            case "2" || 2:
                setMensagemStatus(
                    <span className="text-danger">Reprovado</span>
                );
                break;
            case "3" || 3:
                setMensagemStatus(
                    <span className="text-black-2">Obsoleta</span>
                );
                break;
        }
    }, [statusProposta]);

    useEffect(() => {
        if (parametroQuery != undefined) {
            listarPropostas(parametroQuery);
        }
    }, [parametroQuery]);

    useEffect(() => {
        listarMotivoNegocioPerdido().then((res) => {
            console.log(res);

            setMotivosReprovacao(res);
        });
    }, []);

    const onSubmitFunction = (data: FieldValues) => {
        setIsLoading(true);
        loginCliente(data)
            .then(() => {
                enviarEmail();
                setOpenModal(!openModal);
                setVerConteudo(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    const onSubmitReprovar = (data: FieldValues) => {
        if (motivoSelecionado != "1") {
            data["motivoOutros_proposta"] = "";
        }
        data["id_proposta"] = idProposta;
        data["email"] = emailRepresentante;
        data["nome_cliente"] = nomeCliente;
        data["numero_proposta"] = idProposta;
        data["numero_cliente"] = numeroCliente;
        data["titulo_email"] = "Proposta Aprovada";
        data[
            "conteudo_email"
        ] = `Parabens o cliente :${nomeCliente} <strong>Aprovou</strong> a proposta n° ${idProposta} `;
        reprovarProposta(data).then((e) => {
            listarPropostas(parametroQuery);
        });
    };

    const confirmarProposta = (data: any) => {
        data["id_proposta"] = idProposta;
        data["email"] = emailRepresentante;
        data["nome_cliente"] = nomeCliente;
        data["numero_proposta"] = idProposta;
        data["numero_cliente"] = numeroCliente;
        data["titulo_email"] = "Proposta Reprovada";
        data[
            "conteudo_email"
        ] = `Infelizmente o cliente :${nomeCliente} <strong>Reprovou</strong> a proposta n° ${idProposta} `;
        aprovarProposta(data).then((e) => {
            listarPropostas(parametroQuery);
        });
    };

    const baixarPropostaAws = (data: any) => {
        console.log(data);
        baixarProposta(data).then((res) => {
            window.open(res.body);
        });
    };

    const enviarEmail = () => {
        console.log(emailRepresentante);
        enviarEmailRepresentante({
            email: emailRepresentante,
            nome_cliente: nomeCliente,
            numero_proposta: idProposta,
            numero_cliente: numeroCliente,
            titulo_email: "Cliente Acessou a Proposta",
            conteudo_email: `Cliente ${nomeCliente} abriu a proposta n° ${idProposta}`,
        });
    };

    return (
        <>
            <ModalComponente
                hasCloseBtn={false}
                hasForm={false}
                hasSaveButton={false}
                size="md"
                header="Credenciais"
                opened={openModal}
                onClose={() => setOpenModal(!openModal)}
            >
                <div className="flex flex-row ustify-center items-center overflow-hidden t0">
                    <div className="relative -left-8 w-110 h-80 hidden md:flex md:max-lg:flex">
                        <Image alt="Image" src={Logo} />
                    </div>
                    <div className="">
                        <span className="flex text-center text-black-2 text-sm bg-primary bg-opacity-20 rounded-md">
                            Preencha os seus dados abaixo, lembrando que a senha
                            foi enviada ao seu Whatsapp
                        </span>
                        <form
                            className="flex flex-col gap-5"
                            onSubmit={handleSubmit(onSubmitFunction)}
                        >
                            <Input
                                formulario={form}
                                label="Telefone"
                                name="telefone_usuario"
                                mascara="telefone"
                                required
                                error="Preencha o Telefone  "
                            />
                            <Input
                                formulario={form}
                                label="Senha"
                                name="senha_acesso_usuario"
                                type="password"
                                required
                                error="Preencha a Senha"
                            />
                            <Button
                                loading={isLoading}
                                className="w-full bg-primary "
                            >
                                Entrar
                            </Button>
                        </form>
                    </div>
                </div>
            </ModalComponente>
            {verConteudo && (
                <div className="flex justify-center">
                    <div className="flex flex-col justify-center items-center bg-white rounded-2xl w-fit p-10">
                        <div className="w-[400px] h-[150px]">
                            <div className="flex flex-row text-black-2 w-full">
                                <h1 className="text-3xl text-center">
                                    Sua proposta está pronta,{" "}
                                    <strong className="font-medium">
                                        {nomeCliente}
                                    </strong>
                                </h1>
                            </div>
                            <div className="flex flex-row justify-center gap-6 mb-5 mt-4">
                                <Button
                                    type="button"
                                    onClick={() =>
                                        baixarPropostaAws({
                                            caminho: caminhoAws,
                                        })
                                    }
                                    className="flex  justify-center items-center bg-primary text-center text-md rounded-md"
                                >
                                    Downloand {""}
                                    <span className="ml-1">
                                        <IoMdDownload size="22px" />
                                    </span>
                                </Button>
                                {statusProposta == "0" && (
                                    <>
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                Swal.fire({
                                                    icon: "success",
                                                    title: "Confirmação",
                                                    html: `
                                        Tem certeza que deseja  <b>Confirmar</b> a proposta?
                                        `,
                                                    showDenyButton: true,
                                                    confirmButtonText: "Sim",
                                                    denyButtonText: `Não`,
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        confirmarProposta(
                                                            idProposta
                                                        );
                                                    } else {
                                                    }
                                                });
                                            }}
                                            className="flex  justify-center items-center bg-success text-center text-md rounded-md"
                                        >
                                            Aprovar
                                            <span className="ml-1">
                                                <IoMdCheckmark size="22px" />
                                            </span>
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Rejeição",
                                                    html: `
                                       Tem certeza que deseja  <b>Rejeitar</b> a proposta?
                                      `,
                                                    showDenyButton: true,
                                                    confirmButtonText: "Sim",
                                                    denyButtonText: `Não`,
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        setOpenModalRejeitar(
                                                            true
                                                        );
                                                    } else {
                                                    }
                                                });
                                            }}
                                            className="flex  justify-center items-center bg-danger text-center text-md rounded-md tex"
                                        >
                                            Reprovar
                                            <span className="ml-1">
                                                <IoClose size="22px" />
                                            </span>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="bg-secondaryMenu  w-[700px] mb-5 bg-opacity-20 rounded-md text-center text-black-2 ">
                            O status atual da sua proposta é: {mensagemStatus}
                            <br />
                            Gerada por: <strong>{nomeRepresentante}</strong>
                        </div>
                        {guardaPdf == "" ? (
                            <Skeleton className="brightness-90 h-[700px] w-[700px]" />
                        ) : (
                            <div className="flex justify-center">
                                <iframe
                                    src={guardaPdf}
                                    width="700px"
                                    height="700px"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
            <ModalComponente
                hasForm={false}
                header="Reprovação"
                defaultW="w-[400px]"
                opened={openModalRejeitar}
                onClose={() => setOpenModalRejeitar(!openModalRejeitar)}
                hasSaveButton={false}
            >
                <div className="mt-5">
                    <div className="bg-secondaryMenu bg-opacity-30 text-black-2 rounded-lg text-center text-lg mb-5">
                        <span>
                            Por favor, preencha o motivo da{" "}
                            <strong className="text-danger">
                                <i>Reprovação</i>
                            </strong>
                        </span>{" "}
                    </div>

                    <form
                        className="flex flex-col gap-5"
                        onSubmit={handleReprovar(onSubmitReprovar)}
                    >
                        <InputSelectComponent
                            formulario={formReprovar}
                            label="Motivo Reprovação"
                            name="motivo_reprovacao"
                            required
                            error="Escolha Algum Motivo"
                            options={motivosReprovacao.map((res: any) => ({
                                label: `${res.motivo_perdido}`,
                                value: `${res.id_perdido}`,
                            }))}
                            onChange={(e: any) => setMotivoSelecionado(e.value)}
                        />
                        {motivoSelecionado == "1" && (
                            <Input
                                type="textarea"
                                formulario={formReprovar}
                                label="Motivo"
                                name="motivoOutros_proposta"
                                error="Preencha o Motivo"
                            />
                        )}

                        <Button
                            loading={isLoading}
                            className="w-full bg-primary mt-5"
                        >
                            Entrar
                        </Button>
                    </form>
                </div>
            </ModalComponente>
        </>
    );
};

export default VisualizarProposta;
