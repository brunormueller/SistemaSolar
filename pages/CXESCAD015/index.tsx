import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import ReactTable from "@/components/ReactTable/ReactTable";
import { cadastrarDisjuntor } from "@/requests/CRUD/disjuntor/cadastroDisjuntor";
import { editarDisjuntor } from "@/requests/CRUD/disjuntor/editarDisjuntor";
import { listarDisjuntor } from "@/requests/CRUD/disjuntor/listarDisjuntos";
import { FormatFields } from "@/utils";
import { FieldValues } from "react-hook-form";
import FormDisjuntor from "../CXESCAD015/FormDisjuntor";

const ConsultaDisjuntor = () => {
  const columns = [
    {
      header: "ID",
      accessorKey: "id_disjuntor",
    },
    {
      header: "Status disjuntor",
      accessorKey: "status_disjuntor",
    },
    {
      header: "Marca",
      accessorKey: "marca_disjuntor",
    },
    {
      header: "Modelo",
      accessorKey: "modelo_disjuntor",
    },
    {
      header: "Preço Venda",
      accessorKey: "precovenda_disjuntor",
    },
    {
      header: "Origem",
      accessorKey: "origem_disjuntor",
    },
    {
      header: "Corrente Nominal",
      accessorKey: "correntenominal_disjuntor",
    },
    {
      header: "Curva Disparo",
      accessorKey: "curva_disparo_disjuntor",
    },
    {
      header: "Numero de Polos",
      accessorKey: "nro_polos_disjuntor",
    },
    {
      header: "Tensão VCA",
      accessorKey: "tensaovca_disjuntor",
    },
    {
      header: "Tensão VCC",
      accessorKey: "tensaovcc_disjuntor",
    },
  ];
  const formatDisjuntor = async (arr: any) => {
    return arr.map((material: any) => {
      material["precovenda_disjuntor"] =
        "R$ " + FormatFields.formatarNumero(material["precovenda_disjuntor"]);
      material["correntenominal_disjuntor"] =
        "A" +
        FormatFields.formatarNumero(material["correntenominal_disjuntor"]);
      material["tensaovca_disjuntor"] =
        "Vca " + FormatFields.formatarNumero(material["tensaovca_disjuntor"]);
      material["tensaovcc_disjuntor"] =
        "Vcc " + FormatFields.formatarNumero(material["tensaovcc_disjuntor"]);
      return material;
    });
  };

  const sendEditarDisjuntor = async (data: any) => {
    data["precovenda_disjuntor"] = FormatFields.desformatarNumeros(
      data["precovenda_disjuntor"]
    );
    data["correntenominal_disjuntor"] = FormatFields.desformatarNumeros(
      data["correntenominal_disjuntor"]
    );
    data["tensaovca_disjuntor"] = FormatFields.desformatarNumeros(
      data["tensaovca_disjuntor"]
    );
    data["tensaovcc_disjuntor"] = FormatFields.desformatarNumeros(
      data["tensaovcc_disjuntor"]
    );
    return editarDisjuntor(data);
  };

  const onSubmitFunction = (data: FieldValues) => {
    data["precovenda_disjuntor"] = FormatFields.desformatarNumeros(
      data["precovenda_disjuntor"]
    );
    data["correntenominal_disjuntor"] = FormatFields.desformatarNumeros(
      data["correntenominal_disjuntor"]
    );
    data["tensaovca_disjuntor"] = FormatFields.desformatarNumeros(
      data["tensaovca_disjuntor"]
    );
    data["tensaovcc_disjuntor"] = FormatFields.desformatarNumeros(
      data["tensaovcc_disjuntor"]
    );
    return cadastrarDisjuntor(data);
  };

  return (
    <>
      <Breadcrumb pageName="Consulta de Disjuntor" />
      <Container>
        <ReactTable
          pageName="Edição de Disjuntor"
          columns={columns}
          listFunction={listarDisjuntor}
          formatFunction={formatDisjuntor}
          idCol="id_disjuntor"
          isActiveCol="status_disjuntor"
          canEdit
          canDesactive
          createFunction={onSubmitFunction}
          editFunction={sendEditarDisjuntor}
          Form={FormDisjuntor}
        />
      </Container>
    </>
  );
};

export default ConsultaDisjuntor;
