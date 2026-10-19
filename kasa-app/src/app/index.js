import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white p-5 justify-center">
      <Text className="text-3xl font-bold" style={{color:'#0f4c5c'}}>Akwaaba to KASA</Text>
      <Text className="mt-2 text-base text-gray-700">Kasa means Talk. Sɛ wo kasa, adwuma no bɛyɛ.</Text>
      <Text className="mt-5">✓ Talk in Twi - Kasa ma wo{'\n'}✓ Send invoice free yam phone{'\n'}✓ Kasa Score get loan</Text>
      <TouchableOpacity onPress={() => router.push('/signup')} className="p-4 rounded-xl mt-8" style={{backgroundColor:'#ff7f2a'}}>
        <Text className="text-white text-center font-bold text-lg">Create Account - Free</Text>
      </TouchableOpacity>
    </View>
  );
}