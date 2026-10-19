import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({ name:'', phone:'', stall:'', businessName:'' });

  const save = async () => {
    await AsyncStorage.setItem('kasaUser', JSON.stringify(form));
    router.push('/homemic');
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold">Create Account - Step 1 of 2</Text>
      {form.name ? <Text className="bg-teal-50 p-3 mt-3 rounded-lg">Live: Maakye, {form.name}! Sɛn? - Stall {form.stall}</Text> : null}
      
      <TextInput placeholder="Your Name e.g. Araba" className="border border-gray-300 p-3 rounded-lg mt-3" onChangeText={t => setForm({...form, name:t})} />
      <TextInput placeholder="Phone 024..." className="border border-gray-300 p-3 rounded-lg mt-3" onChangeText={t => setForm({...form, phone:t})} keyboardType="phone-pad" />
      <TextInput placeholder="Stall No e.g. B12 - Kumasi Central" className="border border-gray-300 p-3 rounded-lg mt-3" onChangeText={t => setForm({...form, stall:t})} />
      <TextInput placeholder="Business Name e.g. Araba Tomatoes" className="border border-gray-300 p-3 rounded-lg mt-3" onChangeText={t => setForm({...form, businessName:t})} />
      <TextInput placeholder="4-digit PIN like MoMo" className="border border-gray-300 p-3 rounded-lg mt-3" onChangeText={t => setForm({...form, pin:t})} secureTextEntry keyboardType="number-pad" />

      <TouchableOpacity onPress={save} className="p-4 rounded-xl mt-6" style={{backgroundColor:'#ff7f2a'}}>
        <Text className="text-white text-center font-bold">Next - Continue → Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}