import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import './global.css';
import StoreHome from './screens/store-home';
import ShippingDetails from 'screens/shipping-details';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />

      <NavigationContainer>
        <Stack.Navigator initialRouteName='ShippingDetails'>
          <Stack.Screen
            name="Store"
            component={StoreHome}
            options={{ title: 'Store', headerShown: false }}
          />
          <Stack.Screen
            name="ShippingDetails"
            component={ShippingDetails}
            options={{ title: 'Shipping Details', headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
