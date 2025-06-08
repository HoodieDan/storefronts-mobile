import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import './global.css';
import StoreHome from './screens/store-home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Store" component={StoreHome} options={{ title: 'Store', headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
