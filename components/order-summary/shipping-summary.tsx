import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EditIcon from '../icons/edit-icon';
import clsx from 'clsx';
import H6Text from 'components/common/text-utils/h6text';
import PText from 'components/common/text-utils/ptext';

interface ShippingSummaryProps {
  shippingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  className?: string;
}

const ShippingSummary = ({ shippingDetails, className = '' }: ShippingSummaryProps) => {
  const navigation = useNavigation() as any;

  const goToEditShipping = () => {
    navigation.navigate('ShippingDetails');
  };

  return (
    <View
      className={clsx('flex-col gap-2.5 border-b border-t border-gray-200 py-4', className)}>
      <View className="mb-3 flex-row items-center justify-between">
        <H6Text className="text-base font-semibold">Shipping Information</H6Text>
        <TouchableOpacity onPress={goToEditShipping}>
          <EditIcon />
        </TouchableOpacity>
      </View>

      <PText className="mb-2">
        {shippingDetails.firstName} {shippingDetails.lastName}
      </PText>
      <PText className="mb-2">{shippingDetails.email}</PText>
      <PText>{shippingDetails.phoneNumber}</PText>
    </View>
  );
};

export default ShippingSummary;
