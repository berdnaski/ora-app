import { z } from "zod";

export const createChurchSchema = z.object({
  name: z.string().trim().min(2, "Informe o nome da igreja"),
  code: z.string().trim().min(2, "Código obrigatório"),
  photoUri: z.string().url("URL inválida").or(z.literal("")).optional(),
  cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido"),
  street: z.string().min(2, "Rua obrigatória"),
  district: z.string().min(2, "Bairro obrigatório"),
  city: z.string().min(2, "Cidade obrigatória"),
  state: z.string().min(2, "Estado obrigatório"),
  number: z.string().min(1, "Número obrigatório"),
  complement: z.string().trim().min(1).or(z.literal("")).optional(),
});
export type CreateChurchForm = z.infer<typeof createChurchSchema>;
export const step1Schema = createChurchSchema.pick({
  name: true,
  code: true,
  photoUri: true,
});
export const step2Schema = createChurchSchema.pick({
  cep: true,
  street: true,
  district: true,
  city: true,
  state: true,
  number: true,
  complement: true,
});
