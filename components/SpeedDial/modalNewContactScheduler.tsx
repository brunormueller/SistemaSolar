import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarUsuario } from "@/requests/CRM/agenda";
import { listarPerfis } from "@/requests/CRUD/Perfil/listarPerfis";
import {
  ICidade,
  IEstado,
  listarCidades,
  listarEstados,
} from "@/requests/common/EstadosCidades/estadosCidades";
import { useAuth } from "@/src/contexts/authContext";
import { IValueLabel } from "@/types/formInterfaces";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Button from "../Forms/Button";
import router from "next/router";
import {
  cadastrarNovoContato,
  listarOrigemCliente,
} from "@/requests/CRUD/Cliente/cadastroCliente";
import { FieldValues } from "react-hook-form";

const NewContactScheduler = ({
  onSubmitFunction,
  defaultValues,
  disabledFields,
  children,
  hasGerarProposta,
  ...rest
}: any) => {
  const [yupSchema, setYupSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));

  const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);
  const [dadosEstado, setDadosEstado] = useState<any[]>([]);
  const [cidades, setCidades] = useState<any[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<any>();
  const [origemCliente, setOrigemCliente] = useState<any[]>([]);
  const [usuario, setUsuario] = useState([]);
  const { logout, valuesSession } = useAuth();

  const { session } = valuesSession();
  const id_usuario = session.id_usuario;
  const perfilUsuario = session.perfil_usuario;

  const [perfil, setPerfil] = useState([]);
  const [representanteDesabilitado, setRepresentanteDesabilitado] =
    useState(false);

  // console.log(perfil_usuario);
  // console.log(id_usuario);

  useEffect(() => {
    listarEstados().then((arr) => setDadosEstado(arr));
    listarCidades().then((arr) => setCidades(arr));
  }, []);

  useEffect(() => {
    listarOrigemCliente().then((response) => {
      setOrigemCliente(response);
    });
  }, []);

  const array = [
    { value: "1", label: "Site" },
    { value: "2", label: "Mídias Sociais" },
    { value: "3", label: "Outdoor" },
    { value: "4", label: "Indicação" },
    { value: "5", label: "Google" },
    { value: "6", label: "Rádio" },
    { value: "7", label: "Outros Meios" },
  ];

  const handleGerarProposta = (data: FieldValues) => {
    console.log(data);

    cadastrarNovoContato(data).then((res: any) => {
      console.log(res);

      const queryParamsObj = {
        id_cliente: data.id_cliente,
        nome_cliente: data.nome_cliente,
        telefone1_cliente: data.telefone1_cliente,
        cidade_estado_cliente: `${data.cidade_cliente} - ${data.estado_cliente}`,
      };
      localStorage.setItem("NovoContato", JSON.stringify(queryParamsObj));
      router.push(`/CXESCRM005`);
    });
  };

  useEffect(() => {
    const buscarUsuario = async () => {
      await listarUsuario().then(async (res) => {
        await listarPerfis().then((resPerfil) => {
          setRepresentanteDesabilitado(
            res
              .filter((element: any) => element.id_usuario == id_usuario)
              .some((rep: any) => {
                return resPerfil
                  .filter((element: any) => element.vendedor_perfil == 1)
                  .some((perfil: any) => {
                    return perfil.id_perfil === rep.perfil_usuario;
                  });
              })
          );
        });
        setUsuario(
          res.map((usuario: any) => ({
            value: usuario.id_usuario,
            label: usuario.nome_usuario,
          }))
        );
      });
    };
    buscarUsuario();
  }, [id_usuario]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
        <div className="flex flex-col gap-5 p-3">
          {/* <button type="button" onClick={() => console.log(perfil)}>
          teste do botao
        </button> */}
          <InputGroup>
            <Input
              formulario={form}
              label="Nome"
              name="nome_cliente"
              type="text"
              mascara="letras"
              required
              error={"Preencha o nome!"}
            />

            {
              <InputSelectComponent
                formulario={form}
                label="Representante"
                name="responsavel_cliente"
                options={usuario}
                required
                error={"Preencha o Representante!"}
                disabled={representanteDesabilitado}
                defaultValue={
                  representanteDesabilitado ? id_usuario : undefined
                }
              />
            }
          </InputGroup>

          <InputGroup>
            <Input
              formulario={form}
              label="Telefone"
              name="telefone1_cliente"
              mascara="telefone"
              required
              error={"Preencha o Telefone!"}
            />

            <InputSelectComponent
              formulario={form}
              label="Como nos conheceu?"
              name="origem_cliente"
              options={origemCliente.map((res: any) => ({
                label: `${res.nome_origem_cliente}`,
                value: `${res.id_origem_cliente}`,
              }))}
              required
              error={"Preencha o Campo!"}
              autoComplete="off"
            />
          </InputGroup>

          <InputGroup>
            <Input
              formulario={form}
              label="E-mail"
              name="email_cliente"
              type="email"
              required
              error={"Preencha o E-mail!"}
              autoComplete="off"
            />
          </InputGroup>

          <InputGroup>
            <InputSelectComponent
              name="estado_cliente"
              label="Estado"
              formulario={form}
              options={dadosEstado.map((estado: IEstado) => ({
                label: `${estado.uf_estado} - ${estado.nome_estado}`,
                value: `${estado.uf_estado}`,
              }))}
              error={"Selecione o Estado!"}
              required
              defaultValue={defaultValues && defaultValues["estado_usuario"]}
              disabled={disabledFields?.some(
                (field: string) => field == "estado_usuario"
              )}
              onChange={(e: any) => setEstadoSelecionado(e.value)}
            />
            <InputSelectComponent
              name="cidade_cliente"
              label="Cidade"
              formulario={form}
              error={"Preencha a Cidade!"}
              required
              defaultValue={defaultValues && defaultValues["cidade_usuario"]}
              disabled={disabledFields?.some(
                (field: string) => field == "cidade_usuario"
              )}
              options={cidades
                ?.filter(
                  (cidade) =>
                    cidade.estado_cidade ==
                    dadosEstado.find(
                      (estado) => estado.uf_estado == estadoSelecionado
                    )?.id_estado
                )
                ?.map<IValueLabel>((cidade: ICidade) => ({
                  label: cidade.nome_cidade,
                  value: cidade.nome_cidade,
                }))}
            />
          </InputGroup>
        </div>
        <div className="flex flex-row gap-5">
          {children}
          {hasGerarProposta && (
            <Button
              type="button"
              className="bg-primary   "
              onClick={handleSubmit(handleGerarProposta)}
            >
              Gerar Proposta
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default NewContactScheduler;
