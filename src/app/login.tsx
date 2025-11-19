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
import { auth } from "../api/auth";
import { useForm, Controller, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm, loginSchema } from "../validations/auth";

const schema = loginSchema;
type FormValues = LoginForm;

export default function LoginScreen() {
  const [agree, setAgree] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async ({ email, password }: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      await auth.login({ email, password });
      router.replace('/onboarding' as any);
    } catch (e: any) {
      setError(e?.message || 'Erro ao entrar');
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = (formErrors: FieldErrors<FormValues>) => {
    const firstKey = Object.keys(formErrors)[0] as keyof FormValues | undefined;
    const firstError = firstKey ? formErrors[firstKey] : undefined;
    const msg = firstError && typeof (firstError as any).message === 'string' ? (firstError as any).message : undefined;
    if (msg) setError(msg);
  };

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
            <View className="flex-1 px-6 pt-8 pb-8">
              <View className="items-center">
                <LogoHeader size={174} />
              </View>

              <View className="items-center w-full">
                <View className="gap-[3px] mb-[40px] ">
                  <Text className="text-white text-center text-[28px] font-display font-bold mb-1">
                    Entrar na sua conta
                  </Text>
                  <Text className="text-[#DBCCCC] text-center mb-6 max-w-sm">
                    Preencha os dados abaixo para acessar a sua conta.
                  </Text>
                </View>

                <View className="w-full max-w-sm gap-[26px]">
                  <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-3">
                    <Ionicons name="mail-outline" size={18} color="#DBCCCC" />
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          className="flex-1 text-[#DBCCCC] text-[12px] ml-3 h-[35px]"
                          placeholder="Insira seu email"
                          placeholderTextColor="#DBCCCC"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          style={{ textAlignVertical: "center" }}
                        />
                      )}
                    />
                  </View>
                  {errors.email && 'message' in errors.email ? (
                    <Text className="text-red-400 text-[12px] mt-1">{(errors.email as any).message}</Text>
                  ) : null}

                  <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-3">
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color="#DBCCCC"
                    />
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          className="flex-1 text-[#DBCCCC] text-[12px] ml-3 h-[35px]"
                          placeholder="Insira sua senha"
                          placeholderTextColor="#DBCCCC"
                          secureTextEntry={!showPassword}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          style={{ textAlignVertical: "center" }}
                        />
                      )}
                    />
                    <Pressable onPress={() => setShowPassword((v) => !v)}>
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={18}
                        color="#DBCCCC"
                      />
                    </Pressable>
                  </View>
                  {errors.password && 'message' in errors.password ? (
                    <Text className="text-red-400 text-[12px] mt-1">{(errors.password as any).message}</Text>
                  ) : null}

                  <View className="flex-row items-center gap-3 mt-[10px] w-full max-w-sm">
                    <View className="flex-1">
                      <Text className="text-white/80 text-[10px]">
                        Me manter sempre conectado
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
                  onPress={handleSubmit(onSubmit, onInvalid)}
                  disabled={loading || !isValid}
                  android_ripple={{ color: "rgba(255,255,255,0.2)" }}
                >
                  {({ pressed }) => (
                    <Text
                      className={`text-white font-display font-bold text-center text-base ${pressed ? "opacity-80" : "opacity-100"}`}
                    >
                      {loading ? 'Entrando...' : 'Entrar'}
                    </Text>
                  )}
                </Pressable>

                {error ? (
                  <Text className="text-red-400 text-[12px] mb-2">{error}</Text>
                ) : null}

                <Text className="text-white/70 text-[12px]">
                  Não possui uma conta?{" "}
                  <Text
                    onPress={() => router.push("/register")}
                    className="text-green-400 font-display"
                  >
                    Criar agora
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