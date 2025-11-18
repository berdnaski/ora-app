import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenBackground from "../components/ScreenBackground";
import LogoHeader from "../components/LogoHeader";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();

  const handleRegister = () => {};

  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View className="flex-1 px-6 pt-8 pb-8 justify-between">
              <View className="items-center">
                <LogoHeader size={174} />
              </View>

              <View className="items-center w-full">
                <View className="gap-[3px] mb-[40px]">
                  <Text className="text-white text-center text-[28px] font-display font-bold mb-1">
                    Crie a sua conta
                  </Text>
                  <Text className="text-[#DBCCCC] text-center mb-6 max-w-sm">
                    Preencha os dados abaixo para começar a organizar sua igreja
                  </Text>
                </View>

                <View className="w-full max-w-sm gap-[26px]">
                  <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-3">
                    <Ionicons name="person-outline" size={18} color="#DBCCCC" />
                    <TextInput
                      className="flex-1 text-[#DBCCCC] text-[12px] ml-3 h-[35px]"
                      placeholder="Insira seu nome"
                      placeholderTextColor="#DBCCCC"
                      value={name}
                      onChangeText={setName}
                      style={{ textAlignVertical: "center" }}
                    />
                  </View>

                  <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-3">
                    <Ionicons name="mail-outline" size={18} color="#DBCCCC" />
                    <TextInput
                      className="flex-1 text-[#DBCCCC] text-[12px] ml-3 h-[35px]"
                      placeholder="Insira seu email"
                      placeholderTextColor="#DBCCCC"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                      style={{ textAlignVertical: "center" }}
                    />
                  </View>

                  <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-3">
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color="#DBCCCC"
                    />
                    <TextInput
                      className="flex-1 text-[#DBCCCC] text-[12px] ml-3 h-[35px]"
                      placeholder="Insira sua senha"
                      placeholderTextColor="#DBCCCC"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                      style={{ textAlignVertical: "center" }}
                    />
                    <Pressable onPress={() => setShowPassword((v) => !v)}>
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={18}
                        color="#DBCCCC"
                      />
                    </Pressable>
                  </View>

                  <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-3">
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color="#DBCCCC"
                    />
                    <TextInput
                      className="flex-1 text-[#DBCCCC] text-[12px] ml-3 h-[35px]"
                      placeholder="Confirme sua senha"
                      placeholderTextColor="#DBCCCC"
                      secureTextEntry={!showConfirm}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      style={{ textAlignVertical: "center" }}
                    />
                    <Pressable onPress={() => setShowConfirm((v) => !v)}>
                      <Ionicons
                        name={showConfirm ? "eye-off-outline" : "eye-outline"}
                        size={18}
                        color="#DBCCCC"
                      />
                    </Pressable>
                  </View>

                  <View className="flex-row items-center gap-3 mt-[10px] w-full max-w-sm">
                    <View className="flex-1">
                      <Text className="text-white/80 text-[10px]">
                        Eu concordo com seguir os{" "}
                        <Text className="text-green-400">
                          Termos de Serviço
                        </Text>{" "}
                        e a{" "}
                        <Text className="text-green-400">
                          Política de Privacidade
                        </Text>
                      </Text>
                    </View>
                    <Switch value={agree} onValueChange={setAgree} />
                  </View>
                </View>

                <View className="flex-row items-center justify-center gap-2 my-6">
                  <View className="h-2 w-6 rounded-full bg-yellow-300" />
                  <View className="h-2 w-6 rounded-full bg-yellow-300" />
                  <View className="h-2 w-6 rounded-full bg-yellow-300" />
                </View>

                <Pressable
                  className="bg-[#4A895D] w-full max-w-sm h-[44px] rounded-xl mb-4 justify-center items-center"
                  onPress={handleRegister}
                  android_ripple={{ color: "rgba(255,255,255,0.2)" }}
                >
                  {({ pressed }) => (
                    <Text
                      className={`text-white font-display font-bold text-center text-base ${pressed ? "opacity-80" : "opacity-100"}`}
                    >
                      Criar Conta
                    </Text>
                  )}
                </Pressable>

                <Text className="text-white/70 text-[12px]">
                  Já possui uma conta?{" "}
                  <Text
                    onPress={() => router.push("/login")}
                    className="text-green-400 font-display"
                  >
                    Entrar agora
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}
