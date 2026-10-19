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
      setSales(data.reverse());
      const t = data.reduce((sum, s) => sum + s.amount, 0);
      setTotal(t);
    }
  };

  return (
    <View className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold">My Sales Today</Text>
      <Text className="text-gray-500">Total: GH{total} • {sales.length} sales</Text>

      <FlatList
        data={sales}
        keyExtractor={item => item.id.toString()}
        style={{marginTop:15}}
        renderItem={({ item }) => (
          <View className="border border-gray-200 p-3 rounded-lg mt-2 flex-row justify-between">
            <View>
              <Text className="font-bold">{item.item} → {item.customer}</Text>
              <Text className="text-xs text-gray-500">{new Date(item.date).toLocaleTimeString()}</Text>
            </View>
            <Text className="font-bold" style={{color:'#0f4c5c'}}>GH{item.amount}</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={() => router.push('/score')} className="p-4 rounded-xl mt-4" style={{backgroundColor:'#0f4c5c'}}>
        <Text className="text-white text-center font-bold">Check My Kasa Score →</Text>
      </TouchableOpacity>
    </View>
  );
}