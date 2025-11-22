import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { auth } from "@/src/api/auth";
import ScreenBackground from "@/src/components/ScreenBackground";
import LogoHeader from "@/src/components/LogoHeader";

export default function OnboardingScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<"create" | "enter" | null>(null);

  const logout = async () => {
    await auth.logout();
    router.replace("/");
  };

  const Button = ({
    type,
    icon,
    title,
    subtitle,
  }: {
    type: "create" | "enter";
    icon: any;
    title: string;
    subtitle: string;
  }) => {
    const isSelected = selected === type;

    return (
      <Pressable
        onPress={() => {
          setSelected(type);
          if (type === "create")
            router.push("/onboarding/create-church/step-1");
        }}
        className={`w-full max-w-[320px] rounded-3xl overflow-hidden`}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.35,
          shadowRadius: 6,
          elevation: 6,
          borderWidth: isSelected ? 1 : 0,
          borderColor: isSelected ? "rgba(255,199,44,0.5)" : "transparent",
        }}
      >
        <LinearGradient
          colors={["#054A1A", "#177734"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: 72,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <View className="bg-[#7A7A7A]/50 w-[44px] h-[44px] rounded-full flex items-center justify-center mr-3">
            <Ionicons name={icon} size={24} color="#FFC72C" />
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={{ color: "#FFF", fontWeight: "700", fontSize: 14 }}>
              {title}
            </Text>
            <Text
              style={{
                color: "#C5C5C5",
                fontWeight: "300",
                fontSize: 10,
              }}
            >
              {subtitle}
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
    );
  };

  return (
    <ScreenBackground>
      <View className="flex-1 px-6 py-12">
        <View className="items-center">
          <LogoHeader size={174} />
        </View>

        <View className="items-center">
          <Text className="text-white text-center text-[20px] font-display font-bold mb-[3px]">
            Como você quer começar?
          </Text>
          <Text className="text-[#DBDBDB] text-center mb-[55px] text-[12px] w-[65%]">
            Você pode criar uma nova igreja ou entrar em uma já existente.
          </Text>
          <View className="flex-row items-center justify-center gap-2 mb-[26px]">
            <View className="h-2 w-6 rounded-full bg-yellow-300" />
            <View className="h-2 w-6 rounded-full bg-yellow-300" />
            <View className="h-2 w-6 rounded-full bg-yellow-300" />
          </View>

          <View className="flex flex-col w-full items-center gap-[26px]">
            <Button
              type="create"
              icon="home"
              title="Criar uma igreja"
              subtitle="Configure o ambiente da sua congregação."
            />

            <Button
              type="enter"
              icon="person-add"
              title="Entrar com código"
              subtitle="Acesse uma igreja utilizando o código."
            />

            <Pressable
              onPress={logout}
              className="w-full max-w-[320px] rounded-3xl overflow-hidden"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.35,
                shadowRadius: 6,
                elevation: 6,
              }}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  height: 72,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 16,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  Sair (temporário)
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenBackground>
  );
}
