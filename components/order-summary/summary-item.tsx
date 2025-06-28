import { View, Image } from 'react-native';
import PText from '../common/text-utils/ptext';
import ProductImagePlaceholder from '../common/product-image-placeholder';
import { formatNaira } from '../../utils/format-naira'; // Assumes you have this utility
import clsx from 'clsx';
import type { CartItem } from 'lib/interfaces';

interface SummaryItemProps {
  item: CartItem;
  className?: string;
}

const SummaryItem = ({ item, className = '' }: SummaryItemProps) => {
  const trimmedName =
    item.product_name && item.product_name.length > 35
      ? item.product_name.slice(0, 35) + '...'
      : item.product_name;

  return (
    <View className={clsx('mb-2 flex-row gap-2', className)}>
      <View className="h-16 w-16 overflow-hidden rounded-md">
        {item.images.length > 0 ? (
          <Image
            source={{ uri: item.images[0].image }}
            className="h-full w-full bg-graniteGray"
            resizeMode="cover"
            onError={() =>
              console.warn('Image failed to load summary item image:', item.images[0].image)
            }
          />
        ) : (
          <ProductImagePlaceholder />
        )}
      </View>

      <View className="flex-1 flex-col gap-2">
        <View className="h-16 flex-row gap-1.5">
          <View className="h-full flex-1 flex-col justify-between py-1">
            <PText className="leading-none">{trimmedName}</PText>

            <PText className="text-gray-500">
              {item.selected_variant1}
              {item.selected_variant2 ? `, ${item.selected_variant2}` : ''}
              {item.selected_variant3 ? `, ${item.selected_variant3}` : ''}
            </PText>
          </View>

          <View className="min-w-[33%] flex-col items-end">
            <PText className="pb-3 pt-2 text-right font-bold leading-none">
              {formatNaira(item.itemTotal)}
            </PText>
            <PText className="w-full text-right text-gray-500">Qty: {item.selected_quantity}</PText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SummaryItem;
