import Input from "@/components/Forms/Input";

import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const InputVerification = ({
  handleResendPass,
  handleValidade,
  children,
}: any) => {
  const [pasteValue, setPasteValue] = useState<any[]>(["", "", "", "", "", ""]);
  const [validadeYupScheme, setValidadeYupScheme] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));

  const { handleSubmit: validadeHandleSubmit, ...validadeForm } = GetForm(
    validadeYupScheme,
    setValidadeYupScheme
  );
  useEffect(() => {
    console.log(pasteValue);
    validadeForm.setValue("codigo_codigo_email" as never, pasteValue as never);
  }, [pasteValue]);

  return (
    <>
      <form onSubmit={validadeHandleSubmit(handleValidade)}>
        <div className="flex gap-3 mt-5">
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const handleKeyDown = async (e: any) => {
              let arrayNewValues: any = pasteValue;
              if (+e.key === +e.key) {
                e.preventDefault();
                const nextInput = document.querySelector(
                  `[name=codigo_codigo_email_${index + 1}]`
                );
                if (nextInput) {
                  //  nextInput.focus();
                } else {
                  // validadeHandleSubmit(handleValidade)();
                }
              } else if (e.key === "Backspace" && index > 0) {
                const prevInput = document.querySelector(
                  `[name=codigo_codigo_email_${index - 1}]`
                );
                if (prevInput) {
                  //  prevInput.focus();
                }
              }
              arrayNewValues.splice(index, 1, e.target.value);
              setPasteValue(arrayNewValues);
              validadeForm.setValue(
                "codigo_codigo_email" as never,
                arrayNewValues as never
              );
            };

            const handlePaste = (e: any) => {
              // Captura o conteúdo colado
              const pastedText = (e.clipboardData || window.Clipboard).getData(
                "text"
              );
              let arrayNewValues: any = [];
              // Verifique se o texto colado é um número
              if (/^\d+$/.test(pastedText)) {
                // Atualize os valores nos campos
                const values = pastedText.split("").slice(0, 6);
                values.forEach((value: any, i: any) => {
                  console.log(value);
                  // setPasteValue((x) =>
                  //     x.splice(index, 1, e.target.value)
                  // );
                  const input = document.querySelector(
                    `[name=codigo_codigo_email_${index + i}]`
                  ) as HTMLInputElement;
                  if (input) {
                    input.value = value;
                    arrayNewValues.push(value);
                  }
                });
                setPasteValue(arrayNewValues);
                const nextInput = document.querySelector(
                  `[name=codigo_codigo_email_${index}]`
                );
                if (nextInput) {
                  console.log(nextInput);
                } else {
                  validadeHandleSubmit(handleValidade)();
                }

                e.preventDefault(); // Evite que o texto colado seja inserido no campo
              }
            };
            return (
              <Input
                key={index}
                name={`codigo_codigo_email_${index}`}
                width="xl:w-1/6"
                mascara="numerico"
                maxLength={1}
                // formulario={validadeForm}
                onKeyUp={(e) => handleKeyDown(e)}
                onPaste={handlePaste}
                required
                onChange={() =>
                  validadeForm.setValue(
                    "codigo_codigo_email" as never,
                    pasteValue as never
                  )
                }
              />
            );
          })}
        </div>

        {children}
      </form>
    </>
  );
};

export default InputVerification;
