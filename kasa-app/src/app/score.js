import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Score() {
  const [user, setUser] = useState({ name:'Trader' });
  const [sales, setSales] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('kasaUser').then(u => { if(u) setUser(JSON.parse(u)); });
    AsyncStorage.getItem('ledger').then(l => { if(l) setSales(JSON.parse(l)); });
  }, []);

  const score = 500 + (sales.length * 25);
  const displayScore = score > 850 ? 850 : score;
  const total = sales.reduce((s, i) => s + i.amount, 0);

  const sendInvoice = async () => {
    const msg = `Invoice from ${user.businessName || user.name}\nStall ${user.stall}\nTotal Sales: GH${total}\nKasa Score: ${displayScore}\nPowered by KASA - Sɛ wo kasa, adwuma no bɛyɛ`;
    await Share.share({ message: msg });
  };

  return (
    <View className="flex-1 bg-white p-5 items-center">
      <Text className="text-2xl font-bold">Kasa Score</Text>
      
      <View className="w-48 h-48 rounded-full items-center justify-center mt-8 border-8" style={{borderColor:'#ff7f2a', backgroundColor:'#fff7ed'}}>
        <Text className="text-5xl font-bold" style={{color:'#0f4c5c'}}>{displayScore}</Text>
        <Text className="text-sm font-bold mt-1" style={{color:'#ff7f2a'}}>of 850</Text>
      </View>

      <Text className="mt-4 text-center">Maakye {user.name}! You have {sales.length} recorded sales. GH{total} tracked.</Text>
      <Text className="text-xs text-gray-500 mt-1 text-center">More sales = higher score = easier loan</Text>

      <View className="w-full bg-teal-50 p-4 rounded-xl mt-6">
        <Text className="font-bold">How to increase:</Text>
        <Text className="text-sm">✓ Speak daily with Kasa mic (+25 pts)</Text>
        <Text className="text-sm">✓ Reach 20 sales → 750 Score → loan ready</Text>
      </View>

      <TouchableOpacity onPress={sendInvoice} className="p-4 rounded-xl mt-6 w-full" style={{backgroundColor:'#ff7f2a'}}>
        <Text className="text-white text-center font-bold">Send Invoice via WhatsApp / SMS</Text>
      </TouchableOpacity>
    </View>
  );
}