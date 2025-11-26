import { View, Text, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import ScreenBackground from "@/src/components/ScreenBackground";
import LogoHeader from "@/src/components/LogoHeader";
import { useFormContext } from "react-hook-form";
import { type CreateChurchForm } from "@/src/validations/church";
import { useCreateChurch } from "@/src/hooks/use-create-church";
import { CreateChurchInput } from "@/src/@types/church.type";

export default function Step3() {
  const router = useRouter();
  const { watch } = useFormContext<CreateChurchForm>();
  const { createChurch, loading, error } = useCreateChurch();
  const formValues = watch();

  const conclude = async () => {
  try {
    const payload: CreateChurchInput = {
      name: formValues.name,
      code: formValues.code,
      photo: formValues.photoUri || null,
      profile: {
        cep: formValues.cep,
        street: formValues.street,
        number: formValues.number,
        district: formValues.district,
        city: formValues.city,
        complement: formValues.complement || null,
      },
    };

    const church = await createChurch(payload);

    if (church) {
      router.replace("/dashboard");
    } else {
      Alert.alert("Erro", "Não foi possível criar a igreja.");
    }
  } catch (err) {
    Alert.alert("Erro", "Ocorreu um erro inesperado.");
  }
};

  return (
    <ScreenBackground>
      <View className="flex-1 px-6 py-12 items-center">
        <LogoHeader size={174} />
        <Text className="text-white text-center text-[20px] font-display font-bold mb-[12px]">
          Tudo pronto!
        </Text>
        <Text className="text-yellow-300 text-[12px] mb-4">3 de 3</Text>

        <Pressable
          className="bg-[#4A895D] w-full max-w-sm h-[44px] rounded-xl mt-4 justify-center items-center"
          onPress={conclude}
          disabled={loading}
          android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        >
          <Text className="text-white font-display font-bold text-center text-base">
            {loading ? 'Criando...' : 'Concluir'}
          </Text>
        </Pressable>

        {error && (
          <Text className="text-red-500 mt-4 text-center">
            {error}
          </Text>
        )}
      </View>
    </ScreenBackground>
  );
}