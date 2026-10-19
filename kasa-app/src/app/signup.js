import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({ name:'', phone:'', stall:'', businessName:'', pin:'' });

  const save = async () => {
    if (!form.name || !form.phone) {
      alert("Enter name and phone");
      return;
    }
    await AsyncStorage.setItem('kasaUser', JSON.stringify(form));
    router.push('/homemic');
  };

  return (
    <ScrollView className="flex-1 bg-white p-6" showsVerticalScrollIndicator={false}>
      <Text className="text-[28px] font-bold text-black leading-8">Create Account{"\n"}<Text className="text-[16px] font-normal text-grey">Step 1 of 2</Text></Text>

      {form.name ? (
        <View className="bg-[#E6F4F1] p-4 rounded-[12px] mt-5 border border-[#C9E4DE]">
          <Text className="text-[14px] font-medium text-black">
            Live: Maakye, {form.name}! Sɛn? {form.stall ? `- Stall ${form.stall}` : ''}
          </Text>
        </View>
      ) : null}

      <View className="mt-6 gap-3">
        <TextInput 
          placeholder="Your Name e.g. Araba" 
          className="bg-light p-4 rounded-[12px] text-[15px] text-black"
          placeholderTextColor="#8A8A8A"
          value={form.name}
          onChangeText={t => setForm({...form, name:t})} 
        />
        <TextInput 
          placeholder="Phone 024..." 
          className="bg-light p-4 rounded-[12px] text-[15px] text-black"
          placeholderTextColor="#8A8A8A"
          value={form.phone}
          onChangeText={t => setForm({...form, phone:t})} 
          keyboardType="phone-pad" 
        />
        <TextInput 
          placeholder="Stall No e.g. B12 - Kumasi Central" 
          className="bg-light p-4 rounded-[12px] text-[15px] text-black"
          placeholderTextColor="#8A8A8A"
          value={form.stall}
          onChangeText={t => setForm({...form, stall:t})} 
        />
        <TextInput 
          placeholder="Business Name e.g. Araba Tomatoes" 
          className="bg-light p-4 rounded-[12px] text-[15px] text-black"
          placeholderTextColor="#8A8A8A"
          value={form.businessName}
          onChangeText={t => setForm({...form, businessName:t})} 
        />
        <TextInput 
          placeholder="4-digit PIN like MoMo" 
          className="bg-light p-4 rounded-[12px] text-[15px] text-black"
          placeholderTextColor="#8A8A8A"
          value={form.pin}
          onChangeText={t => setForm({...form, pin:t})} 
          secureTextEntry 
          keyboardType="number-pad" 
        />
      </View>

      <TouchableOpacity 
        onPress={save} 
        activeOpacity={0.85}
        className="p-4 rounded-[12px] mt-8 items-center justify-center"
        style={{ backgroundColor: '#FF7A00', height: 56 }}
      >
        <Text className="text-white text-center font-bold text-[16px]">Next - Continue → Home</Text>
      </TouchableOpacity>

      <Text className="text-center text-[11px] text-grey mt-4">
        By continuing you agree to KASA terms. Free • No bank needed
      </Text>
    </ScrollView>
  );
}