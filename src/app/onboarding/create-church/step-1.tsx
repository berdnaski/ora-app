import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ScreenBackground from "@/src/components/ScreenBackground";
import LogoHeader from "@/src/components/LogoHeader";
import { Controller, useFormContext } from "react-hook-form";
import { type CreateChurchForm } from "@/src/validations/church";

export default function Step1() {
  const router = useRouter();
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<CreateChurchForm>();

  const next = async () => {
    const ok = await trigger(["name"]);
    if (ok) router.push("/onboarding/create-church/step-2");
  };

  return (
    <ScreenBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 px-6 py-12 items-center">
          <View className="items-center">
            <LogoHeader size={174} />
          </View>

          <View className="items-center w-full">
            <Text className="text-white text-center text-[20px] font-display font-bold mb-[3px]">
              Qual o nome da sua igreja?
            </Text>

            <Text className="text-[#DBDBDB] text-center mb-[47px] text-[12px] w-[75%]">
              Este será o nome visível para todos os membros.
            </Text>

            <Text className="text-yellow-300 text-[12px] font-bold mb-[18px]">
              1 de 3
            </Text>

            <View className="flex items-center w-[320px] max-w-sm gap-[16px]">
              <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-3">
                <Ionicons name="home" size={18} color="#FFC72C" />
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="flex-1 text-[#DBCCCC] text-[14px] ml-3 h-[62px]"
                      placeholder="Insira o nome da igreja."
                      placeholderTextColor="#DBCCCC"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={{ textAlignVertical: "center" }}
                    />
                  )}
                />
              </View>

              {errors.name && "message" in errors.name ? (
                <Text className="text-red-400 text-[12px] mt-1">
                  {(errors.name as any).message}
                </Text>
              ) : null}

              <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-3">
                <Ionicons name="person-outline" size={18} color="#DBCCCC" />
                <Controller
                  control={control}
                  name="code"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="flex-1 text-[#DBCCCC] text-[12px] ml-3 h-[35px]"
                      placeholder="Insira o código de identificação da igreja."
                      placeholderTextColor="#DBCCCC"
                      value={value ?? ""}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={{ textAlignVertical: "center" }}
                    />
                  )}
                />
              </View>

              <Pressable className="flex bg-white/10 rounded-xl h-[148px] w-full px-4 py-6 items-center justify-center">
                <Ionicons name="camera-outline" size={75} color="#FFC72C" />
                <Text className="text-[#DBCCCC] text-[12px] mt-2">
                  Adicionar Logo (Opcional)
                </Text>
              </Pressable>
            </View>

            <Pressable
              className="bg-[#4A895D] w-[320px] h-[44px] rounded-xl mt-8 justify-center items-center"
              onPress={next}
              android_ripple={{ color: "rgba(255,255,255,0.2)" }}
            >
              <Text className="text-white font-display font-bold text-center text-base">
                Continuar
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScreenBackground>
  );
}
