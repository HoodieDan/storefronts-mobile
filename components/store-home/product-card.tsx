import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { formatNairatoK } from '../../utils/format-naira';
import ProductImagePlaceholder from '../common/product-image-placeholder';
import useCartStore from '../../store/cart';
import { Product } from 'lib/interfaces';
import SmallText from 'components/common/text-utils/smalltext';

type RootStackParamList = {
  ProductDetail: { productId: number };
  // add other routes here if needed
};
interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isProductInCart } = useCartStore();

  const navigateToProductDetail = () => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const renderStockLabel = () => {
    if (product.total_stock === 0) {
      return (
        <View className="absolute right-1 top-1 z-10 rounded-sm bg-oriolesOrange px-1.5 py-0.5 text-white">
          <Text className="text-xs text-white">Out of stock</Text>
        </View>
      );
    } else if (product.total_stock <= 5) {
      return (
        <View className="absolute right-1 top-1 z-10 rounded-sm bg-vividGamboge px-1.5 py-0.5 text-white">
          <Text className="text-xs text-white">{product.total_stock} in stock</Text>
        </View>
      );
    }
    return null;
  };

  const renderCartIcon = () => {
    if (!isProductInCart(product)) return null;

    const topClass = product.total_stock > 0 && product.total_stock <= 5 ? 'top-[22px]' : 'top-1';

    return (
      <View
        className={`absolute right-1 h-7 w-7 rounded-sm ${topClass} bg-bright-gray z-10 flex items-center justify-center`}>
        {/* Replace with SVG Component or inline SVG */}
        <Text className="text-xs">🛒</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={navigateToProductDetail}
      className="relative mb-0.5 h-36 w-[32.5%] rounded-sm">
      {product.images.length > 0 ? (
        <Image
          source={{ uri: product.images[0].image }}
          className="h-full w-full rounded-sm bg-graniteGray object-cover"
        />
      ) : (
        <ProductImagePlaceholder />
      )}

      {renderStockLabel()}
      {renderCartIcon()}

      {/* Price */}
      <View className="z-5 absolute bottom-1 left-0 right-0 h-6 px-1">
        <View className="h-full w-full flex-row items-center justify-center rounded-sm bg-white py-0.5">
          {product.variants !== '' && <SmallText className="me-1">from</SmallText>}
          {formatNairatoK(product.price)}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
