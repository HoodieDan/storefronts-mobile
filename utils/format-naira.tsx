import { View } from 'react-native';
import PText from 'components/common/text-utils/ptext';
import H5Text from 'components/common/text-utils/h5text';
import H6Text from 'components/common/text-utils/h6text';

export const formatNaira = (price: number) => {
  const currency = 'NGN';
  const formattedAmount = price.toLocaleString('en-NG', {
    style: 'currency',
    currency,
  });

  // Match currency symbol (₦) at the beginning of the string
  const currencySymbolMatch = formattedAmount.match(/^\D+/);
  const currencySymbol = currencySymbolMatch ? currencySymbolMatch[0] : '₦';

  const [naira, kobo] = formattedAmount.replace(currencySymbol, '').split('.');

  return (
    <View className='flex-row items-center'>
      <PText>{currencySymbol}</PText>
      <PText style={{ fontWeight: 'bold' }}>{naira}</PText>
      <PText>.{kobo || '00'}</PText>
    </View>
  );
};

export const formatNairaMd = (price: number) => {
  const currency = 'NGN';
  const formattedAmount = price.toLocaleString('en-NG', {
    style: 'currency',
    currency,
  });

  // Match currency symbol (₦) at the beginning of the string
  const currencySymbolMatch = formattedAmount.match(/^\D+/);
  const currencySymbol = currencySymbolMatch ? currencySymbolMatch[0] : '₦';

  const [naira, kobo] = formattedAmount.replace(currencySymbol, '').split('.');

  return (
    <View className="flex-row items-center">
      <PText>{currencySymbol}</PText>
      <H6Text style={{ fontWeight: 'bold' }}>{naira}</H6Text>
      <PText>.{kobo || '00'}</PText>
    </View>
  );
};

export const formatNairaLg = (price: number) => {
  const currency = 'NGN';
  const formattedAmount = price.toLocaleString('en-NG', {
    style: 'currency',
    currency,
  });

  // Match currency symbol (₦) at the beginning of the string
  const currencySymbolMatch = formattedAmount.match(/^\D+/);
  const currencySymbol = currencySymbolMatch ? currencySymbolMatch[0] : '₦';

  const [naira, kobo] = formattedAmount.replace(currencySymbol, '').split('.');

  return (
    <View className="flex-row items-center">
      <PText>{currencySymbol}</PText>
      <H5Text style={{ fontWeight: 'bold' }}>{naira}</H5Text>
      <PText>.{kobo || '00'}</PText>
    </View>
  );
};
