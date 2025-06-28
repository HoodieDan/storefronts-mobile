import { View } from 'react-native';
import PText from 'components/common/text-utils/ptext';
import H5Text from 'components/common/text-utils/h5text';
import H6Text from 'components/common/text-utils/h6text';
import SmallText from 'components/common/text-utils/smalltext';

export const formatNairatoK = (price: number) => {
  const currency = 'NGN';
  let displayValue = '';
  let suffix = '';
  let naira = '';
  let kobo = '';

  if (price >= 1_000_000) {
    displayValue = (price / 1_000_000).toFixed(1).replace(/\.0$/, '');
    suffix = 'M';
  } else if (price >= 1_000) {
    displayValue = (price / 1_000).toFixed(1).replace(/\.0$/, '');
    suffix = 'K';
  } else {
    displayValue = price.toLocaleString('en-NG');
    suffix = '';
  }

  // Extract kobo if price is not abbreviated
  if (suffix === '') {
    const formattedAmount = price.toLocaleString('en-NG', {
      style: 'currency',
      currency,
    });
    const currencySymbolMatch = formattedAmount.match(/^\D+/);
    const currencySymbol = currencySymbolMatch ? currencySymbolMatch[0] : '₦';
    [naira, kobo] = formattedAmount.replace(currencySymbol, '').split('.');
  }

  return (
    <View className="flex-row items-center">
      <SmallText>₦</SmallText>
      <PText style={{ fontWeight: 'bold' }}>
        {suffix ? displayValue + suffix : naira}
      </PText>
      <SmallText>
        {suffix ? '' : `.${kobo || '00'}`}
      </SmallText>
    </View>
  );
};

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
