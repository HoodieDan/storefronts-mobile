import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CartIcon from '../icons/cart-icon';
import clsx from 'clsx';

interface CartButtonProps {
  totalProducts: number;
  className?: string;
  style?: any;
}

const CartButton = ({ totalProducts, className = '', style }: CartButtonProps) => {
  const navigation = useNavigation() as any;

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <TouchableOpacity
      onPress={navigateToCart}
      style={style}
      className={clsx(
        'relative items-center justify-center rounded-sm bg-antiFlashWhite',
        className
      )}>
      <CartIcon />

      {totalProducts > 0 && (
        <View className="absolute right-1 top-1 items-center justify-center rounded-sm bg-red-600 px-1.5 py-0.5">
          <Text className="text-xs font-bold text-white">{totalProducts}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
