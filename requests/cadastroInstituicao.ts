import { LinksunBackend } from "@/services/api";

export interface ICadastroInstituicaoFinanceira {
  codigo_inst: string;
  nome_inst: string;
  iof_inst: string;
  jurosPF6_inst: number;
  jurosPF12_inst: number;
  jurosPF24_inst: number;
  jurosPF36_inst: number;
  jurosPF48_inst: number;
  jurosPF60_inst: number;
  jurosPF72_inst: number;
  jurosPF84_inst: number;
  jurosPF96_inst: number;
  jurosPF108_inst: number;
  jurosPF120_inst: number;
  jurosPJ6_inst: number;
  jurosPJ12_inst: number;
  jurosPJ24_inst: number;
  jurosPJ36_inst: number;
  jurosPJ48_inst: number;
  jurosPJ60_inst: number;
  jurosPJ72_inst: number;
  jurosPJ84_inst: number;
  jurosPJ96_inst: number;
  jurosPJ108_inst: number;
  jurosPJ120_inst: number;
}
export async function cadastro(
  instituicao: ICadastroInstituicaoFinanceira
): Promise<ICadastroInstituicaoFinanceira> {
  const { data }: { data: ICadastroInstituicaoFinanceira } =
    await LinksunBackend.post("classes/Instituicao.php", instituicao);
  return data;
}
