import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateChurchForm, createChurchSchema } from "@/src/validations/church";

export default function Layout() {
  const methods = useForm<CreateChurchForm>({
    resolver: zodResolver(createChurchSchema),
    defaultValues: {
      name: "",
      code: "",
      photoUri: "",
      cep: "",
      street: "",
      district: "",
      city: "",
      state: "",
      number: "",
      complement: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <Stack screenOptions={{ headerShown: false }} />
    </FormProvider>
  );
}
