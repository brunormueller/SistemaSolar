import { listarUsuarios } from "@/requests/CRUD/Usuario/listarUsuarios";
import { GetForm } from "@/utils";
import { Fragment, useEffect, useState } from "react";
import * as yup from "yup";
import Avatar from "../Avatar";
import LoaderSun from "../common/Loader/LoaderSun";
import { Button } from "../ui/button";
const PopoverResponsaveis = () => {
  const [yupSchema, setYupSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    listarUsuarios().then((res) => {
      setLoading(false);
      setUsuarios(res);
    });
  }, []);
  const toggleUserSelection = (userId: any) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id: any) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <Fragment>
      <div className={`h-90`}>
        <header>Responsáveis</header>
        <div className="flex flex-wrap max-w-full">
          {selectedUsers.map((userId: any) => {
            const user = usuarios.find(
              (usuario) => usuario.id_usuario === userId
            );
            return (
              <span
                className="rounded-full px-2 text-sm w-fit bg-[#4095de] text-white m-1"
                key={user.id_usuario}
              >
                {user.nome_usuario}
              </span>
            );
          })}
        </div>

        <ul
          className={`overflow-auto ${selectedUsers ? "h-73" : "h-80"} ${
            loading && "flex place-content-center"
          } `}
        >
          {loading ? (
            <div className="flex justify-center w-26">
              <LoaderSun />
            </div>
          ) : (
            usuarios &&
            usuarios.map((usuario) => {
              const isSelected = selectedUsers.includes(usuario.id_usuario);

              return (
                <li
                  className={`py-2 flex font-medium text-black items-center gap-2 p-1 m-1 rounded-sm cursor-pointer ${
                    isSelected
                      ? "bg-[#7fb4e3] hover:bg-[#71aee3]"
                      : " hover:bg-stroke"
                  }`}
                  key={usuario.id_usuario}
                  onClick={() => toggleUserSelection(usuario.id_usuario)}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isSelected}
                    onChange={() => toggleUserSelection(usuario.id_usuario)}
                  />
                  <Avatar nome_responsavel={usuario.nome_usuario} />
                  <div className="grid">
                    {usuario.nome_usuario}
                    <span className="font-normal">{usuario.email_usuario}</span>
                  </div>
                </li>
              );
            })
          )}
        </ul>
        <div className="absolute bottom-0 h-12 bg-white w-full">
          <Button className="h-fit mt-1 px-3">
            Adicionar{" "}
            {selectedUsers.length > 0 && "(" + selectedUsers.length + ")"}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default PopoverResponsaveis;
