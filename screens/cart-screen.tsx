import React, { useMemo } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useCartStore from '../store/cart';
import CartPageItem from '../components/cart-screen/cart-item-card';
import TextInput from '../components/common/text-input';
import AppButton from '../components/common/app-button';
import PText from '../components/common/text-utils/ptext';
import { formatNairaMd } from '../utils/format-naira';

const CartPage = () => {
  const navigation = useNavigation() as any;
  const { cart } = useCartStore();

  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.variant_price * item.selected_quantity, 0),
    [cart]
  );

  const totalProducts = useMemo(
    () => cart.reduce((sum, item) => sum + item.selected_quantity, 0),
    [cart]
  );

  const proceedToShipping = () => {
    if (cart.length !== 0) {
      navigation.navigate('ShippingDetails');
    }
  };

  return (
    <SafeAreaView className="w-full flex-1 bg-white">
      <ScrollView className="mt-3 flex-1 px-4 py-2" contentContainerStyle={{ paddingBottom: 20 }}>
        {cart.map((item) => (
          <CartPageItem key={item.id} item={item} />
        ))}
      </ScrollView>

      <View
        className="h-48 border-t border-gray-200 bg-white px-4 py-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 4,
          backgroundColor: '#fff',
        }}>
        <View className="mb-2 flex-row items-center gap-2">
          <TextInput
            placeholder="Enter Coupon Code"
            className="h-12 flex-1 rounded-md bg-antiFlashWhite text-gray-600"
          />
          <AppButton
            className="h-12 w-24 rounded-md bg-black"
            textClass="text-white"
            buttonText="Apply"
            onPress={() => {}}
          />
        </View>

        <View className="flex-row items-center justify-between border-b border-gray-300 pb-4 pt-2">
          <PText className="text-gray-500">
            SubTotal ({totalProducts} item{totalProducts !== 1 ? 's' : ''}):
          </PText>
          <PText className="font-semibold">{formatNairaMd(totalAmount)}</PText>
        </View>

        <View className="flex-row items-center justify-between pt-3">
          <AppButton
            onPress={() => navigation.navigate('StoreHome')}
            className="w-[35%] rounded-sm bg-antiFlashWhite py-4"
            textClass="text-black"
            buttonText="Back To Shop"
          />

          <AppButton
            onPress={proceedToShipping}
            className="w-[63%] rounded-md bg-black py-4"
            textClass="text-white"
            buttonText="Proceed To Shipping"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartPage;
