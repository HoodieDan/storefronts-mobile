import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import H6Text from 'components/common/text-utils/h6text';
import PText from 'components/common/text-utils/ptext';
import AppButton from 'components/common/app-button';
import { Toast } from 'toastify-react-native';
import useOrderStore from 'store/order';
import CopyIcon from 'components/icons/copy-icon';
import useCartStore from 'store/cart';
import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';

type RootStackParamList = {
  OrderSuccess: { id: string };
};

const OrderSuccessScreen = () => {
  const navigation = useNavigation() as any;
  const route = useRoute<RouteProp<RootStackParamList, 'OrderSuccess'>>();
  const orderId = route?.params?.id ?? '1';
  const { shippingDetails } = useOrderStore();
  const { clearCart } = useCartStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    clearCart();
    queryClient.refetchQueries({ queryKey: ['storeInfo'] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(`#${orderId}`);
      Toast.show({
        type: 'success',
        text1: 'Order Reference copied to clipboard!',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Failed to copy Order ID',
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-4">
        <Image
          source={require('../assets/images/gifs/order-successful.gif')}
          style={{ width: 192, height: 192, marginBottom: 40 }}
          contentFit="contain"
        />

        <H6Text className="py-3">Order placed successfully!</H6Text>

        <PText className="text-granite-gray text-center">
          Your order has been placed, and confirmation has been sent to{' '}
          <PText className="font-bold text-feldgrau">{shippingDetails.email}</PText>. Please note
          your order number for reference.
        </PText>

        <View className="mt-3 w-full flex-row items-center justify-between rounded-md border border-platinum p-3">
          <PText>Order Number</PText>
          <View className="flex-row items-center gap-1">
            <PText className="font-bold">#{orderId}</PText>
            <TouchableOpacity onPress={handleCopy}>
              <CopyIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="p-4">
        <AppButton
          onPress={() => navigation.navigate('StoreHome')}
          buttonText="Back to Shop"
          className="rounded-md bg-black py-3"
          textClass="text-white"
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderSuccessScreen;
