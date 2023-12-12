// import Input from "@/components/Forms/Input";

// const NewKanban = ({ form }: any) => {
//   const classAside = "h-60 w-full";
//   const classParagraph = "text-sm my-1";
//   const classTipos =
//     "grid p-2 rounded-md opacity-80 hover:opacity-100 cursor-pointer bg-stroke border-[1px] border-strokedark";
//   const handleSelectTipo = (tipo: string) => {
//     form.setValue("tipo_kanban", tipo);
//   };
//   return (
//     <div className="flex h-73">
//       <aside className={classAside}>
//         <p className={classParagraph}>Como você gostaria de chamar?</p>
//         <Input formulario={form} name="titulo_kanban" required />
//         <p className={classParagraph}>Qual o tipo de kanban?</p>
//         <div className="grid gap-1 px-1">
//           <div onClick={() => handleSelectTipo("task")} className={classTipos}>
//             <p className={classParagraph}>Task</p>
//             <p className={classParagraph}>
//               Neste tipo, vai ser possível criar tarefas a partir de uma lista e
//               gerencia-las como quiser.
//             </p>
//           </div>
//           <div
//             onClick={() => handleSelectTipo("projeto")}
//             className={classTipos}
//           >
//             <p className={classParagraph}>Projeto</p>
//             <p className={classParagraph}>
//               Neste tipo, vai ser possível criar tarefas e gerencia-las como
//               quiser
//             </p>
//           </div>
//         </div>
//       </aside>
//       {/* <aside className={classAside}></aside> */}
//     </div>
//   );
// };

// export default NewKanban;
