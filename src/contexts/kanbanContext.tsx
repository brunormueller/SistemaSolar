import React, { createContext } from "react";

const KanbanContext = createContext({
  updateKanban: false,
  setUpdateKanban: () => {},
});

export default KanbanContext;
