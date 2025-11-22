export type ViaCep = {
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
};

export const maskCep = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.length <= 5 ? d : `${d.slice(0, 5)}-${d.slice(5)}`;
};

export async function lookupCep(digits: string): Promise<ViaCep | null> {
  const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
  const data = await res.json();
  if (data?.erro) return null;
  return data;
}
