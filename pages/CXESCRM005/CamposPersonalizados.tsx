// ARQUIVO COM CAMPOS PERSONALIZADOS DA COLETA

import { Button } from "@material-tailwind/react";
import Container from "../../components/Forms/Container";
import { FaPen } from "react-icons/fa";
import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";
import BasicModal from "../../components/Modal/Modal";
const CamposPersonalizados = () => {
  const [edicao, setEdicao] = useState(false);
  const [campos, setCampos] = useState([
    "IOF",
    "FRETE",
    "MARGEM LUCRO",
    "PRECO FINAL",
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const classesBotoes = "text-xs py-0 h-8 flex items-center gap-1";
  const handleEdicao = () => {
    setEdicao(!edicao);
  };
  return (
    <>
      <Container>
        <div className="flex justify-end gap-3">
          {!edicao ? (
            <div
              onClick={handleEdicao}
              className="bg-stroke p-2 cursor-pointer rounded-md"
            >
              <FaPen />
            </div>
          ) : (
            <>
              <Button
                onClick={handleEdicao}
                className={`bg-danger ${classesBotoes}`}
              >
                <AiOutlineCloseCircle />
                Cancelar
              </Button>
              <Button
                onClick={() => setModalVisible(!modalVisible)}
                className={`bg-success ${classesBotoes}`}
              >
                <AiOutlinePlus />
                Adicionar
              </Button>
            </>
          )}
        </div>
        {/* {modalVisible && (<BasicModal opened={modalVisible} onClose={() => setModalVisible(!modalVisible)} />)} */}
        <div className="grid">
          {campos.map((item, index) => (
            <div className="flex items-center p-1" key={index}>
              <div>
                <input
                  type="text"
                  className="border-[1px] rounded-md border-primary"
                  // value={editedValue}
                  // onChange={(e) => setEditedValue(e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default CamposPersonalizados;
