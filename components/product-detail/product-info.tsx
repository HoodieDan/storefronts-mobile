import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Product } from 'lib/interfaces';
import H5Text from 'components/common/text-utils/h5text';
import PText from 'components/common/text-utils/ptext';
import { formatNairaLg } from '../../utils/format-naira';

type Props = {
  filteredProduct: Product;
  price: number;
  hasVariants?: boolean;
  stockLeft?: number;
  showStock?: boolean;
  onShareClicked: (productId: number) => void;
};

const ProductHeader = ({
  filteredProduct,
  price,
  hasVariants = false,
  stockLeft,
  showStock = false,
  onShareClicked,
}: Props) => {
  const handleShareClick = () => {
    onShareClicked(filteredProduct.id);
  };

  return (
    <View>
      {/* Title and Share Icon */}
      <View className="flex-row items-center justify-between py-3">
        <H5Text className="font-bold">{filteredProduct.product_name}</H5Text>

        <TouchableOpacity
          className="h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb]"
          onPress={handleShareClick}>
          <Ionicons name="share-social-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Price and Stock Status */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          {hasVariants && !showStock && <PText>from </PText>}
          <H5Text>{formatNairaLg(price)}</H5Text>
        </View>

        {showStock && stockLeft === 0 && (
          <View className="rounded-sm bg-oriolesOrange px-2 py-1">
            <Text className="text-xs text-white">Out of stock</Text>
          </View>
        )}

        {showStock && stockLeft! > 0 && stockLeft! <= 5 && (
          <View className="rounded-sm bg-vividGamboge px-2 py-1">
            <Text className="text-xs text-white">{stockLeft} in stock</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductHeader;
