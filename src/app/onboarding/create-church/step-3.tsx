import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import ScreenBackground from "@/src/components/ScreenBackground";
import LogoHeader from "@/src/components/LogoHeader";
import { useFormContext } from "react-hook-form";
import { type CreateChurchForm } from "@/src/validations/church";

export default function Step3() {
  const router = useRouter();
  const { watch } = useFormContext<CreateChurchForm>();
  const name = watch("name");
  const city = watch("city");
  const state = watch("state");

  const conclude = () => {
    router.replace("/");
  };

  return (
    <ScreenBackground>
      <View className="flex-1 px-6 py-12 items-center">
        <LogoHeader size={174} />
        <Text className="text-white text-center text-[20px] font-display font-bold mb-[12px]">
          Tudo pronto!
        </Text>
        <Text className="text-[#DBDBDB] text-center mb-[20px] text-[12px] w-[75%]">
          {name ? `Igreja: ${name}` : ""}
          {city && state ? ` • Local: ${city}/${state}` : ""}
        </Text>
        <Text className="text-yellow-300 text-[12px] mb-4">3 de 3</Text>

        <Pressable
          className="bg-[#4A895D] w-full max-w-sm h-[44px] rounded-xl mt-4 justify-center items-center"
          onPress={conclude}
          android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        >
          <Text className="text-white font-display font-bold text-center text-base">
            Concluir
          </Text>
        </Pressable>
      </View>
    </ScreenBackground>
  );
}
