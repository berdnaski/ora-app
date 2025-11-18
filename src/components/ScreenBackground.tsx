import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';

export default function ScreenBackground({ children }: PropsWithChildren) {
  return (
    <View className="flex-1 bg-[#0f1513]">
      <Image
        source={require('../assets/images/background.png')}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
      {children}
    </View>
  );
}