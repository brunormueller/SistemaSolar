import { FormatFields, getDateTimeBrasil } from "@/utils";
import xlsx, { IJsonSheet } from "json-as-xlsx";

export function downloadToExcel({ data, columns, name }: any) {
    let sheet: IJsonSheet[] = [
        { sheet: name, columns: columns.map((column: any) => ({ label: column.header, value: column.accessorKey })), content: data },
    ];

    let settings = { fileName: `Data ${FormatFields.formatarNumerosEspacos(getDateTimeBrasil())} ${name}` };

    xlsx(sheet, settings);
}
