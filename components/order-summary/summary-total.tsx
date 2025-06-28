import { View } from 'react-native';
import PText from '../common/text-utils/ptext';
import AppButton from '../common/app-button';
import { formatNairaMd } from 'utils/format-naira';
import { useNavigation } from '@react-navigation/native';
import H6Text from 'components/common/text-utils/h6text';

const SummaryTotal = ({
  totalProducts,
  cartTotal,
  deliveryFee,
  totalAmount,
  shippingDetails,
  isPending,
  onCheckout,
}) => {
  const navigation = useNavigation() as any;

  return (
    <View
      className="h-52 p-4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        backgroundColor: '#fff',
      }}>
      {/* Subtotal */}
      <View className="flex-row justify-between pb-3">
        <H6Text className="text-graniteGray">
          SubTotal ({totalProducts} item{totalProducts > 0 ? 's' : ''}):
        </H6Text>
        <PText>{formatNairaMd(cartTotal)}</PText>
      </View>

      {/* Shipping or Pickup */}
      {shippingDetails.shippingMethod === 'delivery' ? (
        <View className="flex-row justify-between border-b border-platinum pb-3">
          <H6Text className="text-graniteGray">Shipping ({shippingDetails.location}):</H6Text>
          <PText>{formatNairaMd(deliveryFee)}</PText>
        </View>
      ) : (
        <View className="flex-row justify-between border-b border-platinum pb-3 mb-3">
          <H6Text className="text-graniteGray">Pickup</H6Text>
          <PText>{formatNairaMd(0)}</PText>
        </View>
      )}

      {/* Total */}
      <View className="flex-row justify-between pt-4">
        <H6Text className="font-bold text-graniteGray">Total Amount:</H6Text>
        <PText className="font-bold text-feldgrau">{formatNairaMd(totalAmount)}</PText>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between gap-x-2 py-3">
        <AppButton
          buttonText="Back to Shop"
          onPress={() => navigation.navigate('StoreHome')}
          className="w-[35%] rounded-md bg-antiFlashWhite"
          textClass="text-black"
        />

        <AppButton
          buttonText="Checkout"
          onPress={onCheckout}
          isLoading={isPending}
          className="w-[63%] rounded-md bg-black"
          textClass="text-white"
        />
      </View>
    </View>
  );
};

export default SummaryTotal;
