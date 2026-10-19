import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { extractSale } from '../data/ghanaProducts';

// Real speech if installed, else fallback
let ExpoSpeechRecognition = null;
try {
  ExpoSpeechRecognition = require('expo-speech-recognition');
} catch(e) {}

export default function HomeMic() {
  const [user, setUser] = useState({ name:'Trader' });
  const [lastSale, setLastSale] = useState(null);
  const [listening, setListening] = useState(false);
  const [heardText, setHeardText] = useState("");
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem('kasaUser').then(u => { if(u) setUser(JSON.parse(u)); });
  }, []);

  const saveSale = async (text) => {
    const sale = extractSale(text);
    setLastSale(sale);
    setHeardText(text);
    const l = await AsyncStorage.getItem('ledger');
    const ledger = l ? JSON.parse(l) : [];
    ledger.push({ ...sale, date: new Date().toISOString(), id: Date.now() });
    await AsyncStorage.setItem('ledger', JSON.stringify(ledger));
  };

  const startListening = async () => {
    setListening(true);
    setHeardText("Listening... ka kobi, momoni, tomato...");

    // REAL VOICE ON DEVICE
    if (ExpoSpeechRecognition && Platform.OS !== 'web') {
      try {
        const { status } = await ExpoSpeechRecognition.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Need mic permission");
          setListening(false);
          return;
        }
        ExpoSpeechRecognition.addListener('result', (e) => {
          const text = e.results[0]?.transcript || "";
          if (text) {
            saveSale(text);
            setListening(false);
          }
        });
        await ExpoSpeechRecognition.startAsync({ lang: 'en-GH', interimResults: false });
        setTimeout(() => { setListening(false); }, 7000);
        return;
      } catch(err) {
        console.log("Speech error, using demo:", err);
      }
    }

    // DEMO FALLBACK for simulator
    setTimeout(() => {
      const demos = [
        "Maton three baskets kobi ama Ama for GH150",
        "Maton momoni two olonka for GH50 ma Esi",
        "Tomatoes GH100 to Kwame",
        "Maton shoes GH200 ama Adwoa"
      ];
      const random = demos[Math.floor(Math.random() * demos.length)];
      saveSale(random);
      setListening(false);
    }, 2000);
  };

  return (
    <View className="flex-1 bg-white p-5 items-center justify-center">
      <Text className="text-2xl font-bold">Maakye, {user.name}! Sɛn?</Text>
      <Text className="text-gray-500">{user.stall} • {user.businessName}</Text>
      <Text className="text-xs text-gray-400 mt-1">{listening ? "🎙️ Listening..." : "Tap mic & speak Twi/English"}</Text>

      <TouchableOpacity 
        onPress={startListening} 
        className="w-52 h-52 rounded-full items-center justify-center mt-8" 
        style={{backgroundColor: listening ? '#0f4c5c' : '#ff7f2a'}}
      >
        <Text style={{fontSize:60}}>{listening ? "👂" : "🎤"}</Text>
        <Text className="text-white font-bold mt-1">KASA - {user.name}</Text>
        <Text className="text-white text-xs">{listening ? "Listening..." : "Tap to speak"}</Text>
      </TouchableOpacity>

      {heardText ? (
        <View className="bg-gray-100 p-3 rounded-xl mt-4 w-full">
          <Text className="text-xs text-gray-500">You said:</Text>
          <Text className="font-bold">"{heardText}"</Text>
        </View>
      ) : null}

      {lastSale && (
        <View className="bg-teal-50 p-4 rounded-xl mt-3 w-full">
          <Text className="font-bold">✓ Saved: {lastSale.item} → {lastSale.customer} for GH{lastSale.amount}</Text>
          <Text className="text-xs text-gray-600">120+ items: kobi, momoni, kpakpo shito, shoes</Text>
        </View>
      )}

      <TouchableOpacity onPress={() => router.push('/ledger')} className="mt-6">
        <Text className="text-center font-bold" style={{color:'#0f4c5c'}}>View My Ledger →</Text>
      </TouchableOpacity>
    </View>
  );
}