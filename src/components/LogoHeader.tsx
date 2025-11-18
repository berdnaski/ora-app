import { View, Text } from 'react-native';
import { Image } from 'expo-image';

type Props = {
  size?: number;
};

export default function LogoHeader({ size = 64 }: Props) {
  return (
    <View className="items-center">
      <View className="flex-row items-center ">
        <Image
          source={require('../assets/images/icon.png')}
          style={{ width: size, height: size }}
          contentFit="contain"
        />
      </View>
    </View>
  );
}