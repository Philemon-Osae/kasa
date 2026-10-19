import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Score() {
  const [user, setUser] = useState({ name: 'Trader' });
  const [sales, setSales] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('kasaUser').then((u) => { if (u) setUser(JSON.parse(u)); });
    AsyncStorage.getItem('ledger').then((l) => { if (l) setSales(JSON.parse(l)); });
  }, []);

  const score = 500 + (sales.length * 25);
  const displayScore = score > 850 ? 850 : score;
  const total = sales.reduce((s, i) => s + (i.amount || 0), 0);
  const loanReady = displayScore >= 750;

  const sendInvoice = async () => {
    const msg = `Invoice from ${user.businessName || user.name}\nStall ${user.stall || ''}\nTotal Sales: GH${total}\nKasa Score: ${displayScore}/850\nPowered by KASA - Sɛ wo kasa, adwuma no bɛyɛ`;
    await Share.share({ message: msg });
  };

  return (
    <View className="flex-1 bg-white p-6 items-center">
      <Text className="text-[28px] font-bold text-black">Kasa Score</Text>
      <Text className="text-grey text-[13px] mt-1">Your trading trust score</Text>

      <View 
        className="w-52 h-52 rounded-full items-center justify-center mt-8"
        style={{ 
          borderWidth: 8, 
          borderColor: loanReady ? '#0f4c5c' : '#FF7A00', 
          backgroundColor: '#FFF7ED' 
        }}
      >
        <Text className="text-[56px] font-bold" style={{ color: '#0f4c5c' }}>{displayScore}</Text>
        <Text className="text-[13px] font-bold" style={{ color: '#FF7A00' }}>of 850</Text>
        {loanReady && (
          <View className="bg-[#0f4c5c] px-3 py-1 rounded-full mt-2">
            <Text className="text-white text-[10px] font-bold">LOAN READY</Text>
          </View>
        )}
      </View>

      <Text className="mt-6 text-center text-[15px] text-black leading-6">
        Maakye {user.name}! You have <Text className="font-bold">{sales.length}</Text> recorded sales.{"\n"}
        <Text className="font-bold">GH{total}</Text> tracked in KASA.
      </Text>
      <Text className="text-[11px] text-grey mt-2 text-center">
        More sales = higher score = easier loan
      </Text>

      <View className="w-full bg-[#E6F4F1] p-4 rounded-[12px] mt-6">
        <Text className="font-bold text-[14px] text-black">How to increase:</Text>
        <Text className="text-[13px] text-black mt-2">✓ Speak daily with Kasa mic (+25 pts)</Text>
        <Text className="text-[13px] text-black mt-1">✓ Reach 20 sales → 750 Score → loan ready</Text>
        <Text className="text-[13px] text-black mt-1">✓ Send invoices → bank trusts you</Text>
      </View>

      <TouchableOpacity 
        onPress={sendInvoice} 
        activeOpacity={0.85}
        className="p-4 rounded-[12px] mt-6 w-full items-center justify-center"
        style={{ backgroundColor: '#FF7A00', height: 56 }}
      >
        <Text className="text-white text-center font-bold text-[15px]">
          Send Invoice via WhatsApp / SMS
        </Text>
      </TouchableOpacity>
    </View>
  );
}