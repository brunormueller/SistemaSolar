import Container from "../../components/Forms/Container";
import React, { use, useEffect, useState } from "react";
import Divider from "../../components/Forms/Divider";
import Input from "../../components/Forms/Input";
import { listarItensMarkup } from "@/requests/common/ItensMarkup/consultaItensMarkup";
import Image from "next/image";
import LoaderGif from "@/public/images/loaders/loader2.gif";

interface IItensMarkup {
  nome_item_markup: string;
  id_item_markup: number;
}
const ItensMarkup = ({ form }: any) => {
  const [itemMarkup, setItemMarkup] = useState<IItensMarkup[]>([]);
  const { kitEscolhido } = form.control._formValues;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    listarItensMarkup().then((res) => {
      setIsLoading(false);
      setItemMarkup(res.body);
    });
  }, []);

  return (
    <Container>
      <div className="flex justify-center mb-5">
        {isLoading ? (
          <div className="flex justify-center w-full ">
            <Image width={64} height={64} src={LoaderGif} alt="Logo" />
          </div>
        ) : (
          <div className="grid w-fit gap-1">
            {itemMarkup.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <p key={index} className="mr-2">
                  {item.nome_item_markup} (%)
                </p>
                <div className="flex items-center">
                  <Input
                    name={`itemMarkup[${item.nome_item_markup}]`}
                    mascara="numero"
                    width="xl:w-1/2"
                    formulario={form}
                  />
                  <Divider />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Divider />
      <div className="flex justify-end gap-3">
        <p>Preço Final:</p>

        {kitEscolhido.map((res: any, index: number) => {
          form.setValue("valorFinalComponentes", res.preco_kit_distribuidor);
          return (
            <p key={index}>
              {Number(res.preco_kit_distribuidor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          );
        })}
      </div>
    </Container>
  );
};

export default ItensMarkup;
