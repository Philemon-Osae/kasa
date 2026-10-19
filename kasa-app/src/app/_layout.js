import { Stack } from 'expo-router';
import '../global.css';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown:false }} />
      <Stack.Screen name="signup" options={{ title:'Create Account' }} />
      <Stack.Screen name="homemic" options={{ title:'KASA Home' }} />
      <Stack.Screen name="ledger" options={{ title:'My Ledger' }} />
      <Stack.Screen name="score" options={{ title:'Kasa Score' }} />
    </Stack>
  );
}