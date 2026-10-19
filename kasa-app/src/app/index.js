import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white p-6 justify-center">
      {/* Logo / Header */}
      <View className="mb-10">
        <Text className="text-[36px] font-bold leading-tight" style={{ color: '#111111' }}>
          Akwaaba to{"\n"}
          <Text style={{ color: '#FF7A00' }}>KASA</Text>
        </Text>
        <Text className="mt-3 text-[16px] text-grey leading-6">
          Kasa means Talk. {"\n"}
          <Text className="italic text-black font-medium">Sɛ wo kasa, adwuma no bɛyɛ.</Text>
        </Text>
      </View>

      {/* Features */}
      <View className="gap-4 mt-2">
        <View className="flex-row items-center bg-light p-4 rounded-[12px]">
          <Text className="text-[18px]">🗣️</Text>
          <Text className="ml-3 text-[15px] font-medium text-black">Talk in Twi - Kasa ma wo</Text>
        </View>
        <View className="flex-row items-center bg-light p-4 rounded-[12px]">
          <Text className="text-[18px]">📱</Text>
          <Text className="ml-3 text-[15px] font-medium text-black">Send invoice free yam phone</Text>
        </View>
        <View className="flex-row items-center bg-light p-4 rounded-[12px]">
          <Text className="text-[18px]">💳</Text>
          <Text className="ml-3 text-[15px] font-medium text-black">Kasa Score get loan</Text>
        </View>
      </View>

      {/* Button - uses your global.css primary */}
      <TouchableOpacity 
        onPress={() => router.push('/signup')} 
        activeOpacity={0.85}
        className="p-4 rounded-[12px] mt-12 items-center justify-center"
        style={{ backgroundColor: '#FF7A00', height: 56 }}
      >
        <Text className="text-white text-center font-bold text-[16px]">
          Create Account - Free
        </Text>
      </TouchableOpacity>

      <Text className="text-center text-[12px] text-grey mt-4">
        Free for traders in Accra • No fees
      </Text>
    </View>
  );
}