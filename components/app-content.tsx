import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useGetStoreData } from 'hooks/useApiCalls';
import StoreHome from '../screens/store-home';
import ShippingDetails from 'screens/shipping-details';
import ProductDetail from 'screens/product-detail';
import CartScreen from 'screens/cart-screen';
import OrderSummary from 'screens/order-summary';
import OrderSuccessful from 'screens/order-successful';

const linking = {
  prefixes: ['https://shop.leyyow.com', 'leyyow://'], // support universal & deep links
  config: {
    screens: {
      ProductDetail: {
        path: 'demo/store/product:productId',
        parse: {
          productId: (id: string) => Number(id),
        },
      },
    },
  },
};

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
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="StoreHome">
        <Stack.Screen name="StoreHome" component={StoreHome} options={{ headerShown: false }} />
        <Stack.Screen
          name="ShippingDetails"
          component={ShippingDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="OrderSummary"
          component={OrderSummary}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderSuccessful"
          component={OrderSuccessful}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContent;
