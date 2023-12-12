import Button from "@/components/Forms/Button";
import InputSelectComponent from "@/components/Forms/InputSelect";
import ModalReact from "@/components/Modal/ModalReact";
import { alterarListaDadosKanban } from "@/requests/CRM/kanban";
import FunilContext from "@/src/contexts/boardContext";
import { GetForm } from "@/utils";
import { useContext, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaTrash } from "react-icons/fa";
import { MdDragIndicator, MdEdit } from "react-icons/md";
import * as yup from "yup";

const Step = ({ step, funil, funis, index, atualizarFunis, ...rest }: any) => {
  const [showStepButtons, setShowStepButtons] = useState(false);
  const [isEditStepTitle, setIsEditStepTitle] = useState(false);
  const [stepTitle, setStepTitle] = useState(step.titulo_kanban);
  const [showDeleteStep, setShowDeleStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [yupDeleteStepSchema, setYupDeleteStepSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));

  const { handleSubmit, ...formDeleteStep } = GetForm(
    yupDeleteStepSchema,
    setYupDeleteStepSchema
  );

  const { moveFunil }: any = useContext(FunilContext);
  const ref: any = useRef(null);
  let memTime = 0;

  const handleShowDeleteStep = () => {
    setShowDeleStep(!showDeleteStep);
  };

  const deleteStep = (data: any) => {
    // Mudar a etapa que contêm os cards para não perdê-los
    if (data.id_etapa_destino != undefined) {
      alterarListaDadosKanban({
        ...data,
        id_etapa_origem: step.id_kanban,
      });
    }

    // Atualize o estado excluindo o passo com o stepId especificado
    // Atualize o estado com os passos atualizados
    atualizarFunis(
      (funis: any) =>
        funis.map((funnel: any) => ({
          ...funnel,
          listas_kanban: funnel.listas_kanban.filter(
            (s: any) => s.id_kanban !== step.id_kanban
          ),
        })),
      false
    ).then(() => handleShowDeleteStep());
  };

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "step", index, funilIndex: funil.index_kanban },
    type: "step",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end(item: any, monitor) {
      atualizarFunis((funis: any) => funis, false);
    },
  });
  const [, dropRef] = useDrop({
    accept: "step",
    hover(item: any, monitor) {
      var date = new Date();
      var now = date.getTime();
      if (memTime == 0) memTime = now;
      const draggedListIndex = item.funilIndex;
      const targetListIndex = funil.index_kanban;
      // console.log(draggedListIndex);
      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset: any = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }
      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }
      moveFunil(draggedListIndex, targetListIndex, draggedIndex, targetIndex);
      item.index = targetIndex;
      item.funilIndex = targetListIndex;
    },
    drop: (item: any, monitor) => {
      var date = new Date();
      var now = date.getTime();
      if (memTime == 0) memTime = now;
      const draggedListIndex = item.funilIndex;
      const targetListIndex = funil.index_kanban;
      // console.log(draggedListIndex);
      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset: any = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }
      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }
      moveFunil(
        draggedListIndex,
        targetListIndex,
        draggedIndex,
        targetIndex,
        true
      );
      item.index = targetIndex;
      item.funilIndex = targetListIndex;
    },
  });
  dragRef(dropRef(ref));

  return (
    <li
      ref={ref}
      onMouseOver={() => setShowStepButtons(true)}
      onMouseOut={() => setShowStepButtons(false)}
      className={`flex ${
        isDragging
          ? "bg-transparent transition-all ease-linear shadow-none  border-2 border-dashed border-[rgba(0,0,0,0.2)]"
          : ""
      }
      flex-row justify-between items-center   p-2 bg-black bg-opacity-10 rounded-md`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "-webkit-grabbing" : "grab",
      }}
    >
      <div className=" transition-all ">
        {isEditStepTitle ? (
          <input
            defaultValue={step.titulo_kanban}
            placeholder={step.titulo_kanban}
            onInput={(e: any) => setStepTitle(e.target.value)}
            className="dark:bg-black p-2 rounded-md w-[100%]"
          />
        ) : (
          <>
            <div className="font-bold">{step.titulo_kanban}</div>
            <div>{step.titulo_kanban}</div>
          </>
        )}
      </div>
      <div className="flex flex-row items-center">
        {showStepButtons && (
          <>
            <button
              className="p-2 hover:bg-black-2 hover:bg-opacity-10 rounded-full"
              onClick={() => {
                if (isEditStepTitle) {
                  atualizarFunis((prevFunis: any) => {
                    prevFunis.map((f: any) => {
                      if (f.id_kanban == funil.id_kanban) {
                        funil.listas_kanban.map((s: any) => {
                          if (s.id_kanban == step.id_kanban) {
                            s.titulo_kanban = stepTitle;
                          }
                          return s;
                        });
                      }
                      return f;
                    });
                    return prevFunis;
                  });
                }
                setIsEditStepTitle(!isEditStepTitle);
              }}
            >
              <MdEdit />
            </button>
            <button className="p-2 hover:bg-black-2 hover:bg-opacity-10 rounded-full">
              <FaTrash onClick={handleShowDeleteStep} />
            </button>
          </>
        )}
        <MdDragIndicator />
      </div>
      <ModalReact
        title={`Confirma deletar ${step.titulo_kanban}`}
        open={showDeleteStep}
        onClose={handleShowDeleteStep}
      >
        <form
          onSubmit={handleSubmit(deleteStep)}
          className="p-4"
          style={{
            height: "427px",
          }}
        >
          <div>
            {step.cards_kanban.length > 0 ? (
              <>
                <div>Selecione uma etapa para enviar os cards</div>
                <InputSelectComponent
                  name="id_etapa_destino"
                  label="Etapa"
                  formulario={formDeleteStep}
                  options={funis
                    .map((f: any) => f.listas_kanban)
                    .flat()
                    .filter((e: any) => e.id_kanban != step.id_kanban)
                    .map((f: any) => ({
                      value: f.id_kanban,
                      label: f.titulo_kanban,
                    }))}
                  error="Selecione uma etapa disponível"
                  required
                />
              </>
            ) : (
              <>
                <div>
                  Tem certeza que deseja continuar com a deleção da etapa?
                </div>
              </>
            )}
          </div>
          <div className="w-full flex flex-row items-center justify-center gap-3 pt-4">
            <Button
              type="button"
              onClick={handleShowDeleteStep}
              className="bg-body"
            >
              Cancelar
            </Button>
            <Button loading={isLoading}>Salvar</Button>
          </div>
        </form>
      </ModalReact>
    </li>
  );
};

export default Step;
