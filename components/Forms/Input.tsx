import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IInputProps } from "@/types/formInterfaces";
import { CalendarDays } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import * as yup from "yup";
import { FormatFields } from "../../utils";
import { Calendar } from "../ui/calendar";

const Input = ({
  label,
  formulario,
  name,
  width,
  type,
  cols,
  rows,
  mascara,
  defaultValue,
  error,
  required,
  prefix,
  onChange,
  checked = false,
  equals,
  isPassword = false,
  // value,
  ...rest
}: IInputProps) => {
  useEffect(() => {
    if (formulario) {
      const newSchema = formulario.yupSchema.fields;
      newSchema[name] = required ? yup.string().required(error) : yup.string();
      if (equals) {
        newSchema[name] = newSchema[name].oneOf(
          [yup.ref(equals), null],
          "Senhas devem ser iguais!"
        );
      }
      if (isPassword) {
        const upperCaseRegex = /(?=[A-Z])/;
        const lowerCaseRegex = /(?=[a-z])/;
        const numericRegex = /(?=.*[0-9])/;
        const magicRegex = /\W|_/;
        newSchema[name] = newSchema[name]
          .min(8, "Mínimo 8 caracteres")
          .matches(upperCaseRegex, "Ao menos um maiúsculo")
          .matches(lowerCaseRegex, "Ao menos um minúsculo")
          .matches(numericRegex, "Ao menos um número")
          .matches(magicRegex, "Um especial '!@#$'");
      }
      if (type == "email") {
        newSchema[name] = required
          ? yup.string().email("Escreva um email correto!").required(error)
          : yup.string().email("Escreva um email correto!");
      }
      // newSchema[name] = yup.string();
      // if (required) {
      //     newSchema[name] = newSchema[name].required(error);
      // }
      formulario.setYupSchema(yup.object().shape(newSchema));

      if (defaultValue) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        defaultValue = handleFormatInput(false, defaultValue);
        formulario.setValue(name as never, defaultValue as never);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const [visible, setVisible] = useState(false);
  // const handleFormatInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  const handleFormatInput = (event: any, value = "") => {
    const input = event.target;
    if (input) {
      value = input.value;
    }
    switch (mascara) {
      case "telefone":
        value = FormatFields.formatarTelefone(value);
        break;
      case "data":
        value = FormatFields.formatarData(value);
        break;
      case "cep":
        value = FormatFields.formatarCep(value);
        break;
      case "cpf":
        value = FormatFields.formatarCPF(value);
        break;
      case "cnpj":
        value = FormatFields.formatarCNPJ(value);
        break;
      case "numero":
        value = FormatFields.formatarNumero(value);
        break;
      case "numerico":
        value = FormatFields.formatarNumerico(value);
        break;
      case "letras":
        value = FormatFields.formatarLetras(value);
        break;
      case "letrasNumeros":
        value = FormatFields.formatarLetrasNumeros(value);
        break;
      case "mesAno":
        value = FormatFields.formatarMesAno(value);
        break;
      case "numeroPreciso":
        value = FormatFields.formatarNumeroPreciso(value);
        break;
      case "hora":
        value = FormatFields.formatarHora(value);
        break;
      default:
        break;
    }
    if (input) {
      input.value = value;

      if (onChange) {
        onChange(event);
      }
    }
    return value;
  };
  const handleDateChange = (date: any) => {
    const formattedDate = FormatFields.formatarDataCalendar(date);
    setSelectedDate(formattedDate);
    formulario?.setValue(name as never, formattedDate as never);
  };

  return (
    <div className={`w-full ${width ? width : ""}`}>
      {label && type != "checkbox" && (
        <label
          htmlFor={name}
          className="mb-2.5 block text-black dark:text-white whitespace-nowrap"
        >
          {label
            .split(" ")
            .map((str: string) =>
              str.length > 3 ? str[0].toUpperCase() + str.slice(1) : str
            )
            .join(" ")}{" "}
          <span className="text-[#ff2b2b] font-semibold text-lg">
            {required && "*"}
          </span>
        </label>
      )}
      <div
        className={`w-full flex items-center relative flex-row${
          type == "password" && "-reverse"
        } align-middle`}
      >
        {type !== "textarea" ? (
          type === "checkbox" ? (
            <div>
              <label className="flex cursor-pointer select-none items-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    name={name}
                    {...formulario?.register(name)}
                    {...rest}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setIsChecked(e.target.checked);
                      if (onChange) {
                        onChange(e);
                      }
                    }}
                    checked={isChecked}
                  />
                  <div
                    className={`mr-4 flex h-5 w-5 items-center dark:border-white justify-center rounded border ${
                      isChecked &&
                      "border-primary dark:border-primary bg-gray dark:bg-transparent"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-sm ${
                        isChecked && "bg-primary"
                      }`}
                    ></span>
                  </div>
                </div>
                {label}
              </label>
            </div>
          ) : (
            <Fragment>
              {type === "password" && (
                <div
                  className="align-middle absolute mr-2"
                  onClick={() => {
                    setVisible(!visible);
                  }}
                >
                  {visible ? <RiEyeLine /> : <RiEyeCloseLine />}
                </div>
              )}
              <input
                name={name}
                className={`w-full rounded border-[1.5px] border-stroke bg-transparent  py-2 px-2 font-medium outline-none transition
                                 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark
                                  dark:bg-form-input dark:focus:border-primary`}
                onInput={handleFormatInput}
                {...formulario?.register(name)}
                {...rest}
                type={type == "password" && visible ? "text" : type}
                style={{
                  paddingLeft: `${
                    prefix ? `${prefix.length * 10 + 10}` : "20"
                  }px`,
                  paddingRight: `${type == "password" ? "30px" : "20px"}`,
                }}
                autoComplete="one-time-code"
                // value={value}
              />
              {mascara === "data" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <CalendarDays
                      className="cursor-pointer text-black absolute right-2"
                      size={17}
                    />
                  </PopoverTrigger>
                  <PopoverContent style={{ zIndex: "9999" }}>
                    <Calendar
                      onSelect={handleDateChange}
                      mode="single"
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            </Fragment>
          )
        ) : (
          <textarea
            name={name}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            cols={cols ? cols : 25}
            rows={rows ? rows : 4}
            {...formulario?.register(name, {
              type: "string",
            })}
            onInput={handleFormatInput}
            defaultValue={defaultValue}
            {...rest}
          ></textarea>
        )}
        <span
          className="align-middle absolute ml-2"
          style={{ userSelect: "none", pointerEvents: "none" }}
        >
          {prefix}
        </span>
      </div>

      {formulario?.errors &&
        name &&
        formulario.errors[name] &&
        formulario.errors[name].message && (
          <span className="text-danger">
            {/* {formulario.errors[name].message} */}
            {formulario.errors[name].message
              .split(" ")
              .map((str: string) =>
                str.length > 3 ? str[0].toUpperCase() + str.slice(1) : str
              )
              .join(" ")}
          </span>
        )}
    </div>
  );
};

export default Input;
