import { UseFormSetValue } from "react-hook-form";

export interface IValueLabel {
  value: string;
  label: string;
}

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  rows?: number;
  cols?: number;
  formulario?:
    | {
        register: Function;
        errors: any;
        control: any;
        //   yupSchema:
        //       | yup.ObjectSchema<FieldValues, yup.AnyObject, any, "">
        //       | yup.Lazy<{ [x: string]: any }, yup.AnyObject, any>;
        yupSchema: any;
        //   yupSchema: yup.ObjectSchema<{}, yup.AnyObject, {}, "">;
        setYupSchema: any;
        setValue: UseFormSetValue<{}>;
      }
    | undefined;
  mascara?:
    | "telefone"
    | "data"
    | "cep"
    | "cpf"
    | "cnpj"
    | "numero"
    | "numeroPreciso"
    | "numerico"
    | "letras"
    | "letrasNumeros"
    | "mesAno"
    | "hora";
  defaultValue?: string;
  [rest: string]: any;
  error?: string;
  name: string;
  isPassword?: boolean;
  equals?: string;
}

export interface IInputSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  width?: string;
  creatable?: boolean;
  options: {
    value: string;
    label: string;
  }[];
  formulario?:
    | {
        register: Function;
        errors: any;
        control: any;
        //   yupSchema: yup.ObjectSchema<FieldValues, yup.AnyObject, any, ""> | yup.Lazy<{ [x: string]: any; }, yup.AnyObject, any>;
        yupSchema: any;
        setYupSchema: any;
        setValue: UseFormSetValue<{}>;
      }
    | undefined;
  name?: string;
  defaultValue?: string;
  isMulti?: boolean;
  error?: string;
}

export interface IValueLabelConstructor {
  arr: any[];
  value: string;
  label: string;
}
