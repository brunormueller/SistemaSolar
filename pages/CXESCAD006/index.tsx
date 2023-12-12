import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import ReactTable from "@/components/ReactTable/ReactTable";
import { editarInstituicao } from "@/requests/CRUD/InstituicaoFinanceira/editarInstituicao";
import { listarInstituicao } from "@/requests/CRUD/InstituicaoFinanceira/listarInstituicao";
import { FormatFields } from "@/utils";
import FormInstituicao from "../CXESCAD006/FormInstituicao";

const ConsultaRegiaoVenda = () => {
  const arrayTaxas = [6, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120];

  const columns = [
    {
      header: "ID",
      accessorKey: "id_inst",
    },
    {
      header: "Código",
      accessorKey: "codigo_inst",
    },
    {
      header: "Nome",
      accessorKey: "nome_inst",
    },
    ...arrayTaxas.map((taxa) => ({
      header: `Taxa de Juros ${taxa} (PF) `,
      accessorKey: `jurosPF${taxa}_inst`,
    })),
    ...arrayTaxas.map((taxa) => ({
      header: `Taxa de Juros ${taxa} (PJ) `,
      accessorKey: `jurosPJ${taxa}_inst`,
    })),
    {
      header: "Status Instituição",
      accessorKey: "status_inst",
    },
  ];

  const formatInstituicao = async (arr: any) => {
    return arr.map((estimativa: any) => {
      arrayTaxas.map((taxa) => {
        estimativa[`jurosPF${taxa}_inst`] =
          "R$ " +
          FormatFields.formatarNumero(estimativa[`jurosPF${taxa}_inst`]);
        estimativa[`jurosPJ${taxa}_inst`] =
          "R$ " +
          FormatFields.formatarNumero(estimativa[`jurosPJ${taxa}_inst`]);
      });
      return estimativa;
    });
  };

  const sendEditarEstimativa = async (data: any) => {
    // data["valor_estimativa"] = FormatFields.desformatarNumeros(
    //     data["valor_estimativa"]
    // );
    arrayTaxas.map((taxa) => {
      data[`jurosPF${taxa}_inst`] = FormatFields.desformatarNumeros(
        data[`jurosPF${taxa}_inst`]
      );
      data[`jurosPJ${taxa}_inst`] = FormatFields.desformatarNumeros(
        data[`jurosPJ${taxa}_inst`]
      );
    });
    return editarInstituicao(data);
  };

  return (
    <>
      <Breadcrumb pageName="Consulta Instituição Financeira" />

      <Container>
        <ReactTable
          columns={columns}
          listFunction={listarInstituicao}
          formatFunction={formatInstituicao}
          idCol="id_inst"
          isActiveCol="status_inst"
          canEdit
          canDesactive
          editFunction={sendEditarEstimativa}
          Form={FormInstituicao}
          pageName="Instituição Financeira"
        />
      </Container>
    </>
  );
};

export default ConsultaRegiaoVenda;
