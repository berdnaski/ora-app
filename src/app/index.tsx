import { View, Text, Pressable } from "react-native";
import LogoHeader from "../components/LogoHeader";
import { useRouter } from "expo-router";
import ScreenBackground from "../components/ScreenBackground";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScreenBackground>
      <View className="flex-1 px-6 justify-between py-12">
        <View className="items-center">
          <LogoHeader size={174} />
        </View>

        <View className="items-center">
          <Text className="text-white text-center text-[32px] font-display font-bold mb-8">
            Organize sua igreja com facilidade
          </Text>
        </View>

        <View className="items-center">
          <View className="flex-row items-center justify-center gap-2 mb-8">
            <View className="h-2 w-6 rounded-full bg-yellow-300" />
            <View className="h-2 w-6 rounded-full bg-yellow-300" />
            <View className="h-2 w-6 rounded-full bg-yellow-300" />
          </View>

          <Pressable
            className="bg-[#4A895D] w-full max-w-sm h-[44px] rounded-xl mb-4 justify-center items-center"
            onPress={() => router.push("/login")}
            android_ripple={{ color: "rgba(255,255,255,0.2)" }}
          >
            {({ pressed }) => (
              <Text
                className={`text-white font-display font-bold text-center text-base ${
                  pressed ? "opacity-80" : "opacity-100"
                }`}
              >
                Entrar
              </Text>
            )}
          </Pressable>

          <Text className="text-white/70">
            Não possui uma conta?{" "}
            <Text
              className="text-green-400 font-display"
              onPress={() => router.push("/register")}
            >
              Criar agora
            </Text>
          </Text>
        </View>
      </View>
    </ScreenBackground>
  );
}
