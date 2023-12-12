import Button from "@/components/Forms/Button";
import Input from "@/components/Forms/Input";
import InputVerification from "@/components/Forms/InputVerification";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  criarNovaSenha,
  enviarEmail,
  login,
  verificaCodigoEmail,
} from "@/requests/common/Login/login";
import { useAuth } from "@/src/contexts/authContext";
import { GetForm } from "@/utils";
import Image from "next/image";
import router from "next/router";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { BiSolidLock } from "react-icons/bi";
import * as yup from "yup";
import EmailImage from "../public/images/geral/sendemail.png";
import LogoLinksun from "../public/images/logo/logo-linksun-4.png";

function SignIn() {
  const [firstLogin, setFirstLogin] = useState(false);
  const [timer, setTimer] = useState(30);
  const { authLogin, valuesSession, validateSession } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [inserirCodigo, setInserirCodigo] = useState(false);
  const [guardarEmail, setGuardarEmail] = useState<any>([]);
  const [redefinePass, setRedefinePass] = useState(false);
  const [recoverYupSchema, setRecoverYupSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const [passwordYupScheme, setPasswordYupScheme] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const [loginYupSchema, setLoginYupSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));

  const { handleSubmit: loginHandleSubmit, ...loginForm } = GetForm(
    loginYupSchema,
    setLoginYupSchema
  );
  const { handleSubmit: recoverHandleSubmit, ...recoverForm } = GetForm(
    recoverYupSchema,
    setRecoverYupSchema
  );

  const { handleSubmit: passwordHandleSubmit, ...validatePass } = GetForm(
    passwordYupScheme,
    setPasswordYupScheme
  );

  useEffect(() => {
    const esst = valuesSession();
    if (validateSession() && esst.token) {
      router.push("./dashboard");
    }
  }, []);

  const handleLogin = async (data: FieldValues) => {
    setIsLoading(true);
    console.log(data);
    login(data)
      .then((response) => {
        const token = response;
        authLogin(token);
        if (response["primeiro_login"] == 1) {
          (document.getElementById("openModal") as HTMLElement).click();
          setFirstLogin(true);
          setGuardarEmail(response["email_usuario"]);
        } else {
          router.push("./app");
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleChangePass = (data: FieldValues) => {
    setIsLoading(true);
    setGuardarEmail(data["email_usuario"]);
    enviarEmail(data)
      .then((result) => {
        setInserirCodigo(true);
      })
      .finally(() => {
        setIsLoading(false);
        setTimer(30);
      });
  };

  const handleChangeUserPass = (data: FieldValues) => {
    data["email"] = guardarEmail;
    criarNovaSenha(data).then((response) => {
      (document.getElementById("closeID") as HTMLElement).click();
    });
  };

  const handleValidade = (data: FieldValues) => {
    console.log(data);
    const codigoEmailValues = {
      codigo_email: data.codigo_codigo_email
        .filter((value: any) => typeof value === "string")
        .join(""),
    };
    console.log(codigoEmailValues);
    setIsLoading(true);
    verificaCodigoEmail(codigoEmailValues)
      .then((result) => {
        setRedefinePass(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleResendPass = () => {
    enviarEmail({ email_usuario: guardarEmail });
    // setTimer(30);
  };

  useEffect(() => {
    let interval: any;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url('/images/cover/logo-linksun-2.png')`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "29rem",
        backgroundSize: "cover",
      }}
    >
      <div className="rounded-sm border w-2/5  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full justify-center">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5 justify-center">
              <span className="mb-1.5 block font-semibold text-center text-lg  dark:text-white text-black">
                Bem vindo
              </span>

              <div className="justify-center flex">
                <Image width={230} height={32} src={LogoLinksun} alt="Logo" />
              </div>

              <form onSubmit={loginHandleSubmit(handleLogin)}>
                <div className="mb-4">
                  <div className="relative">
                    <Input
                      formulario={loginForm}
                      name="login_usuario"
                      label="Usuario"
                      autoComplete="off"
                      // className="w-full px-4 py-3 mt-1 "
                      required
                      error="Preencha o Login"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <Input
                    formulario={loginForm}
                    name="senha_usuario"
                    label="Senha"
                    // className="w-full px-4 py-3 mt-1  rounded-md "
                    type="password"
                    required
                    error="Preencha a senha"
                  />
                </div>
                <Button loading={isLoading} className="w-full bg-primary">
                  Entrar
                </Button>
              </form>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex justify-center">
                    <button id="openModal" className="pt-3">
                      <a
                        href="#"
                        className="hover:underline text-sm "
                        onClick={() => {
                          setInserirCodigo(false);
                          setRedefinePass(false);
                          setFirstLogin(false);
                        }}
                      >
                        Esqueceu a senha?
                      </a>
                    </button>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  {!inserirCodigo && !firstLogin && (
                    <>
                      <div className="flex flex-col justify-center w-full items-center gap-3">
                        <div className=" bg-primary w-30 h-30 flex flex-col items-center justify-center text-white rounded-full ">
                          <BiSolidLock size={75} />
                        </div>
                        <h1 className="text-2xl text-black-2 pt-3 dark:text-white">
                          <strong>Esqueceu Sua Senha?</strong>
                        </h1>
                        <h1 className="text-black-2  dark:text-white">
                          <span>
                            Insira um Email valido para a redefinição de senha
                          </span>
                        </h1>
                      </div>

                      <form onSubmit={recoverHandleSubmit(handleChangePass)}>
                        <Input
                          name="email_usuario"
                          label="email"
                          formulario={recoverForm}
                          type="email"
                          required
                          error="Preencha o Email"
                        />
                        <div className="flex items-center justify-center pt-10 ">
                          <Button
                            className="w-full bg-primary"
                            loading={isLoading}
                          >
                            Enviar Email
                          </Button>
                        </div>
                      </form>
                    </>
                  )}
                  {!redefinePass && inserirCodigo && (
                    <>
                      <div className="">
                        <Image alt="x" src={EmailImage} />
                        <div className=" text-black-2 flex flex-col justify-center items-center dark:text-white gap-3">
                          <h1 className="text-2xl pt-3">
                            <strong>Código De Segurança</strong>
                          </h1>
                          <span> Por Favor preencha o Código enviado ao</span>
                          <span className="italic">
                            <strong> E-mail: {guardarEmail} </strong>
                          </span>
                        </div>
                      </div>

                      <InputVerification handleValidade={handleValidade}>
                        {" "}
                        <div className="flex justify-between mb-5 mt-2">
                          <button type="button" disabled={timer > 0}>
                            <span
                              className="text-sm  dark:text-white"
                              onClick={handleResendPass}
                            >
                              Reenviar Código {timer > 0 && `(${timer}s)`}
                            </span>
                          </button>
                          <button type="button">
                            <span
                              className="text-sm"
                              onClick={() => {
                                setInserirCodigo(!inserirCodigo);
                              }}
                            >
                              Trocar Email
                            </span>
                          </button>
                        </div>
                        <div className="flex items-center justify-center pt-6">
                          <Button
                            className="w-full bg-primary"
                            loading={isLoading}
                          >
                            Confirmar
                          </Button>
                        </div>
                      </InputVerification>
                    </>
                  )}
                  {(redefinePass || firstLogin) && (
                    <>
                      <div className="flex flex-col justify-center w-full items-center">
                        <h1 className="text-2xl text-black-2 pt-3  dark:text-white">
                          <strong>Digite Sua Nova Senha!</strong>
                        </h1>
                        <h1 className="text-black-2  dark:text-white">
                          <span>Senha para o email: {guardarEmail}</span>
                        </h1>
                        <div className=" text-black-2 text-center bg-[#3b38f6] font-semibold border border-primary rounded-md bg-opacity-20 text-[15px] p-2 mt-6">
                          Deve conter pelo menos um caractere especial, uma
                          letra maiúscula, uma letra minúscula, um número e 8
                          digitos
                        </div>
                        {/* <Tooltip title="Exemplo22@#">
                                                        <a className="text-black-2  dark:text-white text-sm pt-5 hover:underline ">
                                                            Padrão da senha
                                                        </a>
                                                    </Tooltip> */}
                      </div>
                      <form
                        className="flex flex-col gap-4"
                        onSubmit={passwordHandleSubmit(handleChangeUserPass)}
                      >
                        <Input
                          name="senha_usuario"
                          label="Senha"
                          type="password"
                          placeholder="Digite sua senha"
                          isPassword
                          formulario={validatePass}
                          required
                          error="Digite sua senha!"
                        />
                        <Input
                          name="senha_usuario_confirmação"
                          label="Confirmar Senha"
                          placeholder="Digite sua senha"
                          equals={"senha_usuario"}
                          formulario={validatePass}
                          type="password"
                          isPassword
                          required
                          error="Digite sua senha!"
                        />
                        <div className="flex items-center justify-center pt-3 mt-3">
                          <Button
                            className="w-full bg-primary"
                            loading={isLoading}
                          >
                            Confirmar
                          </Button>
                        </div>
                      </form>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
