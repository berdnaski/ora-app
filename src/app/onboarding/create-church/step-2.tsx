import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ScreenBackground from "@/src/components/ScreenBackground";
import LogoHeader from "@/src/components/LogoHeader";
import { Controller, useFormContext } from "react-hook-form";
import type { CreateChurchForm } from "@/src/validations/church";
import { lookupCep, maskCep } from "@/src/lib/cep";

export default function Step2() {
  const router = useRouter();

  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<CreateChurchForm>();

  const onCepChange = async (raw: string, onChange: (v: string) => void) => {
    const masked = maskCep(raw);
    onChange(masked);

    const digits = masked.replace(/\D/g, "");
    if (digits.length === 8) {
      const data = await lookupCep(digits);
      if (data) {
        setValue("street", data.logradouro ?? "");
        setValue("district", data.bairro ?? "");
        setValue("city", data.localidade ?? "");
        setValue("state", data.uf ?? "");
      }
    }
  };

  const finish = async () => {
    const ok = await trigger([
      "cep",
      "street",
      "district",
      "city",
      "state",
      "number",
    ]);

    if (ok) router.push("/onboarding/create-church/step-3");
  };

  return (
    <ScreenBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingVertical: 40,
          }}
        >
          <View className="items-center">
            <LogoHeader size={174} />
          </View>

          <View className="items-center w-full">
            <Text className="text-white text-[20px] font-display font-bold mb-[3px] text-center">
              Onde sua igreja fica localizada?
            </Text>

            <Text className="text-[#DBDBDB] text-center mb-[47px] text-[12px] w-[75%]">
              Use o CEP para preencher automaticamente o endereço.
            </Text>

            <Text className="text-yellow-300 text-[12px] font-bold mb-[18px]">
              2 de 3
            </Text>

            <View className="flex items-center w-[320px] max-w-sm gap-[16px]">
              <View className="flex-row items-center bg-white/10 rounded-xl px-4 h-[44px]">
                <Ionicons name="location-outline" size={20} color="#FFC72C" />
                <Controller
                  control={control}
                  name="cep"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="flex-1 text-[#DBCCCC] text-[14px] ml-3"
                      placeholder="CEP (99999-999)"
                      placeholderTextColor="#DBCCCC"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={(v) => onCepChange(v, onChange)}
                      onBlur={onBlur}
                      style={{ textAlignVertical: "center" }}
                    />
                  )}
                />
              </View>

              {errors.cep && (
                <Text className="text-red-400 text-[12px] -mt-2">
                  {(errors.cep as any).message}
                </Text>
              )}

              {[
                {
                  name: "street",
                  icon: "navigate-outline",
                  placeholder: "Rua",
                },
                {
                  name: "district",
                  icon: "map-outline",
                  placeholder: "Bairro",
                },
                {
                  name: "city",
                  icon: "business-outline",
                  placeholder: "Cidade",
                },
                { name: "state", icon: "flag-outline", placeholder: "Estado" },
              ].map((item) => (
                <View
                  key={item.name}
                  className="flex-row items-center bg-white/10 rounded-xl px-4 h-[44px] opacity-80"
                >
                  <Ionicons name={item.icon as any} size={20} color="#DBCCCC" />
                  <Controller
                    control={control}
                    name={item.name as any}
                    render={({ field: { value } }) => (
                      <TextInput
                        className="flex-1 text-[#DBCCCC] text-[14px] ml-3"
                        placeholder={item.placeholder}
                        placeholderTextColor="#DBCCCC"
                        value={value}
                        editable={false}
                        style={{ textAlignVertical: "center" }}
                      />
                    )}
                  />
                </View>
              ))}

              <View className="flex-row items-center bg-white/10 rounded-xl px-4 h-[44px]">
                <Ionicons name="home-outline" size={20} color="#DBCCCC" />
                <Controller
                  control={control}
                  name="number"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="flex-1 text-[#DBCCCC] text-[14px] ml-3"
                      placeholder="Número"
                      placeholderTextColor="#DBCCCC"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={{ textAlignVertical: "center" }}
                    />
                  )}
                />
              </View>

              {errors.number && (
                <Text className="text-red-400 text-[12px] -mt-2">
                  {(errors.number as any).message}
                </Text>
              )}

              <View className="flex-row items-center bg-white/10 rounded-xl px-4 h-[44px]">
                <Ionicons name="add-circle-outline" size={20} color="#DBCCCC" />
                <Controller
                  control={control}
                  name="complement"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="flex-1 text-[#DBCCCC] text-[14px] ml-3"
                      placeholder="Complemento (opcional)"
                      placeholderTextColor="#DBCCCC"
                      value={value ?? ""}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={{ textAlignVertical: "center" }}
                    />
                  )}
                />
              </View>
            </View>

            <Pressable
              className="bg-[#4A895D] w-[320px] h-[44px] rounded-xl mt-8 justify-center items-center"
              onPress={finish}
              android_ripple={{ color: "rgba(255,255,255,0.2)" }}
            >
              <Text className="text-white font-display font-bold text-center text-base">
                Finalizar
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </ScreenBackground>
  );
}
