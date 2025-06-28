import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EditIcon from '../icons/edit-icon';
import DeliveryIcon from '../icons/delivery-icon';
import PickupIcon from '../icons/pickup-icon';
import { StoreInfo } from '../../lib/interfaces';
import H6Text from 'components/common/text-utils/h6text';
import PText from 'components/common/text-utils/ptext';

interface ShippingMethodProps {
  shippingDetails: {
    shippingMethod: string;
    address: string;
  };
  storeInfo: StoreInfo;
}

const ShippingMethod = ({ shippingDetails, storeInfo }: ShippingMethodProps) => {
  const navigation = useNavigation() as any;

  return (
    <View className="py-4">
      <View className="mb-1 flex-row items-center justify-between">
        <H6Text className="text-granite-gray">Shipping Method</H6Text>
        <TouchableOpacity onPress={() => navigation.navigate('ShippingDetails')}>
          <EditIcon />
        </TouchableOpacity>
      </View>

      <View className="mt-2 flex-row items-center justify-between">
        <PText>
          {shippingDetails.shippingMethod === 'delivery'
            ? shippingDetails.address
            : storeInfo.address}
        </PText>

        {shippingDetails.shippingMethod === 'delivery' ? (
          <View className="text-granite-gray flex-row items-center">
            <DeliveryIcon />
            <PText>Delivery</PText>
          </View>
        ) : (
          <View className="text-granite-gray flex-row items-center">
            <PickupIcon />
            <PText>Pickup</PText>
          </View>
        )}
      </View>
    </View>
  );
};

export default ShippingMethod;
