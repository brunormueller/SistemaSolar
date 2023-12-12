import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export class FormatFields {
  static formatarTelefone = (value: string) => {
    // A função formatará o telefone no formato "(99) 99999-9999"
    value = value.slice(0, 15).replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    return value;
  };
  static formatarDataHora(dataHora: any) {
    const data = new Date(dataHora);
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const hora = data.getHours();
    const minutos = data.getMinutes();

    // Adicione zero à esquerda para dias, meses, horas e minutos menores que 10
    const diaFormatado = dia < 10 ? `0${dia}` : dia;
    const mesFormatado = mes < 10 ? `0${mes}` : mes;
    const horaFormatada = hora < 10 ? `0${hora}` : hora;
    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;

    return `${diaFormatado}/${mesFormatado}, ${horaFormatada}:${minutosFormatados}`;
  }

  static formatarDataCalendar = (date: Date) => {
    if (!(date instanceof Date)) {
      // Se 'date' não for uma instância de Date, retorne um valor vazio ou trate o erro conforme necessário
      return "";
    }

    // Obtém o dia, mês e ano da data
    const dia = date.getDate();
    const mes = date.getMonth() + 1; // Os meses em JavaScript são baseados em zero, então adicionamos 1
    const ano = date.getFullYear();

    // Formata os componentes de data para que tenham sempre dois dígitos
    const diaFormatado = String(dia).padStart(2, "0");
    const mesFormatado = String(mes).padStart(2, "0");

    // Constrói a data formatada no formato "dd/mm/aaaa"
    const dataFormatada = `${diaFormatado}/${mesFormatado}/${ano}`;

    return dataFormatada;
  };

  static formatarData = (value: string) => {
    // A função formatará a data no formato "dd/mm/aaaa"
    value = value.slice(0, 10).replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "$1/$2");
    return value.replace(/^(\d{2}\/\d{2})(\d)/, "$1/$2");
  };

  static formatarCep = (value: string): string => {
    // A função formatará o CEP no formato "99999-999"
    value = value.slice(0, 9).replace(/\D/g, "");
    return value.replace(/^(\d{5})(\d)/, "$1-$2");
  };

  static formatarCPF = (value: string) => {
    // A função formatará o CEP no formato "999.999.999-99"
    value = value.slice(0, 14);
    if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
      value = value.replace(/\D/g, "");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1})$/, "$1-$2");
    }
    return value;
  };

  static formatarCNPJ = (value: string) => {
    value = value.slice(0, 18).replace(/\D/g, "");
    // Aplica a formatação do CNPJ: 00.000.000/0000-00
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
    return value;
  };

  static formatarNumerico = (value: any) => {
    let numericValue = value.replace(/[^\d]/g, "");
    return numericValue;
  };

  static formatarNumero = (value: any) => {
    let numericValue = value.replace(/[^\d]/g, "");

    // Remove zeros à esquerda desnecessários
    numericValue = numericValue.replace(/^0+/, "");

    if (numericValue.length === 0 || parseInt(numericValue) === 0) {
      return "0,00";
    }

    // Divide a parte inteira da parte decimal
    const integerPart = numericValue.slice(0, -2) || "0";
    const decimalPart = numericValue.slice(-2).padStart(2, "0");

    // Formata a parte inteira com separadores de milhares
    let formattedIntegerPart = "";
    for (let i = integerPart.length - 1, j = 1; i >= 0; i--, j++) {
      formattedIntegerPart = integerPart[i] + formattedIntegerPart;
      if (j % 3 === 0 && i !== 0) {
        formattedIntegerPart = "." + formattedIntegerPart;
      }
    }

    // Combina a parte inteira e a parte decimal
    const formattedPrice = `${formattedIntegerPart},${decimalPart}`;

    return formattedPrice;
  };

  static formatarNumeroPreciso = (value: any) => {
    let numericValue = value.replace(/[^\d]/g, "");

    // Remove zeros à esquerda desnecessários
    numericValue = numericValue.replace(/^0+/, "");

    if (numericValue.length === 0 || parseInt(numericValue) === 0) {
      return "0,0000000";
    }

    // Divide a parte inteira da parte decimal
    const integerPart = numericValue.slice(0, -7) || "0";
    const decimalPart = numericValue.slice(-7).padStart(7, "0");

    // Formata a parte inteira com separadores de milhares
    let formattedIntegerPart = "";
    for (let i = integerPart.length - 1, j = 1; i >= 0; i--, j++) {
      formattedIntegerPart = integerPart[i] + formattedIntegerPart;
      if (j % 3 === 0 && i !== 0) {
        formattedIntegerPart = "." + formattedIntegerPart;
      }
    }

    // Combina a parte inteira e a parte decimal
    const formattedPrice = `${formattedIntegerPart},${decimalPart}`;

    return formattedPrice;
  };

  static formatarNumerosEspacos(value: any) {
    // Remove todos os caracteres que não são números ou espaços.
    value = value.replace(/[^0-9 ]/g, "");

    // Remove todos os espaços em branco múltiplos.
    value = value.replace(/\s+/g, " ");

    return value;
  }

  static formatarLetras = (value: any): string => {
    // Remove caracteres não alfabéticos e espaços extras usando uma expressão regular
    const letrasEspacosApenas = value
      .replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]+/g, "")
      .replace(/\s+/g, " ")
      .trimStart();
    return letrasEspacosApenas;
  };

  static formatarLetrasNumeros = (value: any): string => {
    // Remove caracteres não alfanuméricos e espaços extras usando uma expressão regular
    const alfanumericosEspacosApenas = value
      .replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]+/g, "")
      .replace(/\s+/g, " ")
      .trimStart();
    return alfanumericosEspacosApenas;
  };
  static formatarHora = (value: any): string => {
    // Remova todos os caracteres não numéricos da entrada
    const horaNumerica = value.replace(/[^0-9]/g, "");

    // Verifique se a hora numérica tem pelo menos 2 dígitos
    if (horaNumerica.length >= 2) {
      // Extraia os primeiros dois dígitos para as horas
      const horas = horaNumerica.slice(0, 2);

      // Os dígitos restantes (a partir do terceiro dígito) representam os minutos
      const minutos = horaNumerica.slice(2);

      // Formate a hora no formato "hh:mm"
      const horaFormatada = `${horas}:${minutos}`;
      return horaFormatada;
    } else {
      // Se não houver pelo menos 2 dígitos numéricos, retorne "--:--"
      return "--:--";
    }
  };

  static formatarMesAno = (value: any): string => {
    value = value.slice(0, 7).replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "$1/$2");
    return value.replace(/^(\d{2})(\d)/, "$1/$2");
  };

  static desformatarNumeros = (value: any): string => {
    if (
      typeof value === "string" &&
      (value.includes(".") || value.includes(","))
    ) {
      return value.replace(".", "").replace(",", ".");
    }
    return value;
  };
}

export function GetForm(
  yupSchema: yup.ObjectSchema<{}, yup.AnyObject, {}, "">,
  setYupSchema: Dispatch<
    SetStateAction<yup.ObjectSchema<{}, yup.AnyObject, {}, "">>
  >
) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({ resolver: yupResolver(yupSchema) });

  return {
    register,
    errors,
    control,
    yupSchema,
    setYupSchema,
    handleSubmit,
    setValue,
    clearErrors,
  };
}

export function valueLabel(arr: any[], label: string, value: string) {
  return arr.map((element: any) => {
    return {
      label: element[label],
      value: element[value],
    };
  });
}

export function getDateTimeBrasil(options = {}) {
  options = {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    ...options,
  };

  const dataHora = new Date()
    .toLocaleString("pt-BR", options as any)
    .replace(",", "");
  return dataHora;
}

export function capitalizeMonth(data: string) {
  const month = data.split(" ")[2];
  return data.replace(
    month,
    month[0].toUpperCase() + month.slice(1).replace(" ", "")
  );
}
