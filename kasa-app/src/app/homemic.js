import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { extractSale } from '../data/ghanaProducts';

export default function HomeMic() {
  const [user, setUser] = useState({ name:'Trader' });
  const [lastSale, setLastSale] = useState(null);
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem('kasaUser').then(u => { if(u) setUser(JSON.parse(u)); });
  }, []);

  const simulateVoice = async () => {
    const fakeText = "Maton five baskets kobi ama Ama for one fifty";
    const sale = extractSale(fakeText);
    setLastSale(sale);
    const l = await AsyncStorage.getItem('ledger');
    const ledger = l ? JSON.parse(l) : [];
    ledger.push({ ...sale, date: new Date().toISOString(), id: Date.now() });
    await AsyncStorage.setItem('ledger', JSON.stringify(ledger));
  };

  return (
    <View className="flex-1 bg-white p-5 items-center justify-center">
      <Text className="text-2xl font-bold">Maakye, {user.name}! Sɛn?</Text>
      <Text className="text-gray-500">{user.stall} • {user.businessName}</Text>

      <TouchableOpacity onPress={simulateVoice} className="w-52 h-52 rounded-full items-center justify-center mt-8" style={{backgroundColor:'#ff7f2a'}}>
        <Text style={{fontSize:60}}>🎤</Text>
        <Text className="text-white font-bold mt-1">KASA - {user.name}</Text>
        <Text className="text-white text-xs">Tap to speak</Text>
      </TouchableOpacity>

      {lastSale && (
        <View className="bg-teal-50 p-4 rounded-xl mt-6 w-full">
          <Text className="font-bold">You sold {lastSale.item} to {lastSale.customer} for GH{lastSale.amount} ✓</Text>
          <Text className="text-xs text-gray-600">Raw: {lastSale.rawText} — Works for kobi, momoni, tomato, shoes</Text>
        </View>
      )}

      <TouchableOpacity onPress={() => router.push('/ledger')} className="mt-6">
        <Text className="text-center font-bold" style={{color:'#0f4c5c'}}>View My Ledger →</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/score')} className="mt-2">
        <Text className="text-center text-gray-500">Check Kasa Score →</Text>
      </TouchableOpacity>
    </View>
  );
}