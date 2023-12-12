import { FormatFields, getDateTimeBrasil } from "@/utils";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";

export function downloadPDF({ data, columns, name, method }: any) {
  const pdf = new jsPDF("landscape", "pt", "a4");

  const rows = data.map((data: any) => {
    let newData: any = {};
    columns.forEach((column: any) => {
      newData[column.header] = data[column.accessorKey];
    });
    return newData;
  });

  columns = createHeaders(columns.map((column: any) => column.header));

  // pdf.text(`Data: ${getDateTimeBrasil()} Consulta de ${name}`, 400, 25, null, null, "center");
  pdf.text(`Data: ${getDateTimeBrasil()} Consulta de ${name}`, 400, 25, {
    align: "center",
  });

  pdf.table(30, 50, rows, columns, { autoSize: true });

  switch (method) {
    case "download":
      pdf.save(
        `Data ${FormatFields.formatarNumerosEspacos(
          getDateTimeBrasil()
        )} Consulta de ${name}`
      );
      break;
    case "copy":
      // Transforme os dados em formato CSV
      const csvData =
        `Data: ${getDateTimeBrasil()} Consulta de ${name}\n` +
        `${columns.map((column: any) => column.name).join(",")}\n` +
        rows.map((row: any) => Object.values(row).join(",")).join("\n");

      // Copie os dados da tabela para a área de transferência
      navigator.clipboard
        .writeText(csvData)
        .then(() => {
          toast.success(
            "Dados da tabela copiados para a área de transferência!"
          );
        })
        .catch((error) => {
          toast.error(
            "Erro ao copiar dados para a área de transferência: ",
            error
          );
        });
      break;
    default:
      break;
  }
}

function createHeaders(keys: any) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 65,
      align: "center",
      padding: 0,
    });
  }
  return result;
}
