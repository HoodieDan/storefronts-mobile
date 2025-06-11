import React from 'react';
import { Text, View } from 'react-native';
import PText from 'components/common/text-utils/ptext';
import SmallText from 'components/common/text-utils/smalltext';

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
      <SmallText>{currencySymbol}</SmallText>
      <PText style={{ fontWeight: 'bold' }}>{naira}</PText>
      <SmallText>.{kobo || '00'}</SmallText>
    </View>
  );
};
