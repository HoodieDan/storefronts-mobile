import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useGetStoreData } from 'hooks/useApiCalls';
import StoreHome from '../screens/store-home';
import ShippingDetails from 'screens/shipping-details';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const { isLoading, isError } = useGetStoreData();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Failed to load store info</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StoreHome">
        <Stack.Screen name="StoreHome" component={StoreHome} options={{ headerShown: false }} />
        <Stack.Screen
          name="ShippingDetails"
          component={ShippingDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContent;
