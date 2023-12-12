"use client";
import React from "react";
// import TableOne from "../Tables/TableOne";
// import Map from "../Maps/TestMap";

// without this the component renders on server and throws an error
import GraficoClassificacao from "@/pages/CXESCRM004/classificacao";
import GraficoConversaoVendas from "@/pages/CXESCRM004/conversaoVendas";
import GraficoLeads from "@/pages/CXESCRM004/leadsQualificados";
import GraficoMotivoNegocioPerdido from "@/pages/CXESCRM004/motivoNegocioPerdido";
import GraficoOrigemCliente from "@/pages/CXESCRM004/origemCliente";
import GraficoVencidosEtapa from "@/pages/CXESCRM004/vencidosEtapa";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="mt-4">
        <GraficoConversaoVendas />
        <div className="flex">
          <GraficoClassificacao />
          <GraficoOrigemCliente />
        </div>
        <div className="flex">
          <GraficoLeads />
          <GraficoMotivoNegocioPerdido />
        </div>
        <GraficoVencidosEtapa />
      </div>
    </>
  );
};

export default Dashboard;
