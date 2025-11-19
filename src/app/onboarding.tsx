import { View, Text, Pressable } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import LogoHeader from '../components/LogoHeader';
import { auth } from '../api/auth';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  const logout = async () => {
    await auth.logout();
    router.replace('/');
  };

  return (
    <ScreenBackground>
      <View className="flex-1 px-6 justify-between py-12">
        <View className="items-center">
          <LogoHeader size={174} />
        </View>

        <View className="items-center">
          <Text className="text-white text-center text-[28px] font-display font-bold mb-2">
            Como você quer começar?
          </Text>
          <Text className="text-[#DBCCCC] text-center mb-6 max-w-sm">
            Você pode criar uma nova igreja ou entrar em uma já existente.
          </Text>
          <View className="flex-row items-center justify-center gap-2 mb-8">
            <View className="h-2 w-6 rounded-full bg-yellow-300" />
            <View className="h-2 w-6 rounded-full bg-yellow-300" />
            <View className="h-2 w-6 rounded-full bg-yellow-300" />
          </View>

          <Pressable className="bg-[#4A895D] w-full max-w-sm h-[44px] rounded-xl mb-4 justify-center items-center">
            <Text className="text-white font-display font-bold text-center text-base">Criar uma igreja</Text>
          </Pressable>
          <Pressable className="bg-[#4A895D] w-full max-w-sm h-[44px] rounded-xl mb-4 justify-center items-center">
            <Text className="text-white font-display font-bold text-center text-base">Entrar com código</Text>
          </Pressable>

          <Pressable className="bg-white/10 w-full max-w-sm h-[44px] rounded-xl mb-4 justify-center items-center" onPress={logout}>
            <Text className="text-white font-display text-center text-base">Sair (temporário)</Text>
          </Pressable>
        </View>
      </View>
    </ScreenBackground>
  );
}