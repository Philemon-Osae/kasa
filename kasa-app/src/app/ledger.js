import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Ledger() {
  const [sales, setSales] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const l = await AsyncStorage.getItem('ledger');
    if (l) {
      const data = JSON.parse(l);
      setSales([...data].reverse());
      const t = data.reduce((sum, s) => sum + (s.amount || 0), 0);
      setTotal(t);
    }
  };

  const clearLedger = async () => {
    await AsyncStorage.removeItem('ledger');
    setSales([]);
    setTotal(0);
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="mb-6">
        <Text className="text-[28px] font-bold text-black">My Sales Today</Text>
        <View className="flex-row items-center mt-2 gap-3">
          <View className="bg-light px-3 py-1.5 rounded-full">
            <Text className="text-[13px] font-bold text-black">Total: GH{total}</Text>
          </View>
          <View className="bg-light px-3 py-1.5 rounded-full">
            <Text className="text-[13px] text-grey">{sales.length} sales</Text>
          </View>
        </View>
      </View>

      {sales.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-[48px]">📒</Text>
          <Text className="text-grey mt-3">No sales yet</Text>
          <Text className="text-grey text-[12px]">Tap mic and say "Maton kobi GH150 ama Ama"</Text>
        </View>
      ) : (
        <FlatList
          data={sales}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="bg-light p-4 rounded-[12px] mt-3 flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="font-bold text-[15px] text-black capitalize">
                  {item.item} → {item.customer}
                </Text>
                <Text className="text-[11px] text-grey mt-1">
                  {new Date(item.date).toLocaleTimeString()} • {item.raw?.slice(0,30) || ''}
                </Text>
              </View>
              <Text className="font-bold text-[16px]" style={{ color: '#0f4c5c' }}>
                GH{item.amount}
              </Text>
            </View>
          )}
        />
      )}

      <View className="mt-4 gap-3">
        <TouchableOpacity 
          onPress={() => router.push('/score')} 
          className="p-4 rounded-[12px] items-center justify-center"
          style={{ backgroundColor: '#0f4c5c', height: 56 }}
        >
          <Text className="text-white text-center font-bold text-[15px]">Check My Kasa Score →</Text>
        </TouchableOpacity>

        {sales.length > 0 && (
          <TouchableOpacity onPress={clearLedger} className="p-3 items-center">
            <Text className="text-grey text-[12px]">Clear (for testing)</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}