import { View, SafeAreaView, FlatList, Image } from 'react-native';
import H1Text from '../components/common/text-utils/h1text';
import H4Text from 'components/common/text-utils/h4text';
import useProductStore from 'store/product';
import useStoreInfo from 'store/storeinfo';
import ProductCard from 'components/store-home/product-card';
import { useEffect } from 'react';
import { StoreInfo } from 'lib/interfaces';
import TextInputField from '../components/common/text-input';
import MagnifyingGlass from 'components/icons/magnifying-glass';
import CartButton from 'components/common/cart-button';
import useCartStore from 'store/cart';

function StoreHome() {
  const { filteredProducts, syncWithStoreInfo, searchInput, updateSearch } = useProductStore();
  const { storeInfo } = useStoreInfo();

  useEffect(() => {
    syncWithStoreInfo();
  }, [syncWithStoreInfo]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={filteredProducts()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={3}
        key={'flatlist-numColumns-3'}
        columnWrapperStyle={{ gap: 4 }}
        contentContainerStyle={{ padding: 16, gap: 4 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View>
              {storeInfo && (storeInfo as StoreInfo).store_logo ? (
                <View>
                  <Image
                    source={{ uri: (storeInfo as StoreInfo).store_logo }}
                    className="h-16 w-16"
                    resizeMode="cover"
                  />
                </View>
              ) : (
                <H4Text>Logo</H4Text>
              )}
            </View>
            <H1Text className="my-3">Shop</H1Text>
            <View className="mb-4 flex-row items-center gap-2">
              <TextInputField
                placeholder="Search for by name"
                value={searchInput}
                onChangeText={updateSearch}
                icon={<MagnifyingGlass />}
                className="flex-1"
              />
              <CartButton
                totalProducts={useCartStore((state) =>
                  state.cart.reduce((sum, item) => sum + item.selected_quantity, 0)
                )}
                style={{height: 47, width: 47}}
              />
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
}

export default StoreHome;
