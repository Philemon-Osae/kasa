import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { extractSale } from '../data/ghanaProducts';

// Try load real speech, fallback to demo if not installed
let ExpoSpeechRecognition = null;
try {
  ExpoSpeechRecognition = require('expo-speech-recognition');
} catch (e) {}

export default function HomeMic() {
  const [user, setUser] = useState({ name: 'Trader', stall: '', businessName: '' });
  const [lastSale, setLastSale] = useState(null);
  const [listening, setListening] = useState(false);
  const [heardText, setHeardText] = useState("");
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem('kasaUser').then((u) => {
      if (u) setUser(JSON.parse(u));
    });
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

    // REAL VOICE - works on physical phone
    if (ExpoSpeechRecognition && Platform.OS !== 'web') {
      try {
        const { status } = await ExpoSpeechRecognition.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("KASA needs mic", "Enable microphone to speak Twi/English");
          setListening(false);
          return;
        }
        
        // Remove old listeners
        ExpoSpeechRecognition.removeAllListeners('result');
        
        ExpoSpeechRecognition.addListener('result', (e) => {
          const text = e.results[0]?.transcript || "";
          if (text) {
            saveSale(text);
            setListening(false);
            ExpoSpeechRecognition.stopAsync();
          }
        });

        await ExpoSpeechRecognition.startAsync({ 
          lang: 'en-GH', 
          interimResults: false,
          maxAlternatives: 1
        });
        
        // Auto stop after 7s
        setTimeout(async () => {
          try { await ExpoSpeechRecognition.stopAsync(); } catch {}
          setListening(false);
        }, 7000);
        
        return;
      } catch (err) {
        console.log("Speech error, using demo:", err);
      }
    }

    // DEMO FALLBACK - works on simulator & web
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
      <Text className="text-[28px] font-bold text-black">Maakye, {user.name}! Sɛn?</Text>
      <Text className="text-grey text-[14px] mt-1">
        {user.stall ? `${user.stall} • ` : ''}{user.businessName || 'KASA Trader'}
      </Text>
      <Text className="text-[11px] text-grey mt-2 uppercase tracking-wide">
        {listening ? "🎙️ Listening..." : "Tap mic & speak Twi / English"}
      </Text>

      <TouchableOpacity 
        onPress={startListening} 
        activeOpacity={0.8}
        className="w-56 h-56 rounded-full items-center justify-center mt-10 shadow-lg"
        style={{ 
          backgroundColor: listening ? '#0f4c5c' : '#FF7A00',
          elevation: 8
        }}
      >
        <Text style={{ fontSize: 64 }}>{listening ? "👂" : "🎤"}</Text>
        <Text className="text-white font-bold text-[16px] mt-2">KASA - {user.name}</Text>
        <Text className="text-white text-[12px] opacity-90">
          {listening ? "Listening..." : "Tap to speak"}
        </Text>
      </TouchableOpacity>

      {heardText ? (
        <View className="bg-light p-4 rounded-[12px] mt-6 w-full border border-[#E0E0E0]">
          <Text className="text-[11px] text-grey uppercase">You said:</Text>
          <Text className="font-semibold text-[15px] mt-1 text-black">"{heardText}"</Text>
        </View>
      ) : null}

      {lastSale && (
        <View className="bg-[#E6F4F1] p-4 rounded-[12px] mt-3 w-full">
          <Text className="font-bold text-[14px] text-black">
            ✓ Saved: {lastSale.item} → {lastSale.customer} for GH{lastSale.amount}
          </Text>
          <Text className="text-[11px] text-grey mt-1">
            120+ items: kobi, momoni, kpakpo shito, shoes
          </Text>
        </View>
      )}

      <TouchableOpacity 
        onPress={() => router.push('/ledger')} 
        className="mt-8 py-3 px-6 rounded-[12px] bg-light"
      >
        <Text className="text-center font-bold text-[14px]" style={{ color: '#0f4c5c' }}>
          View My Ledger →
        </Text>
      </TouchableOpacity>
    </View>
  );
}