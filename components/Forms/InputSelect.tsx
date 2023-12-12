import { IInputSelectProps } from "@/types/formInterfaces";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import * as yup from "yup";
import { Skeleton } from "../ui/skeleton";

const InputSelectComponent = ({
  name,
  label,
  width,
  options,
  formulario,
  creatable,
  onChange,
  isMulti = false,
  defaultValue,
  required,
  disabled,
  error,
}: IInputSelectProps) => {
  const SelectComponent = creatable ? CreatableSelect : Select;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (formulario && name != undefined) {
      const newSchema = formulario.yupSchema.fields;
      if (isMulti) {
        newSchema[name] = required
          ? yup
              .array()
              .of(yup.string().transform((e) => e.value))
              .min(1, "É necessário selecionar pelo menos um")
              .required(error)
          : yup.array().of(yup.string().transform((e) => e.value));
      } else {
        newSchema[name] = required
          ? yup
              .string()
              .transform((e) => e.value)
              .required(error)
          : yup.string().transform((e) => e.value);
      }
      formulario.setYupSchema(yup.object().shape(newSchema));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function updateDefaultValue() {
      if (defaultValue !== undefined && options[0] != undefined) {
        formulario?.setValue(
          name as never,
          (isMulti
            ? options.filter((option) =>
                defaultValue?.split(",").includes(option.value)
              )
            : options.find((option) => option.value == defaultValue)) as never
        );
      }
    }
    updateDefaultValue();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, options]);

  return (
    <div className={` w-full ${width ? width : ""}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-2.5 block text-black dark:text-white capitalize whitespace-nowrap"
        >
          {label}{" "}
          <span className="text-[#ff2b2b] font-semibold text-lg">
            {required && "*"}
          </span>
        </label>
      )}
      {options[0] != undefined && name != undefined ? (
        <Controller
          name={name}
          control={formulario?.control}
          defaultValue={() =>
            defaultValue
              ? isMulti
                ? options.filter((option) =>
                    defaultValue?.split(",").includes(option.value)
                  )
                : options.find((option) => option.value == defaultValue)
              : ""
          }
          render={({ field }) => (
            <SelectComponent
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 999999 }) }}
              {...field}
              className={`relative w-full text-black font-medium appearance-none rounded bg-transparent outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary`}
              options={options}
              placeholder="Selecione uma opção"
              isMulti={isMulti}
              isDisabled={disabled}
              defaultValue={() =>
                defaultValue
                  ? isMulti
                    ? options.filter((option) =>
                        defaultValue?.split(",").includes(option.value)
                      )
                    : options.find((option) => option.value == defaultValue)
                  : ""
              }
              onChange={(selectedOption, actionMeta) => {
                if (field.onChange) {
                  field.onChange(selectedOption, actionMeta);
                }
                if (onChange) {
                  onChange(selectedOption);
                }
              }}
            />
          )}
        />
      ) : (
        <Skeleton className="relative w-full h-11 css-t3ipsp-control" />
      )}
      {formulario?.errors && name && formulario.errors[name] && (
        <span className="text-danger">
          {formulario.errors[name].message
            .split(" ")
            .map((str: string) => {
              return str.length > 3 ? str[0].toUpperCase() + str.slice(1) : str;
            })
            .join(" ")}
        </span>
      )}
    </div>
  );
};

export default InputSelectComponent;
